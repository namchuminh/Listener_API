const Sequelize = require('sequelize');
const sequelize = new Sequelize('quanly_thinhgiang', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  logging: false, // tắt log
});

module.exports = sequelize;