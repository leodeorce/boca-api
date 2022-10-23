class ApiError extends Error {
  status: number;
  message: string;

  constructor(name: string, status: number, message: string) {
    super();
    Object.setPrototypeOf(this, ApiError.prototype);
    this.status = status;
    this.message = message;
    this.name = name;
  }

  static badRequest(message: string): ApiError {
    return new ApiError("BadRequestError", 400, message);
  }

  static internal(message: string): ApiError {
    return new ApiError("InternalError", 500, message);
  }

  static notFound(message: string): ApiError {
    return new ApiError("NotFoundError", 404, message);
  }

  static alreadyExists(message: string): ApiError {
    return new ApiError("AlreadyExistsError", 409, message);
  }
}

export { ApiError };
