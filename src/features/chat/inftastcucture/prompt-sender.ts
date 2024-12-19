import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { IPromptSender } from "../application";
import { Prompt, Model, Reply, InvalidModelNameError } from "../domain";
import {
  IOllamaGenerateRequest,
  IOllamaGenerateResponse,
} from "./ollama-generate.interface";
import { Logger } from "../../../utils/logging";

export class PromptSender implements IPromptSender {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:11434/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  sendPrompt = async (prompt: Prompt): Promise<Reply> => {
    const requestBody: IOllamaGenerateRequest = {
      model: prompt.model.name,
      prompt: prompt.message,
      stream: false,
    };

    Logger.info(`post /generate request body: ${JSON.stringify(requestBody)}`);

    const config: AxiosRequestConfig = {
      responseType: "json",
    };
    return this.axiosInstance
      .post<
        IOllamaGenerateResponse,
        AxiosResponse<IOllamaGenerateResponse>,
        IOllamaGenerateRequest
      >("/generate", requestBody, config)
      .then((res) => {
        Logger.info(
          `post /generate response body: ${JSON.stringify(res.data)}`
        );
        return new Reply(res.data.response, res.data.done);
      })
      .catch((e) => {
        if (isAxiosError(e) && e.status === 404) {
          throw new InvalidModelNameError();
        }
        throw new Error("Unknown error");
      });
  };

  sendPromptStream = async (
    prompt: Prompt,
    model: Model,
    handler: (reply: Reply) => void
  ) => {
    const requestBody: IOllamaGenerateRequest = {
      model: model.name,
      prompt: prompt.message,
      stream: true,
    };

    const config: AxiosRequestConfig = {
      responseType: "stream",
    };

    const response = await this.axiosInstance.post(
      "/generate",
      requestBody,
      config
    );

    response.data.on("data", (chunk: Buffer) => {
      const chunkString = chunk.toString();
      try {
        const json = JSON.parse(chunkString);
        const reply = new Reply(json.response, json.done);

        handler(reply);
      } catch (error: unknown) {
        const message = isAxiosError(error) ? error.message : "Unknown Error";
        console.log(`post /generate error: ${message}`);
        handler(Reply.emptyReply());
      }
    });

    response.data.on("end", () => {
      handler(Reply.emptyReply());
    });

    response.data.on("error", (error: unknown) => {
      const message = isAxiosError(error) ? error.message : "Unknown Error";
      console.log(`post /generate error: ${message}`);

      handler(Reply.emptyReply());
    });
  };
}
