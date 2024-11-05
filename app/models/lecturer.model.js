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
    type: DataTypes.ENUM('Cử Nhân', 'Kỹ Sư', 'Chuyên Gia', 'Thạc Sĩ', 'Tiến Sĩ', 'Giáo Sư'),
  },
  major: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photo_degree: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: true,
    default: 0
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
