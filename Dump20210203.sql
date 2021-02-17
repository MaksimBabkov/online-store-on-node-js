-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: newdb2
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `kinder`
--

DROP TABLE IF EXISTS `kinder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kinder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `text` text NOT NULL,
  `silka` text NOT NULL,
  `oldcena` text NOT NULL,
  `img` text NOT NULL,
  `img1` text,
  `img2` text,
  `img3` text,
  `img4` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kinder`
--

LOCK TABLES `kinder` WRITE;
/*!40000 ALTER TABLE `kinder` DISABLE KEYS */;
INSERT INTO `kinder` VALUES (13,'Максим',1000,'Сантехника','20','3000','uploads\\63404926834b5c33654adccbc49dbb68','uploads\\ce9e26d485b1397c4577c83ff41381f2','uploads\\3071892d9beed5375bdef81dbdacf5ef','uploads\\dcda742b196339ac2686b6400cbb6f76','uploads\\ddac4001d3f35aad83129710140ccb2e');
/*!40000 ALTER TABLE `kinder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `men`
--

DROP TABLE IF EXISTS `men`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `men` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `text` text,
  `silka` text,
  `jldcena` text,
  `oldcena` text,
  `img` text,
  `img1` text,
  `img2` text,
  `img3` text,
  `img4` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `men`
--

LOCK TABLES `men` WRITE;
/*!40000 ALTER TABLE `men` DISABLE KEYS */;
INSERT INTO `men` VALUES (18,'zolotooly',1200,'Портфолио','50',NULL,'4500','uploads\\47146f1328fe8da7c4366891dcd679a1','uploads\\c13c86e6e3148e742c8752afe1d5130f','uploads\\cfa1ee06197f6b4581227c5c4d5dc7da','uploads\\7606c147f257d92c669a01aa9900a597','uploads\\3353258c11689c8109cc004ff312db37');
/*!40000 ALTER TABLE `men` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `img` text,
  `silka` text,
  `text` text,
  `oldcena` text,
  `img1` text,
  `img2` text,
  `img3` text,
  `img4` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (49,'Максим',1000,'uploads\\34d9e43841d5dc9102095859baa15895','50','Сантехника','4500','uploads\\174cb277bf5319d994d1c5dac5b2257d','uploads\\4f3b158fc8f6eb57f2ab288e76bdfb46','uploads\\c88d0790979ff13abecbe32d40a09b44','uploads\\6839c572e58b999eb058392ff6aac06d');
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

-- Dump completed on 2021-02-03 15:46:19
