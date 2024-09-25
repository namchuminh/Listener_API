const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const LecturerRecommendation = sequelize.define('lecturer_recommendation', {
  recommendation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  recommender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'lecturers',
      key: 'lecturer_id',
    },
  },
  recommended_lecturer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'lecturers',
      key: 'lecturer_id',
    },
  },
  recommendation_notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'lecturer_recommendations',
  timestamps: false,
});

module.exports = LecturerRecommendation;
