import { HttpStatus } from "../shared/definitions/HttpStatusCodes";

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
    return new ApiError("BadRequestError", HttpStatus.BAD_REQUEST, message);
  }

  static internal(message: string): ApiError {
    return new ApiError("InternalError", HttpStatus.INTERNAL_ERROR, message);
  }

  static notFound(message: string): ApiError {
    return new ApiError("NotFoundError", HttpStatus.NOT_FOUND, message);
  }

  static alreadyExists(message: string): ApiError {
    return new ApiError(
      "AlreadyExistsError",
      HttpStatus.ALREADY_EXISTS,
      message
    );
  }
}

export { ApiError };
