class ResourceNotFound extends Error {}

class Unauthorized extends Error {}

class InternalServerError extends Error {}

class BadRequest extends Error {}

class SocketError extends Error {}

export {
  ResourceNotFound,
  Unauthorized,
  InternalServerError,
  BadRequest,
  SocketError,
};
