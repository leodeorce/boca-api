interface ILogger {
  logRequest(method: string, url: string): Promise<void>;
  logError(err: Error): Promise<void>;
  logWarning(message: string): Promise<void>;
}

export { ILogger };
