enum HttpStatus {
  CREATED = 200,
  SUCCESS = 200,
  UPDATED = 200,
  DELETED = 204,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  INTERNAL_ERROR = 500,
  ALREADY_EXISTS = 409,
}

export { HttpStatus };
