export class ValidationError extends Error {
  constructor(message, statusCode, errors) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = statusCode || 400;
    this.errors = errors || {};
  }
}