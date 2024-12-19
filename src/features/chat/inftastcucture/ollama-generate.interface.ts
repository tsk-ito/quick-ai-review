export interface IOllamaGenerateRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

export interface IOllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}
