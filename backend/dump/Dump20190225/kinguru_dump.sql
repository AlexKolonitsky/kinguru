-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kinguru
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `media`
--

DROP DATABASE [IF EXISTS] kinguru;

CREATE DATABASE kinguru;

use kinguru;

DROP TABLE IF EXISTS `media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `meetupId` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `key` text NOT NULL,
  `source` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `media`
--

LOCK TABLES `media` WRITE;
/*!40000 ALTER TABLE `media` DISABLE KEYS */;
/*!40000 ALTER TABLE `media` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-25 12:08:19

DROP TABLE IF EXISTS `meetups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meetups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `isFree` tinyint(4) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `coverSource` longtext,
  `coverKey` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetups`
--

LOCK TABLES `meetups` WRITE;
/*!40000 ALTER TABLE `meetups` DISABLE KEYS */;
INSERT INTO `meetups` VALUES (5,'Javascript','Angular','Gomel',0,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(6,'Javascript','ReactJs','Brest',0,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(7,'Management','Scrum','Minsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(8,'Java','Spring','Vitebsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(9,'Javascript','ReactJs','Vitebsk',0,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(10,'Management','Scrum','Minsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(11,'Java','Spring','Minsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(12,'Javascript','Nodejs','Gomel',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(13,'Javascript','ReactJs','Brest',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(14,'Management','Scrum','Vitebsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(206,'Java','Meetup','Kiev',1,'2019-02-22 12:13:18','2019-02-22 12:13:18','2019-03-05 00:00:00','https://kinguru-images.s3.eu-west-1.amazonaws.com/1550837597552-event-6.jpg','1550837597552-event-6.jpg');
/*!40000 ALTER TABLE `meetups` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-25 12:08:20

DROP TABLE IF EXISTS `speakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `speakers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `createdAt` varchar(45) DEFAULT NULL,
  `updatedAt` varchar(45) DEFAULT NULL,
  `coverSource` longtext,
  `key` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `surname_UNIQUE` (`surname`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speakers`
--

LOCK TABLES `speakers` WRITE;
/*!40000 ALTER TABLE `speakers` DISABLE KEYS */;
INSERT INTO `speakers` VALUES (1,'Denis','Molodyanovich',NULL,NULL,NULL,NULL,NULL),(2,'Vlad','Vasiliev',NULL,NULL,NULL,NULL,NULL),(18,'Arthur','Bazhanov','2975b88237f93e2a13559c404d5fbf4b','2019-02-21 12:35:27','2019-02-21 12:35:27','https://kinguru-images.s3.eu-west-1.amazonaws.com/1550752527344-review-1.png','1550752527344-review-1.png'),(19,'Aasdfsa','asdsadsa','bec7dc259e53efdc4127d58942303ebe','2019-02-21 12:38:33','2019-02-21 12:38:33','https://kinguru-images.s3.eu-west-1.amazonaws.com/1550752713358-event-5.jpg','1550752713358-event-5.jpg'),(20,'sdfsdf','sdfdsf','bec7dc259e53efdc4127d58942303ebe','2019-02-21 12:39:43','2019-02-21 12:39:43','https://kinguru-images.s3.eu-west-1.amazonaws.com/1550752783556-event-5.jpg','1550752783556-event-5.jpg');
/*!40000 ALTER TABLE `speakers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-25 12:08:20

DROP TABLE IF EXISTS `meetupsspeakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `meetupsspeakers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meetupId` int(11) NOT NULL,
  `speakerId` int(11) NOT NULL,
  `createdAt` timestamp(6) NULL DEFAULT NULL,
  `updatedAt` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meetupId_MeetupsSpeaker_idx` (`meetupId`),
  KEY `speakerId_MeetupsSpeakers_idx` (`speakerId`),
  CONSTRAINT `meetupId_MeetupsSpeakers` FOREIGN KEY (`meetupId`) REFERENCES `meetups` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `speakerId_MeetupsSpeakers` FOREIGN KEY (`speakerId`) REFERENCES `speakers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetupsspeakers`
--

LOCK TABLES `meetupsspeakers` WRITE;
/*!40000 ALTER TABLE `meetupsspeakers` DISABLE KEYS */;
INSERT INTO `meetupsspeakers` VALUES (5,5,2,NULL,NULL),(6,6,1,NULL,NULL),(7,7,2,NULL,NULL),(8,8,1,NULL,NULL),(9,9,2,NULL,NULL),(10,10,1,NULL,NULL),(11,11,2,NULL,NULL),(12,12,1,NULL,NULL),(13,13,2,NULL,NULL),(14,14,1,NULL,NULL);
/*!40000 ALTER TABLE `meetupsspeakers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-25 12:08:20

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `username` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'52632a1e325828a95ff49deeac731dc5','arthur','bazhanov','498f8dce741188b0548eece9dd2f9b5e05c429018517bc25e91b52e81b1f482d','2019-02-22 17:04:40','2019-02-22 17:04:40');
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

-- Dump completed on 2019-02-25 12:08:20

