const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const Course = sequelize.define('course', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  course_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'departments', // Tên bảng liên kết
      key: 'department_id',
    },
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'courses',
  timestamps: false,
});

module.exports = Course;
