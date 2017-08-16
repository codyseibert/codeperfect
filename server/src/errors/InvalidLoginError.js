module.exports = class InvalidLoginError extends require('./AppError') {
  constructor () {
    super('The login information provided is invalid', 403);
  }
}
