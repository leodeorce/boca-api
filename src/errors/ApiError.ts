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

  static inconsistency(message: string): ApiError {
    return new ApiError(
      "InconsistencyError",
      HttpStatus.INCONSISTENCY,
      message
    );
  }

  static unauthorized(message: string): ApiError {
    return new ApiError("Unauthorized", HttpStatus.UNAUTHORIZED, message);
  }

  static forbidden(message: string): ApiError {
    return new ApiError("Forbidden", HttpStatus.FORBIDDEN, message);
  }
}

const errorSchema = {
  type: "object",
  properties: {
    error: {
      type: "string",
      description: "Tipo de erro.",
    },
    message: {
      type: "string",
      description: "Mensagem específica do erro.",
    },
  },
};

export { ApiError, errorSchema };
