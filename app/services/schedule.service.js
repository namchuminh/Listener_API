const { Op, Sequelize } = require("sequelize");
const Schedule = require("../models/lecturer_schedule.model.js");
const Lecturer = require("../models/lecturer.model.js");
const Course = require("../models/course.model.js");
const moment = require('moment-timezone');

class ScheduleService {
    //[GET] schedules/
    async index(req, res) {
        try {
            const { week, lecturer_id } = req.query;
            
            const currentYear = new Date().getFullYear();
    
            if (!week) {
                return res.status(400).json({ message: 'Vui lòng cung cấp số tuần!' });
            }
    
            // Tạo đối tượng điều kiện mặc định
            const whereCondition = {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('WEEK', Sequelize.col('date'), 1), week),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), currentYear),
                ],
            };
    
            // Nếu có lecturer_id thì thêm vào điều kiện
            if (lecturer_id) {
                whereCondition[Op.and].push({ 'lecturer_id': lecturer_id });
            }
    
            // Truy vấn dữ liệu với điều kiện đã xây dựng
            const schedules = await Schedule.findAll({
                where: whereCondition,
                include: [
                    { model: Lecturer, attributes: ['lecturer_id', 'name', 'photo_url'] },
                    { model: Course, attributes: ['course_id', 'course_name'] }
                ],
            });
    
            // Định nghĩa từ điển chuyển đổi trạng thái
            const statusMapping = {
                pending: 'Chưa duyệt',
                approved: 'Chấp nhận',
                rejected: 'Từ chối'
            };
    
            // Tạo đối tượng để nhóm lịch theo các ngày trong tuần
            const formattedSchedules = {
                'Thứ 2': [],
                'Thứ 3': [],
                'Thứ 4': [],
                'Thứ 5': [],
                'Thứ 6': [],
                'Thứ 7': [],
                'Chủ Nhật': []
            };
    
            // Lặp qua từng lịch và phân nhóm theo ngày trong tuần
            schedules.forEach(schedule => {
                const date = new Date(schedule.date);
                const dayOfWeek = date.getDay();
                const timeRange = schedule.section; // Thay đổi tùy thuộc vào cách bạn lưu thời gian
    
                // Chuyển đổi status
                const statusInVietnamese = statusMapping[schedule.status] || schedule.status;
    
                // Đối tượng lịch giảng viên cho mỗi mục
                const scheduleItem = {
                    schedule_id: schedule.schedule_id,
                    lecturer_id: schedule.lecturer.lecturer_id,
                    name: schedule.lecturer.name,
                    photo_url: schedule.lecturer.photo_url,
                    course_name: schedule.course.course_name,
                    time: timeRange,
                    status: statusInVietnamese
                };
    
                // Phân lịch theo thứ trong tuần
                switch (dayOfWeek) {
                    case 1:
                        formattedSchedules['Thứ 2'].push(scheduleItem);
                        break;
                    case 2:
                        formattedSchedules['Thứ 3'].push(scheduleItem);
                        break;
                    case 3:
                        formattedSchedules['Thứ 4'].push(scheduleItem);
                        break;
                    case 4:
                        formattedSchedules['Thứ 5'].push(scheduleItem);
                        break;
                    case 5:
                        formattedSchedules['Thứ 6'].push(scheduleItem);
                        break;
                    case 6:
                        formattedSchedules['Thứ 7'].push(scheduleItem);
                        break;
                    case 0:
                        formattedSchedules['Chủ Nhật'].push(scheduleItem);
                        break;
                }
            });
    
            return res.status(200).json(formattedSchedules);
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi lấy danh sách lịch giảng viên!', error: error.message });
        }
    }
    
    //[GET] schedules/:id
    async show(req, res) {
        const { id } = req.params;
        try {
            const schedule = await Schedule.findOne({
                where: { schedule_id: id },
                include: [
                    { model: 'lecturers', attributes: ['lecturer_id', 'name'] },
                    { model: 'courses', attributes: ['course_id', 'name'] }
                ],
            });

            if (!schedule) {
                return res.status(404).json({ message: 'Lịch giảng viên không tìm thấy!' });
            }

            return res.status(200).json(schedule);
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi lấy lịch giảng viên!', error: error.message });
        }
    }

    //[POST] schedules
    async create(req, res) {
        try {
            const { lecturer_id, course_id, date, section } = req.body;
    
            // Validate input
            if (!lecturer_id || !course_id || !date || !section) {
                return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin mời thính giảng!' });
            }
    
            // Chuyển đổi chuỗi ngày thành đối tượng moment
            let scheduleDate = moment.tz(date, 'Asia/Ho_Chi_Minh');    
            // Định dạng lại ngày để lưu vào cơ sở dữ liệu
            const formattedDate = scheduleDate.format('YYYY-MM-DD HH:mm:ss');
    
            const newSchedule = await Schedule.create({
                lecturer_id,
                course_id,
                date: formattedDate,
                section,
                status: 'pending', // Mặc định là 'pending'
            });
    
            return res.status(201).json({ message: 'Đã gửi lời mời giảng dạy!', schedule: newSchedule });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi tạo lịch giảng viên!', error: error.message });
        }
    }

    // [PATCH] schedules/:id/status
    async status(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            // Kiểm tra nếu status không hợp lệ
            if (!status) {
                return res.status(400).json({ message: 'Trạng thái không hợp lệ!' });
            }

            // Tìm lịch giảng viên theo ID
            const result = await Schedule.findOne({
                where: { schedule_id: id }
            });

            if (!result) {
                return res.status(400).json({ message: 'Lịch giảng viên không tìm thấy!' });
            }

            // Cập nhật trạng thái mới
            result.status = status;

            // Lưu lại sự thay đổi
            await result.save();

            // Trả về thông báo thành công
            return res.status(200).json({ message: 'Trạng thái lịch giảng viên đã được cập nhật thành công!' });
        } catch (error) {
            console.error(error); // Log lỗi để kiểm tra chi tiết
            return res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái lịch giảng viên!', error: error.message });
        }
    }

    //[DELETE] schedules/:id
    async destroy(req, res) {
        const { id } = req.params;
        try {
            const result = await Schedule.destroy({
                where: { schedule_id: id },
            });

            if (!result) {
                return res.status(404).json({ message: 'Lịch giảng viên không tìm thấy!' });
            }

            return res.status(200).json({ message: 'Lịch giảng viên đã được xóa thành công!' });
        } catch (error) {
            return res.status(500).json({ message: 'Lỗi khi xóa lịch giảng viên!', error: error.message });
        }
    }
}

module.exports = new ScheduleService();
