const Account = require("../models/account.model.js");
const Lecturer = require("../models/lecturer.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { Op, where } = require("sequelize");


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Bí mật JWT từ biến môi trường
const JWT_EXPIRES_IN = '365d'; // Thời gian hết hạn của token
const JWT_REFRESH_EXPIRES_IN = '365d'; // Thời gian hết hạn của refresh token

class authController {

    // [POST] auth/login/
    async login(req, res) {
        const { username, password } = req.body;
        try {
            // Tìm user theo email hoặc username
            const account = await Account.findOne({
                where: {
                    username: username
                }
            });

            if (!account) {
                return res.status(400).json({ message: "Tài khoản người dùng không đúng" });
            }

            // Kiểm tra mật khẩu
            const isPasswordValid = await bcrypt.compare(password, account.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Mật khẩu không đúng" });
            }

            // Tìm giảng viên theo account_id
            const lecturer = await Lecturer.findOne({
                where: {
                    account_id: account.account_id
                }
            });

            if(lecturer.status == 0){
                return res.status(400).json({ message: "Thính giảng chưa được duyệt vào hệ thống!" });
            }

            // Tạo JWT
            const token = jwt.sign({ account: account.dataValues, lecturer: lecturer.dataValues, role: account.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            const refreshToken = jwt.sign({ account_id: account.account_id, role: account.role }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

            return res.status(200).json({ message: "Đăng nhập thành công", token, refreshToken });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi đăng nhập", error });
        }
    }


    // [POST] auth/refresh-token/
    async refreshToken(req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: "Vui lòng cung cấp refresh token" });
        }

        try {
            
            // Xác thực refresh token
            const decoded = jwt.verify(refreshToken, JWT_SECRET);

            const account = await Account.findOne({
                where: {
                  account_id: decoded.account_id
                }
            });

            if(!account) return res.status(400).json({ message: "Tài khoản không tồn tại", error }); 

            const newToken = jwt.sign({ account_id: decoded.account_id, role: decoded.account_id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

            return res.status(200).json({ token: newToken });
        } catch (error) {
            return res.status(400).json({ message: "Refresh token không hợp lệ", error });
        }
    }
}

module.exports = new authController();
