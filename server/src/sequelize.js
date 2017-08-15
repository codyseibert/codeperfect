const Sequelize = require('sequelize')

const sequelize = new Sequelize('codeperfect', 'root', 'testing', {
  host: 'localhost'
});

module.exports = sequelize;
