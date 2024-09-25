const { Op } = require('sequelize');
const Lecturer = require('../models/lecturer.model'); // Update the path as necessary
const Account = require('../models/account.model'); // Update the path as necessary
const bcrypt = require('bcryptjs');
const path = require('path');

class lecturerService {
    // [GET] lecturers/
    async index(req, res) {
        try {
            const { page = 1, limit = 10, search = '' } = req.query; // Added search parameter
            const offset = (page - 1) * limit;
    
            // Search and order by createdAt DESC
            const lecturers = await Lecturer.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%` // Searching by lecturer name
                    }
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']] // Order by createdAt descending
            });
    
            return res.status(200).json({
                total: lecturers.count,
                totalPages: Math.ceil(lecturers.count / limit),
                currentPage: page,
                lecturers: lecturers.rows,
            });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
        }
    }

    // [GET] lecturers/:id
    async show(req, res) {
        const { id } = req.params;

        // Validate ID
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID giảng viên không hợp lệ!' });
        }

        try {
            const lecturer = await Lecturer.findByPk(id);
            if (!lecturer) {
                return res.status(404).json({ message: 'Giảng viên không tồn tại!' });
            }
            return res.status(200).json({ lecturer });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
        }
    }

    // [POST] lecturers/
    async create(req, res) {
        const {
            name,
            gender,
            date_of_birth,
            email,
            phone,
            address,
            degree,
            major,
            university,
            years_of_experience,
            current_position,
            institution,
            bio,
        } = req.body;

        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length < 3) {
            return res.status(400).json({ message: 'Tên giảng viên không hợp lệ!' });
        }

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Tên đăng nhập và mật khẩu là bắt buộc!' });
        }

        // Check for unique email, phone, and username
        try {
            const existingLecturer = await Lecturer.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { phone: phone },
                    ]
                }
            });

            const existingAccount = await Account.findOne({
                where: { username: username }
            });

            if (existingLecturer) {
                return res.status(400).json({ message: 'Email hoặc số điện thoại đã được sử dụng!' });
            }

            if (existingAccount) {
                return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi kiểm tra trùng lặp!', error: error.message });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            // Create account
            const account = await Account.create({
                username,
                password: hashedPassword,
            });

            // Handle photo upload
            const photoUrl = req.file ? path.join('uploads/lecturer_photos', req.file.filename).replace(/\\/g, '/') : null;

            // Create lecturer
            const newLecturer = await Lecturer.create({
                name,
                gender,
                date_of_birth,
                email,
                phone,
                address,
                degree,
                major,
                university,
                years_of_experience,
                current_position,
                institution,
                bio,
                photo_url: photoUrl,
                account_id: account.account_id, // Link the lecturer to the created account
            });

            return res.status(201).json({ message: 'Tạo giảng viên thành công!', lecturer: newLecturer });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
        }
    }


    async update(req, res) {
        const { id } = req.params;
        const {
            name,
            gender,
            date_of_birth,
            email,
            phone,
            address,
            degree,
            major,
            university,
            years_of_experience,
            current_position,
            institution,
            bio,
        } = req.body;

        // Validate ID
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID giảng viên không hợp lệ!' });
        }

        try {
            // Find lecturer
            const lecturer = await Lecturer.findByPk(id);
            if (!lecturer) {
                return res.status(404).json({ message: 'Giảng viên không tồn tại!' });
            }

            // Handle photo upload
            const photoUrl = req.file ? path.join('uploads', req.file.filename).replace(/\\/g, '/') : lecturer.photo_url;

            // Check for unique email and phone
            const emailExists = await Lecturer.findOne({ where: { email, lecturer_id: { [Op.ne]: id } } });
            if (emailExists) {
                return res.status(400).json({ message: 'Email đã tồn tại!' });
            }

            const phoneExists = await Lecturer.findOne({ where: { phone, lecturer_id: { [Op.ne]: id } } });
            if (phoneExists) {
                return res.status(400).json({ message: 'Số điện thoại đã tồn tại!' });
            }

            // Update lecturer
            await Lecturer.update(
                {
                    name,
                    gender,
                    date_of_birth,
                    email,
                    phone,
                    address,
                    degree,
                    major,
                    university,
                    years_of_experience,
                    current_position,
                    institution,
                    bio,
                    photo_url: photoUrl,
                },
                { where: { lecturer_id: id } }
            );

            return res.status(200).json({ message: 'Cập nhật giảng viên thành công!' });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
        }
    }

    // [DELETE] lecturers/:id
    async destroy(req, res) {
        const { id } = req.params;

        // Validate ID
        if (!id || isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'ID giảng viên không hợp lệ!' });
        }

        try {
            const lecturer = await Lecturer.findByPk(id);
            if (!lecturer) {
                return res.status(404).json({ message: 'Giảng viên không tồn tại!' });
            }

            // Delete the associated account
            await Account.destroy({ where: { account_id: lecturer.account_id } });

            // Delete lecturer
            await Lecturer.destroy({ where: { lecturer_id: id } });

            return res.status(200).json({ message: 'Xóa giảng viên thành công!' });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi máy chủ!', error: error.message });
        }
    }
}

module.exports = new lecturerService();
