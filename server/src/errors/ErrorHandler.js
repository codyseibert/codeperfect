module.exports = function (err, res) {
  res.status(err.status || 500).send({
    error: err.message || err.toString()
  });
}
