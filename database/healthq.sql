-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 20, 2026 at 10:41 AM
-- Server version: 8.0.45
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthq`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `app_id` char(36) NOT NULL DEFAULT (uuid()),
  `user_id` char(36) DEFAULT NULL,
  `doctor_id` bigint DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `note` text,
  `confirmed_at` timestamp NULL DEFAULT NULL,
  `files` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_slots`
--

CREATE TABLE `appointment_slots` (
  `slot_id` char(36) NOT NULL DEFAULT (uuid()),
  `app_id` char(36) NOT NULL,
  `slot_datetime` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` bigint NOT NULL,
  `doctor_name` text,
  `hospital_id` bigint DEFAULT NULL,
  `specialty_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `doctor_name`, `hospital_id`, `specialty_id`) VALUES
(1, 'นพ.สมชาย วัฒนา', 1, 1),
(2, 'พญ.สุชาดา ศรีสุข', 1, 2),
(3, 'นพ.ธนพล วิริยะ', 1, 3),
(4, 'พญ.กมลวรรณ ศรีไทย', 1, 4),
(5, 'นพ.ชัยวัฒน์ อนันต์', 1, 5),
(6, 'พญ.พิมพ์ชนก ธนกิจ', 1, 6),
(7, 'นพ.วีระพล แสงทอง', 1, 7),
(8, 'พญ.อรทัย สุขใจ', 1, 8),
(9, 'นพ.ปกรณ์ ศิริชัย', 1, 9),
(10, 'พญ.ดวงพร รัตนา', 1, 10),
(11, 'นพ.ธีรภัทร วิชัย', 2, 11),
(12, 'พญ.สุรีย์พร แก้วดี', 2, 12),
(13, 'นพ.กิตติศักดิ์ ศรีวงศ์', 2, 13),
(14, 'พญ.ปวีณา แสงจันทร์', 2, 14),
(15, 'นพ.อนุชา สายทอง', 2, 15),
(16, 'พญ.ณัฐชา วงศ์ดี', 2, 16),
(17, 'นพ.ปริญญา ศรีสุข', 2, 17),
(18, 'พญ.กนกพร ศรีไทย', 2, 18),
(19, 'นพ.ชยพล ธนกิจ', 2, 19),
(20, 'พญ.วารุณี สุขใจ', 2, 20),
(21, 'นพ.ณรงค์ชัย วิริยะ', 3, 21),
(22, 'พญ.สุภาวดี ศิริชัย', 3, 1),
(23, 'นพ.ชาญชัย วัฒนา', 3, 2),
(24, 'พญ.กาญจนา ศรีสุข', 3, 3),
(25, 'นพ.วิทยา แสงทอง', 3, 4),
(26, 'พญ.อัญชลี สุขใจ', 3, 5),
(27, 'นพ.ธีรชัย ธนกิจ', 3, 6),
(28, 'พญ.รัชนี วงศ์ดี', 3, 7),
(29, 'นพ.สุเมธ ศรีไทย', 3, 8),
(30, 'พญ.จิราภรณ์ วิชัย', 3, 9),
(31, 'นพ.วุฒิชัย รัตนา', 1, 10),
(32, 'พญ.ดารณี ศรีวงศ์', 1, 11),
(33, 'นพ.กิตติคุณ สุขใจ', 1, 12),
(34, 'พญ.ภัทรา วัฒนา', 1, 13),
(35, 'นพ.ธนากร ศิริชัย', 1, 14),
(36, 'พญ.มาลี แสงทอง', 1, 15),
(37, 'นพ.ปฐมชัย ศรีไทย', 1, 16),
(38, 'พญ.สุพัตรา สุขใจ', 1, 17),
(39, 'นพ.ณัฐพล ธนกิจ', 1, 18),
(40, 'พญ.วราภรณ์ วิชัย', 1, 19),
(41, 'นพ.ปริญญา วัฒนา', 2, 20),
(42, 'พญ.สุรีรัตน์ ศรีสุข', 2, 21),
(43, 'นพ.อนันต์ ศิริชัย', 2, 1),
(44, 'พญ.กัลยา แสงทอง', 2, 2),
(45, 'นพ.ธนวัฒน์ สุขใจ', 2, 3),
(46, 'พญ.จารุวรรณ วิชัย', 2, 4),
(47, 'นพ.วีรชัย ศรีไทย', 2, 5),
(48, 'พญ.อรอนงค์ ธนกิจ', 2, 6),
(49, 'นพ.ชาญวิทย์ วงศ์ดี', 2, 7),
(50, 'พญ.กนกวรรณ ศิริชัย', 2, 8),
(51, 'นพ.สุรชัย แสงทอง', 3, 9),
(52, 'พญ.วาสนา สุขใจ', 3, 10),
(53, 'นพ.ธีรเดช วิชัย', 3, 11),
(54, 'พญ.พัชรี ศรีไทย', 3, 12),
(55, 'นพ.ณัฐวุฒิ ธนกิจ', 3, 13),
(56, 'พญ.ชไมพร วงศ์ดี', 3, 14),
(57, 'นพ.เอกชัย ศิริชัย', 3, 15),
(58, 'พญ.วรัญญา แสงทอง', 3, 16),
(59, 'นพ.กฤษณะ สุขใจ', 3, 17),
(60, 'พญ.สุภาภรณ์ วิชัย', 3, 18);

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `hospital_id` bigint NOT NULL,
  `hospital_name` text,
  `imgPath` text,
  `lat` text,
  `lang` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`hospital_id`, `hospital_name`, `imgPath`, `lat`, `lang`) VALUES
(1, 'Bangkok General Hospital', 'BangkokHospital.png', '13.7563', '100.5018'),
(2, 'Samitivej Sukhumvit Hospital', 'SamitivejSukhumvit.png', '13.7373', '100.5760'),
(3, 'Bumrungrad International Hospital', 'BumrungradHospital.png', '13.7466', '100.5520');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'Admin'),
(2, 'Patients');

-- --------------------------------------------------------

--
-- Table structure for table `specialties`
--

CREATE TABLE `specialties` (
  `specialty_id` bigint NOT NULL,
  `specialty_name` text,
  `icon` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `specialties`
--

INSERT INTO `specialties` (`specialty_id`, `specialty_name`, `icon`) VALUES
(1, 'หู คอ จมูก', NULL),
(2, 'ตา', NULL),
(3, 'สุขภาพสตรี', NULL),
(4, 'สุขภาพเพศชาย', NULL),
(5, 'หัวใจ', NULL),
(6, 'ตรวจสุขภาพ', NULL),
(7, 'กระดูกและข้อ', NULL),
(8, 'โรคระบบประสาทและสมอง', NULL),
(9, 'ส่งเสริมสุขภาพและอาชีวเวชศาสตร์', NULL),
(10, 'อายุรกรรม', NULL),
(11, 'โรคระบบทางเดินปัสสาวะ', NULL),
(12, 'เวชศาสตร์ฟื้นฟู และกายภาพบำบัด', NULL),
(13, 'วิสัญญี', NULL),
(14, 'เวชกรรม', NULL),
(15, 'โรคระบบทางเดินหายใจ', NULL),
(16, 'รังสีวินิจฉัย X-Ray', NULL),
(17, 'ทันตกรรม', NULL),
(18, 'ผิวหนัง', NULL),
(19, 'ระบบทางเดินอาหารและตับ', NULL),
(20, 'เบาหวานและต่อมไร้ท่อ', NULL),
(21, 'ศัลยกรรม', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` char(36) NOT NULL DEFAULT (uuid()),
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `full_name` text,
  `avatar_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `password` text,
  `role_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `full_name`, `avatar_url`, `created_at`, `updated_at`, `password`, `role_id`) VALUES
('433eac44-22ce-11f1-8430-d61288df7fa9', 'healthq@example.com', NULL, NULL, '2026-03-18 13:27:51', '2026-03-18 13:27:51', '$2b$10$fAhHK1H/fUrVo.mtMvqO0Onpz5lrcrCaUmM6Ms71VRfo87TN.R5gO', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE `users_info` (
  `user_id` char(36) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `full_name` text NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `nation` varchar(50) DEFAULT NULL,
  `nid` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `blood_type` varchar(5) DEFAULT NULL,
  `height` int DEFAULT NULL,
  `weight` int DEFAULT NULL,
  `allergies_med` json DEFAULT NULL,
  `chronic_conditions` json DEFAULT NULL,
  `regular_med` json DEFAULT NULL,
  `food_allergies` json DEFAULT NULL,
  `emergency_contact` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`app_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `appointment_slots`
--
ALTER TABLE `appointment_slots`
  ADD PRIMARY KEY (`slot_id`),
  ADD KEY `app_id` (`app_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `hospital_id` (`hospital_id`),
  ADD KEY `specialty_id` (`specialty_id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`hospital_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`specialty_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`);

--
-- Constraints for table `appointment_slots`
--
ALTER TABLE `appointment_slots`
  ADD CONSTRAINT `appointment_slots_ibfk_1` FOREIGN KEY (`app_id`) REFERENCES `appointments` (`app_id`);

--
-- Constraints for table `doctors`
--
ALTER TABLE `doctors`
  ADD CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`hospital_id`),
  ADD CONSTRAINT `doctors_ibfk_2` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`specialty_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Constraints for table `users_info`
--
ALTER TABLE `users_info`
  ADD CONSTRAINT `users_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
