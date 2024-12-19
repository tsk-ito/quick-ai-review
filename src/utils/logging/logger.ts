export class Logger {
  static unknownError = (arg: unknown) => {
    if (arg instanceof Error) {
      this.error(arg);
    } else {
      console.error(`Unknown Error: (type: ${typeof arg})`);
    }
  };

  static error = (e: Error) => {
    const errorName = e.name || "Error";
    const errorMessage = e.message || "An error occurred.";
    const stack = e.stack || "No stack trace";

    console.error(`${errorName}: ${errorMessage}`, stack);
  };

  static info = (...message: string[]) => {
    console.info("[INFO]", ...message);
  };

  static warn = (...message: string[]) => {
    console.warn("[WARN]", ...message);
  };

  static debug = (...message: string[]) => {
    console.debug("[DEBUG]", ...message);
  };
}
