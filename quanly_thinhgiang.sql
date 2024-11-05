-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2024 at 03:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanly_thinhgiang`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','lecturer') NOT NULL DEFAULT 'lecturer',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `username`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(4, 'nguyenvana', '$2a$10$XVu.vl8kWN7fQgaWxV/UjeC4wLqYbCBX82I0RFtnGQboSaDdNYLNC', 'admin', '2024-09-25 09:15:49', '2024-09-25 09:15:49'),
(7, 'nguyenvanb', '$2a$10$Wx4IJJkDL2criLIk2lwEJuJCSgZrSMm4PP3dVVW63D9qe1a3WAjkG', 'lecturer', '2024-11-04 08:09:42', '2024-11-04 08:09:42'),
(8, 'nguyenvanc', '$2a$10$bdoU7QjOJJkjiOA5YJa9Bu87mSv9DZNNzaMe7JJui1FXXNI7fzLjG', 'lecturer', '2024-11-05 09:36:52', '2024-11-05 09:36:52'),
(9, 'g', '$2a$10$ROoPedSF4iuIPHpLDE5OEOQ.Gqdz4YYWNB5r8gnG65lqVhm80YmwW', 'lecturer', '2024-11-05 09:41:38', '2024-11-05 09:41:38'),
(11, 'ggio', '$2a$10$/i4cEcMh/W8/HHGxALpFbuIMkuYXCJg/nQkLbY7jCuRfjO7viUWa.', 'lecturer', '2024-11-05 10:00:35', '2024-11-05 10:00:35'),
(12, 'ggiof', '$2a$10$f68A2I2qjKtJ1HjayxqSt.w7p4kBy.HeSYs1xL7xhQO9wmzqDXmAC', 'lecturer', '2024-11-05 10:01:38', '2024-11-05 10:01:38'),
(13, 'nam2222', '$2a$10$SZvZhLWFsLcXB8iN02WfvOsVqRGndeq3BUuBfGZ6vfH715Dhj2pGm', 'lecturer', '2024-11-05 12:45:40', '2024-11-05 12:45:40');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `course_code` varchar(50) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_name`, `course_code`, `department_id`, `credits`, `createdAt`, `updatedAt`) VALUES
(4, 'Lập trình mạng', 'LTM2024', 2, 3, '2024-09-25 08:28:45', '2024-09-25 08:28:45'),
(5, 'Nhập môn Python', 'Python2024', 2, 3, '2024-09-25 08:29:03', '2024-09-25 08:29:03'),
(7, 'Lap trinh c', 'Cpp', 4, 3, '2024-11-04 09:37:22', '2024-11-04 09:37:22');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(2, 'Phòng CNTT', 'Phòng ban công nghệ thông tin', '2024-09-25 08:09:28', '2024-09-25 08:09:28'),
(4, 'Mang may tinh', 'Mang may tinh', '2024-11-04 08:22:00', '2024-11-04 08:22:00');

-- --------------------------------------------------------

--
-- Table structure for table `department_requests`
--

CREATE TABLE `department_requests` (
  `request_id` int(11) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `lecturer_id` int(11) DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `request_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

CREATE TABLE `lecturers` (
  `lecturer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` enum('Nam','Nữ') DEFAULT 'Nam',
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `degree` enum('Cử Nhân','Kỹ Sư','Chuyên Gia','Thạc Sĩ','Tiến Sĩ','Giáo Sư') DEFAULT 'Cử Nhân',
  `major` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `photo_degree` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `account_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`lecturer_id`, `name`, `gender`, `date_of_birth`, `email`, `phone`, `address`, `degree`, `major`, `photo_url`, `photo_degree`, `status`, `account_id`, `createdAt`, `updatedAt`) VALUES
(4, 'Nguyễn Văn An', 'Nam', '1988-05-06', 'nguyenvana1@gmail.com', '0379962047', 'Tây Hồ, Hà Nội', 'Thạc Sĩ', 'Công Nghệ Thông Tin', 'uploads/lecturer_photos/photo-1730800834979-217482108.jpg', 'uploads/lecturer_photos/photo-1730799698019-171474197.jpg', 1, 4, '2024-09-25 09:15:49', '2024-09-25 09:15:49'),
(7, 'Nguyễn Văn Bình', 'Nam', '1988-05-06', 'nguyenvanb@gmail.com', '0379962048', 'Tây Hồ, Hà Nội', 'Thạc Sĩ', 'Công Nghệ Thông Tin', 'uploads/lecturer_photos/photo-1730800834979-217482108.jpg', 'uploads/lecturer_photos/photo-1730799698019-171474197.jpg', 1, 7, '2024-11-04 08:09:42', '2024-11-04 08:09:42'),
(8, 'Nguyễn Văn chung', 'Nam', '1988-05-06', 'nguyenvanc@gmail.com', '0379962042', 'Tây Hồ, Hà Nội', 'Thạc Sĩ', 'Công Nghệ Thông Tin', 'uploads/lecturer_photos/photo-1730800834979-217482108.jpg', 'uploads/lecturer_photos/photo-1730799698019-171474197.jpg', 0, 8, '2024-11-05 09:36:52', '2024-11-05 09:36:52'),
(9, 'Nam', 'Nam', '1999-09-09', 'G@gmail.com', '099966633', 'Hn', 'Kỹ Sư', '4', 'uploads/lecturer_photos/photo-1730799698019-171474197.jpg', 'uploads/lecturer_photos/photo-1730799698019-171474197.jpg', 0, 9, '2024-11-05 09:41:38', '2024-11-05 09:41:38'),
(11, 'Nam', 'Nam', '1999-09-09', 'GgfG@gmail.com', '099966635', 'Hn', 'Kỹ Sư', '4', 'uploads/lecturer_photos/photo-1730800834979-217482108.jpg', 'uploads/lecturer_photos/photoDegree-1730800835039-102530991.jpg', 0, 11, '2024-11-05 10:00:35', '2024-11-05 10:00:35'),
(12, 'Nam', 'Nam', '1999-09-09', 'GgffG@gmail.com', '099966699', 'Hn', 'Kỹ Sư', '4', 'uploads/lecturer_photos/photo-1730800834979-217482108.jpg', 'uploads/lecturer_photos/photoDegree-1730800897810-621750943.jpg', 0, 12, '2024-11-05 10:01:38', '2024-11-05 10:01:38'),
(13, 'Nam222', 'Nam', '1988-04-05', 'nam222@gmail.com', '0379962045', 'Hn', 'Thạc Sĩ', 'Mang may tinh', 'uploads/lecturer_photos/photo-1730810740492-650063149.jpg', 'uploads/lecturer_photos/photoDegree-1730810740555-160511130.jpg', 1, 13, '2024-11-05 12:45:40', '2024-11-05 12:45:40');

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_recommendations`
--

CREATE TABLE `lecturer_recommendations` (
  `recommendation_id` int(11) NOT NULL,
  `recommender_id` int(11) DEFAULT NULL,
  `recommended_lecturer_id` int(11) DEFAULT NULL,
  `recommendation_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_schedule`
--

CREATE TABLE `lecturer_schedule` (
  `schedule_id` int(11) NOT NULL,
  `lecturer_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `date` date DEFAULT current_timestamp(),
  `section` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lecturer_schedule`
--

INSERT INTO `lecturer_schedule` (`schedule_id`, `lecturer_id`, `course_id`, `date`, `section`, `status`, `createdAt`, `updatedAt`) VALUES
(2, 13, 5, '2024-11-06', 'Tiết 10 - Tiết 12', 'pending', '2024-11-05 12:56:11', '2024-11-05 12:56:11'),
(3, 13, 7, '2024-11-10', 'Tiết 7 - Tiết 12', 'pending', '2024-11-05 13:33:26', '2024-11-05 13:33:26'),
(4, 7, 7, '2024-11-08', 'Tiết 7 - Tiết 12', 'pending', '2024-11-05 13:35:13', '2024-11-05 13:35:13'),
(5, 4, 7, '2024-11-08', 'Tiết 7 - Tiết 11', 'pending', '2024-11-05 13:35:45', '2024-11-05 13:35:45'),
(6, 4, 7, '2024-11-08', 'Tiết 7 - Tiết 9', 'pending', '2024-11-05 13:38:12', '2024-11-05 13:38:12'),
(7, 13, 7, '2024-11-08', 'Tiết 4 - Tiết 6', 'pending', '2024-11-05 13:41:55', '2024-11-05 13:41:55'),
(8, 13, 5, '2024-11-08', 'Tiết 7 - Tiết 12', 'pending', '2024-11-05 13:43:06', '2024-11-05 13:43:06'),
(9, 13, 5, '2024-11-08', 'Tiết 4 - Tiết 6', 'pending', '2024-11-05 13:43:33', '2024-11-05 13:43:33');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `report_type` enum('teaching','violation','result') NOT NULL,
  `description` text DEFAULT NULL,
  `report_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teaching_results`
--

CREATE TABLE `teaching_results` (
  `result_id` int(11) NOT NULL,
  `lecturer_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `evaluation_score` decimal(5,2) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `violations`
--

CREATE TABLE `violations` (
  `violation_id` int(11) NOT NULL,
  `lecturer_id` int(11) DEFAULT NULL,
  `violation_description` text DEFAULT NULL,
  `violation_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD UNIQUE KEY `course_code` (`course_code`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `department_requests`
--
ALTER TABLE `department_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `lecturer_id` (`lecturer_id`);

--
-- Indexes for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD PRIMARY KEY (`lecturer_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `lecturer_recommendations`
--
ALTER TABLE `lecturer_recommendations`
  ADD PRIMARY KEY (`recommendation_id`),
  ADD KEY `recommender_id` (`recommender_id`),
  ADD KEY `recommended_lecturer_id` (`recommended_lecturer_id`);

--
-- Indexes for table `lecturer_schedule`
--
ALTER TABLE `lecturer_schedule`
  ADD PRIMARY KEY (`schedule_id`),
  ADD KEY `lecturer_id` (`lecturer_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `section_id` (`section`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `teaching_results`
--
ALTER TABLE `teaching_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `lecturer_id` (`lecturer_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `violations`
--
ALTER TABLE `violations`
  ADD PRIMARY KEY (`violation_id`),
  ADD KEY `lecturer_id` (`lecturer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `department_requests`
--
ALTER TABLE `department_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `lecturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `lecturer_recommendations`
--
ALTER TABLE `lecturer_recommendations`
  MODIFY `recommendation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturer_schedule`
--
ALTER TABLE `lecturer_schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teaching_results`
--
ALTER TABLE `teaching_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `violations`
--
ALTER TABLE `violations`
  MODIFY `violation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`);

--
-- Constraints for table `department_requests`
--
ALTER TABLE `department_requests`
  ADD CONSTRAINT `department_requests_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `department_requests_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  ADD CONSTRAINT `department_requests_ibfk_3` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`);

--
-- Constraints for table `lecturers`
--
ALTER TABLE `lecturers`
  ADD CONSTRAINT `lecturers_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `lecturer_recommendations`
--
ALTER TABLE `lecturer_recommendations`
  ADD CONSTRAINT `lecturer_recommendations_ibfk_1` FOREIGN KEY (`recommender_id`) REFERENCES `lecturers` (`lecturer_id`),
  ADD CONSTRAINT `lecturer_recommendations_ibfk_2` FOREIGN KEY (`recommended_lecturer_id`) REFERENCES `lecturers` (`lecturer_id`);

--
-- Constraints for table `lecturer_schedule`
--
ALTER TABLE `lecturer_schedule`
  ADD CONSTRAINT `lecturer_schedule_ibfk_1` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`),
  ADD CONSTRAINT `lecturer_schedule_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `teaching_results`
--
ALTER TABLE `teaching_results`
  ADD CONSTRAINT `teaching_results_ibfk_1` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`),
  ADD CONSTRAINT `teaching_results_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

--
-- Constraints for table `violations`
--
ALTER TABLE `violations`
  ADD CONSTRAINT `violations_ibfk_1` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
