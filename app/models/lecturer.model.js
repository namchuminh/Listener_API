const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config.js');

const Lecturer = sequelize.define('lecturer', {
  lecturer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Nam', 'Nữ'),
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  degree: {
    type: DataTypes.ENUM('Cử Nhân', 'Thạc Sĩ', 'Tiến Sĩ'),
  },
  major: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  university: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  current_position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  institution: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  account_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'accounts', // Tên bảng liên kết
      key: 'account_id',
    },
  }
}, {
  tableName: 'lecturers',
  timestamps: false,
});

module.exports = Lecturer;
