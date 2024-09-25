const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const Department = sequelize.define('department', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'departments',
  timestamps: false,
});

module.exports = Department;
