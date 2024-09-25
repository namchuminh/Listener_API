const { Op } = require("sequelize");
const Department = require("../models/department.model.js");

class departmentService {
  //[GET] departments/
  async index(req, res) {
    try {
      const { page = 1, limit = 10, search = "" } = req.query;

      // Validate phân trang
      if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        return res.status(400).json({ message: "Phân trang không hợp lệ!" });
      }

      // Điều kiện tìm kiếm nếu có
      const searchCondition = search
        ? {
            name: {
              [Op.like]: `%${search}%`,
            },
          }
        : {};

      // Tính tổng số lượng khoa
      const totalDepartments = await Department.count({
        where: searchCondition,
      });

      // Tính tổng số trang
      const totalPages = Math.ceil(totalDepartments / limit);

      // Lấy danh sách khoa theo phân trang và điều kiện tìm kiếm
      const departments = await Department.findAll({
        where: searchCondition,
        offset: (page - 1) * limit,
        limit: parseInt(limit),
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).json({
        totalDepartments,
        currentPage: parseInt(page),
        totalPages,
        departments,
      });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ!" });
    }
  }

  //[GET] departments/:id
  async show(req, res) {
    try {
      const { id } = req.params;

      // Validate ID (giả sử ID là số dương)
      if (!id || isNaN(id) || id <= 0) {
        return res.status(400).json({ message: "ID khoa không hợp lệ!" });
      }

      // Tìm khoa theo ID
      const department = await Department.findByPk(id);

      if (!department) {
        return res.status(404).json({ message: "Khoa không tồn tại!" });
      }

      return res.status(200).json(department);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ!" });
    }
  }

  //[POST] departments
  async create(req, res) {
    const { name, description } = req.body;

    // Tự viết validate
    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return res.status(400).json({ message: "Tên khoa không hợp lệ, phải có ít nhất 3 ký tự!" });
    }

    if (description && (typeof description !== "string" || description.trim().length < 5)) {
      return res.status(400).json({ message: "Mô tả không hợp lệ, phải có ít nhất 5 ký tự!" });
    }

    try {
      // Tạo khoa mới
      const newDepartment = await Department.create({ name, description });

      return res.status(201).json({ message: "Tạo khoa thành công!", department: newDepartment });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ!" });
    }
  }

  //[PUT] departments/:id
  async update(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    // Validate ID
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID khoa không hợp lệ!" });
    }

    // Validate name
    if (name && (typeof name !== "string" || name.trim().length < 3)) {
      return res.status(400).json({ message: "Tên khoa không hợp lệ, phải có ít nhất 3 ký tự!" });
    }

    // Validate description
    if (description && (typeof description !== "string" || description.trim().length < 5)) {
      return res.status(400).json({ message: "Mô tả không hợp lệ, phải có ít nhất 5 ký tự!" });
    }

    try {
      // Cập nhật khoa
      const department = await Department.findByPk(id);
      if (!department) {
        return res.status(404).json({ message: "khoa không tồn tại!" });
      }

      const departmentUpdate = await Department.update(
        { name, description },
        { where: { department_id: id } }
      );

      return res.status(200).json({ message: "Cập nhật khoa thành công!" });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ!" });
    }
  }

  //[DELETE] departments/:id
  async destroy(req, res) {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "ID khoa không hợp lệ!" });
    }

    try {
      const department = await Department.findByPk(id);

      if (!department) {
        return res.status(404).json({ message: "Khoa không tồn tại!" });
      }

      await Department.destroy({ where: { department_id: id } });

      return res.status(200).json({ message: "Xoá khoa thành công!" });
    } catch (error) {
      return res.status(500).json({ message: "Lỗi máy chủ!" });
    }
  }
}

module.exports = new departmentService();
