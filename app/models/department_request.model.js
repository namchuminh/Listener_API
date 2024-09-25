const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const DepartmentRequest = sequelize.define('department_request', {
  request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  department_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'departments',
      key: 'department_id',
    },
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',
      key: 'course_id',
    },
  },
  lecturer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'lecturers',
      key: 'lecturer_id',
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  },
  request_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  }
}, {
  tableName: 'department_requests',
  timestamps: false,
});

module.exports = DepartmentRequest;
