-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2024 at 11:38 AM
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
(4, 'nguyenvana1', '$2a$10$XVu.vl8kWN7fQgaWxV/UjeC4wLqYbCBX82I0RFtnGQboSaDdNYLNC', 'lecturer', '2024-09-25 09:15:49', '2024-09-25 09:15:49'),
(6, 'nguyenvanb', '$2a$10$xDqhzB4QQiId1B4pX7ykjOtkeOrYiD7uAOlGx7K8Ul.DtEYTVm2pm', 'lecturer', '2024-09-25 09:27:19', '2024-09-25 09:27:19');

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
(5, 'Nhập môn Python', 'Python2024', 2, 3, '2024-09-25 08:29:03', '2024-09-25 08:29:03');

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
(2, 'Phòng CNTT', 'Phòng ban công nghệ thông tin', '2024-09-25 08:09:28', '2024-09-25 08:09:28');

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
  `degree` enum('Cử Nhân','Thạc Sĩ','Tiến Sĩ') DEFAULT 'Cử Nhân',
  `major` varchar(255) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `years_of_experience` int(11) DEFAULT NULL,
  `current_position` varchar(255) DEFAULT NULL,
  `institution` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `account_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`lecturer_id`, `name`, `gender`, `date_of_birth`, `email`, `phone`, `address`, `degree`, `major`, `university`, `years_of_experience`, `current_position`, `institution`, `bio`, `photo_url`, `account_id`, `createdAt`, `updatedAt`) VALUES
(4, 'Nguyễn Văn An', 'Nam', '1988-05-06', 'nguyenvana1@gmail.com', '0379962047', 'Tây Hồ, Hà Nội', 'Thạc Sĩ', 'Công Nghệ Thông Tin', 'Đại học Bách Khoa Hà Nội', 3, 'Lập trình viên', 'Công ty TNHH Beeup', 'Người hướng ngoại yêu thể thao và công nghệ', 'uploads\\photo-1727255749071-150914376.jpg', 4, '2024-09-25 09:15:49', '2024-09-25 09:15:49'),
(6, 'Nguyễn Văn Bình', 'Nam', '1988-05-06', 'nguyenvanb@gmail.com', '0379962048', 'Tây Hồ, Hà Nội', 'Thạc Sĩ', 'Công Nghệ Thông Tin', 'Đại học Bách Khoa Hà Nội', 3, 'Lập trình viên', 'Công ty TNHH Beeup', 'Người hướng ngoại yêu thể thao và công nghệ', 'uploads/lecturer_photos/photo-1727256439279-609098978.jpg', 6, '2024-09-25 09:27:19', '2024-09-25 09:27:19');

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
  `semester` varchar(50) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  ADD KEY `course_id` (`course_id`);

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
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `department_requests`
--
ALTER TABLE `department_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturers`
--
ALTER TABLE `lecturers`
  MODIFY `lecturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `lecturer_recommendations`
--
ALTER TABLE `lecturer_recommendations`
  MODIFY `recommendation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturer_schedule`
--
ALTER TABLE `lecturer_schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT;

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
