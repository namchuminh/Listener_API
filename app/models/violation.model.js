const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Violation = sequelize.define("violation", {
  violation_id: {
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
  violation_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  violation_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "violations",
  timestamps: false
});

module.exports = Violation;
