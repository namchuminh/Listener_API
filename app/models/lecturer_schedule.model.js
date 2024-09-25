const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const LecturerSchedule = sequelize.define('lecturer_schedule', {
  schedule_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  lecturer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'lecturers',
      key: 'lecturer_id',
    },
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',
      key: 'course_id',
    },
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'lecturer_schedule',
  timestamps: false,
});

module.exports = LecturerSchedule;
