-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: kinguru
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `meetupsspeakers`
--

DROP TABLE IF EXISTS `meetupsspeakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `meetupsspeakers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `meetupId` int(11) NOT NULL,
  `speakerId` int(11) NOT NULL,
  `createdAt` timestamp(6) NULL DEFAULT NULL,
  `updatedAt` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meetupId_MeetupsSpeaker_idx` (`meetupId`),
  KEY `speakerId_MeetupsSpeakers_idx` (`speakerId`),
  CONSTRAINT `meetupId_MeetupsSpeakers` FOREIGN KEY (`meetupId`) REFERENCES `meetups` (`id`),
  CONSTRAINT `speakerId_MeetupsSpeakers` FOREIGN KEY (`speakerId`) REFERENCES `speakers` (`id`)
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

-- Dump completed on 2019-02-26 17:28:27
