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
-- Table structure for table `meetups`
--

DROP TABLE IF EXISTS `meetups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `meetups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `description` text,
  `maxGuest` int(11) DEFAULT '0',
  `guest` int(11) DEFAULT '0',
  `rate` int(11) DEFAULT '0',
  `location` varchar(45) DEFAULT NULL,
  `cost` int(11) DEFAULT '0',
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
INSERT INTO `meetups` VALUES (5,'Javascript','Angular',NULL,0,0,0,'Gomel',0,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(6,'Javascript','ReactJs',NULL,0,0,0,'Brest',0,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(7,'Management','Scrum',NULL,0,0,0,'Minsk',1,NULL,NULL,'2019-12-05 14:00:00',NULL,NULL),(8,'Java','Spring',NULL,0,0,0,'Vitebsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(9,'Javascript','ReactJs',NULL,0,0,0,'Vitebsk',0,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(10,'Management','Scrum',NULL,0,0,0,'Minsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(11,'Java','Spring',NULL,0,0,0,'Minsk',1,NULL,NULL,'2019-01-05 14:00:00',NULL,NULL),(12,'Javascript','Nodejs',NULL,0,0,0,'Gomel',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(13,'Javascript','ReactJs',NULL,0,0,0,'Brest',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(14,'Management','Scrum',NULL,0,0,0,'Vitebsk',1,NULL,NULL,'2019-05-05 14:00:00',NULL,NULL),(206,'Java','Meetup',NULL,0,0,0,'Kiev',1,'2019-02-22 12:13:18','2019-02-22 12:13:18','2019-03-05 00:00:00','https://kinguru-images.s3.eu-west-1.amazonaws.com/1550837597552-event-6.jpg','1550837597552-event-6.jpg');
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

-- Dump completed on 2019-02-26 17:28:28
