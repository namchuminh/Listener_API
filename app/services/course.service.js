const { Op } = require("sequelize");
const Course = require("../models/course.model.js");
const Department = require("../models/department.model.js");

class courseService {
    //[GET] courses/
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
                    course_name: {
                        [Op.like]: `%${search}%`,
                    },
                }
                : {};

            // Tính tổng số lượng khóa học
            const totalCourses = await Course.count({
                where: searchCondition,
            });

            // Tính tổng số trang
            const totalPages = Math.ceil(totalCourses / limit);

            // Lấy danh sách khóa học theo phân trang và điều kiện tìm kiếm
            const courses = await Course.findAll({
                where: searchCondition,
                offset: (page - 1) * limit,
                limit: parseInt(limit),
                order: [['createdAt', 'DESC']]
            });

            return res.status(200).json({
                totalCourses,
                currentPage: parseInt(page),
                totalPages,
                courses,
            });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi máy chủ!" });
        }
    }

    //[GET] courses/:id
    async show(req, res) {
        try {
            const { id } = req.params;

            // Validate ID
            if (!id || isNaN(id) || id <= 0) {
                return res.status(400).json({ message: "ID khóa học không hợp lệ!" });
            }

            // Tìm khóa học theo ID
            const course = await Course.findByPk(id);

            if (!course) {
                return res.status(404).json({ message: "Khóa học không tồn tại!" });
            }

            return res.status(200).json(course);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi máy chủ!" });
        }
    }

    //[POST] courses
    async create(req, res) {
        const { course_name, course_code, department_id, credits } = req.body;

        // Validate dữ liệu đầu vào
        if (!course_name || typeof course_name !== "string" || course_name.trim().length < 3) {
            return res.status(400).json({ message: "Tên khóa học không hợp lệ, phải có ít nhất 3 ký tự!" });
        }

        if (!course_code || typeof course_code !== "string" || course_code.trim().length < 3) {
            return res.status(400).json({ message: "Mã khóa học không hợp lệ!" });
        }

        // Kiểm tra xem course_code đã tồn tại trong CSDL hay chưa
        const existingCourse = await Course.findOne({ where: { course_code } });
        if (existingCourse) {
            return res.status(400).json({ message: "Mã khóa học đã tồn tại!" });
        }

        // Kiểm tra xem department_id có tồn tại trong bảng departments hay không
        const existingDepartment = await Department.findByPk(department_id);
        if (!existingDepartment) {
            return res.status(400).json({ message: "ID khoa không tồn tại!" });
        }

        try {
            // Tạo khóa học mới
            const newCourse = await Course.create({ course_name, course_code, department_id, credits });

            return res.status(201).json({ message: "Tạo khóa học thành công!", course: newCourse });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi máy chủ!" });
        }
    }

    //[PUT] courses/:id
    async update(req, res) {
        const { id } = req.params;
        const { course_name, course_code, department_id, credits } = req.body;

        // Validate ID
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID khóa học không hợp lệ!" });
        }

        // Validate dữ liệu đầu vào
        if (course_name && (typeof course_name !== "string" || course_name.trim().length < 3)) {
            return res.status(400).json({ message: "Tên khóa học không hợp lệ!" });
        }

        if (course_code && (typeof course_code !== "string" || course_code.trim().length < 3)) {
            return res.status(400).json({ message: "Mã khóa học không hợp lệ!" });
        }

        // Kiểm tra xem department_id có tồn tại trong bảng departments hay không
        if (department_id) {
            const existingDepartment = await Department.findByPk(department_id);
            if (!existingDepartment) {
                return res.status(400).json({ message: "ID khoa không tồn tại!" });
            }
        }

        try {
            // Tìm khóa học hiện tại
            const course = await Course.findByPk(id);
            if (!course) {
                return res.status(404).json({ message: "Khóa học không tồn tại!" });
            }

            // Kiểm tra tính duy nhất của course_code, trừ khóa học hiện tại
            if (course_code && course_code !== course.course_code) {
                const existingCourse = await Course.findOne({ where: { course_code } });
                if (existingCourse) {
                    return res.status(400).json({ message: "Mã khóa học đã tồn tại!" });
                }
            }

            // Cập nhật khóa học
            await Course.update(
                { course_name, course_code, department_id, credits },
                { where: { course_id: id } }
            );

            return res.status(200).json({ message: "Cập nhật khóa học thành công!" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi máy chủ!" });
        }
    }


    //[DELETE] courses/:id
    async destroy(req, res) {
        const { id } = req.params;

        // Validate ID
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ message: "ID khóa học không hợp lệ!" });
        }

        try {
            // Xoá khóa học
            const course = await Course.findByPk(id);
            if (!course) {
                return res.status(404).json({ message: "Khóa học không tồn tại!" });
            }

            await Course.destroy({ where: { course_id: id } });

            return res.status(200).json({ message: "Xoá khóa học thành công!" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi máy chủ!" });
        }
    }
}

module.exports = new courseService();
