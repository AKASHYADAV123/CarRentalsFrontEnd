CREATE DATABASE  IF NOT EXISTS `road_trip_rentals` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `road_trip_rentals`;
-- MySQL dump 10.13  Distrib 8.0.33, for macos13 (arm64)
--
-- Host: localhost    Database: road_trip_rentals
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'Harish','harish@gmail.com','123'),(2,'Priya Sharma','priya@example.com','priya456'),(3,'Rahul Gupta','rahul@example.com','rahul789');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `car_id` int DEFAULT NULL,
  `pickup_location` varchar(255) NOT NULL,
  `dropoff_location` varchar(255) DEFAULT NULL,
  `pickup_date` date NOT NULL,
  `dropoff_date` date NOT NULL,
  `booking_status` varchar(50) DEFAULT 'confirmed',
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `initial_amount` decimal(10,2) DEFAULT NULL,
  `final_amount` decimal(10,2) DEFAULT NULL,
  `initial_amount_status` varchar(50) DEFAULT NULL,
  `final_amount_status` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `actual_return_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `user_id` (`user_id`),
  KEY `car_id` (`car_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`car_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (11,1,2,'2','1','2024-06-01','2024-06-02','Closed','2024-06-01 03:34:01',134.00,0.00,'Paid','Paid',134.00,'2024-05-31'),(12,1,2,'2',NULL,'2024-06-02','2024-06-10','Refunded','2024-06-01 03:34:42',603.00,0.00,'Paid',NULL,603.00,NULL),(13,1,3,'2',NULL,'2024-06-03','2024-06-11','Refunded','2024-06-01 03:35:25',405.00,0.00,'Paid',NULL,405.00,NULL),(14,1,2,'2',NULL,'2024-06-11','2024-06-26','Confirmed','2024-06-01 16:05:09',1072.00,0.00,'Paid',NULL,1072.00,NULL),(15,2,13,'3',NULL,'2024-06-17','2024-06-26','Confirmed','2024-06-15 02:20:25',400.00,0.00,'Paid',NULL,400.00,NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch_managers`
--

DROP TABLE IF EXISTS `branch_managers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch_managers` (
  `manager_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`manager_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_managers`
--

LOCK TABLES `branch_managers` WRITE;
/*!40000 ALTER TABLE `branch_managers` DISABLE KEYS */;
INSERT INTO `branch_managers` VALUES (1,'Nithin','nithin@gmail.com','21312312','123'),(2,'Megha','megha@gmail.com','123213','123'),(3,'Akash','akash@gmail.com','1232132132','123');
/*!40000 ALTER TABLE `branch_managers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branches`
--

DROP TABLE IF EXISTS `branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branches` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `branch_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  `branch_manager_id` int DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `fk_branch_manager` (`branch_manager_id`),
  CONSTRAINT `fk_branch_manager` FOREIGN KEY (`branch_manager_id`) REFERENCES `branch_managers` (`manager_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branches`
--

LOCK TABLES `branches` WRITE;
/*!40000 ALTER TABLE `branches` DISABLE KEYS */;
INSERT INTO `branches` VALUES (1,'OP branch','Overland park','234-213-4234',1),(2,'Dallas','Dalls, TX','234-234-2342',2),(3,'Olathe','Ks','234-234-2342',3);
/*!40000 ALTER TABLE `branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_owners`
--

DROP TABLE IF EXISTS `car_owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_owners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_owners`
--

LOCK TABLES `car_owners` WRITE;
/*!40000 ALTER TABLE `car_owners` DISABLE KEYS */;
INSERT INTO `car_owners` VALUES (2,'rihana','k','rihana@gmail.com','123','2','jh','j','jh','j'),(3,'Sunil','G','sunil@gmail.com','123','pointe','op','ks','31221','USA');
/*!40000 ALTER TABLE `car_owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `car_id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `description` text,
  `rental_rate` decimal(10,2) NOT NULL,
  `availability_status` enum('available','unavailable') DEFAULT 'available',
  `image_url` varchar(255) DEFAULT NULL,
  `owner_id` int DEFAULT NULL,
  `branch_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `proposed_owner_rent` decimal(10,2) DEFAULT '0.00',
  `approved_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `owner_balance` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`car_id`),
  KEY `fk_cars_branch_id` (`branch_id`,`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (1,'BMW','new',2025,'s',100.00,NULL,'car_1.png',NULL,1,'Approved',0.00,NULL,NULL,0.00),(2,'Toyota::LL','new18898',2011,'ddashduj',67.00,NULL,'car_2.webp',NULL,2,'Approved',0.00,NULL,NULL,0.00),(3,'Honda','accord',2013,'new',45.00,NULL,'car_3.avif',NULL,2,'Approved',0.00,NULL,NULL,0.00),(4,'Chevrolet','old',2019,'sd',24.00,NULL,'car_4.jpeg',NULL,2,'Approved',0.00,NULL,NULL,0.00),(5,'Ford','new1',2012,'sd',22.00,NULL,'car_5.jpeg',NULL,2,'Approved',0.00,NULL,NULL,0.00),(6,'Honda','new::::::',2025,'sdbjk',0.00,NULL,'car_6.jpeg',NULL,1,'Approved',500.00,NULL,NULL,0.00),(10,'Ford','wll',20133,'dsasda',34.00,NULL,'car_10.webp',2,2,'Returned',233.00,'2024-05-25','2024-05-25',7.77),(11,'Honda','new213`1',1998,'dsfdsas',25.00,NULL,'car_11.avif',NULL,2,'Approved',0.00,NULL,NULL,0.00),(12,'Honda','new',2022,'new car',30.00,NULL,'car_12.png',NULL,3,'Approved',0.00,NULL,NULL,0.00),(13,'BMW','new1',1996,'as',40.00,NULL,'car_13.png',3,3,'Approved',50.00,'2024-06-14',NULL,0.00);
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `payment_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `payment_status` varchar(30) DEFAULT 'pending',
  `card_number` varchar(20) DEFAULT NULL,
  `expiry_date` varchar(30) DEFAULT NULL,
  `cvv` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (12,1,134.00,'2024-05-31 22:34:01','Success','1234234234234234','12/22','231'),(13,12,603.00,'2024-05-31 22:34:43','Success','1234234234234234','12/34','233'),(14,13,405.00,'2024-05-31 22:35:26','Success','1234234234234234','12/34','234'),(15,14,1072.00,'2024-06-01 11:05:10','Success','3322343234323432','12/23','222'),(16,15,400.00,'2024-06-14 21:20:26','Success','1234321234543212','02/23','233');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `car_id` int DEFAULT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `review_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `car_id` (`car_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`car_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (7,1,2,4,'hjbjhk','2024-06-01 17:46:49');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('customer','car_owner','admin') NOT NULL,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'123','harisht@gmail.com','customer','2024-05-25 22:57:39','Harish::','Th'),(2,'123','santhosh@gmail.com','customer','2024-06-15 02:16:21','santhosh','k');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-20 21:05:42
