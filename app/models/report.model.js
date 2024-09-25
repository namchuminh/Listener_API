const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config.js");

const Report = sequelize.define("report", {
  report_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  report_type: {
    type: DataTypes.ENUM('teaching', 'violation', 'result'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  report_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "reports",
  timestamps: false
});

module.exports = Report;
