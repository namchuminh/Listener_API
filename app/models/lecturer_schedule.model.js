const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');
const Lecturer = require('./lecturer.model.js');
const Course = require('./course.model.js');

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
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  section: {
    type: DataTypes.STRING,
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

// Thiết lập quan hệ
LecturerSchedule.belongsTo(Lecturer, { foreignKey: 'lecturer_id', targetKey: 'lecturer_id' });
LecturerSchedule.belongsTo(Course, { foreignKey: 'course_id', targetKey: 'course_id' });

module.exports = LecturerSchedule;
