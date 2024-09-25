const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const TeachingResult = sequelize.define("teaching_result", {
  result_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lecturer_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'lecturers', 
      key: 'lecturer_id'
    }
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'courses', 
      key: 'course_id'
    }
  },
  evaluation_score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: "teaching_results",
  timestamps: false
});

module.exports = TeachingResult;
