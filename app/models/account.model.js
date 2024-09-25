const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const Account = sequelize.define('accounts', {
    account_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'lecturer'),
    defaultValue: 'lecturer',
  }
}, {
  tableName: 'accounts',
  timestamps: false,
});

module.exports = Account;
