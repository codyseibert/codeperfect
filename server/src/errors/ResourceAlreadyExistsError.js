module.exports = class ResourceAlreadyExistsError extends require('./AppError') {
  constructor () {
    super('Resource already exists', 400);
  }
}
