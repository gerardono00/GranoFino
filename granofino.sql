-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: el_grano_fino
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.24.04.1

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
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pendiente',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_method` varchar(50) DEFAULT NULL,
  `payment_status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Café Americanoo','Café negro elaborado con granos premium',45.00,'https://cdn.recetasderechupete.com/wp-content/uploads/2023/11/Cafe-americano-portada-1200x828.jpg','Cafe '),(2,'Cafe Express','rico cafe',25.00,'https://www.novachef.es/media/images/espresso-macchiato.jpg','Cafe'),(3,'Pan de concha','rico pan de concha ',15.00,'https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2019/04/receta-de-conchas-de-pan.jpg','pan'),(4,'Pan dulce con frutos rojos','Pan dulce con frutos rojos la especialidad de la casa',30.00,'https://foodit.lanacion.com.ar/resizer/v2/pan-dulce-con-frutos-3VF2EDNMRJADZNOHARA66SLCK4.jpg?auth=f3c935d89af052ec25d78f7d6d093b56cb0fecea3230ea5550b21c12a228c6ae&width=880&height=586&quality=70&smart=true','pan'),(5,'Cafe latte','Cafe latte delicioso',40.00,'https://images.ctfassets.net/0e6jqcgsrcye/4rpV2CxvLe7nMPEcQHaWRr/b63440ae2b13de6a21762602ca49e81c/Cafe_Au_Lait_vs_Latte.jpg','Cafe'),(6,'Cafe Iris','buenisimo el que le gusta la patron',50.00,'https://i.blogs.es/3696d1/cafe-irlades2/1366_2000.jpg','Cafe'),(7,'Cafe cappuccino','Cafe rico tal vez le guste este cafe a orkidea',20.00,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRs5fJe09TJXAfvTg0jCfg2B6tjhZwjaKkg&s','Cafe'),(8,'Dona','dona de chocolate',20.00,'https://i.pinimg.com/736x/e1/47/2d/e1472d31dbaf61ceec7980332802afb7.jpg','Pan'),(9,'Pan Oreja','Oreja rica crujiente',15.00,'https://www.shutterstock.com/image-photo/golden-palmier-puff-pastry-cookies-260nw-2510074311.jpg','Pan');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Gerardo','gerardo@gmail.com','$2b$10$QGpdGrNiS7Ajk3awxauSzezfU2ZRqjnXEVOKtDjmbChXpPNH8zCpW','user',1),(3,'prueba','yosoyelgrande@gmail.com','$2b$10$W8osR57h6fLSkdu/Dadv4.1De2.HDcfojm5xwFht9gz4LIVzxAnNG','user',1),(4,'dios','dios@gmail.com','$2b$10$owFRuciFdr5NQFP8B/.omuL0VClv2jNKR0PD6YOlneqQlprDvlBEi','user',1),(5,'Admin','admin@gmail.com','admin','user',1),(6,'Noagara','pez.angela@gmail.com','$2b$10$5dT3CXFJXZQ24B6ldENRpOUoqPkviIdiw1sm9OYuLHsV15osNlxR6','user',1),(8,'Poncho','poncho@gmail.com','$2b$10$tMHdZQlc4AWgVrm1vHTnoO.UGL0Jcqe40trJ2ajrR3Vog9dTyAbh2','user',1),(9,'Gerardo','gerardo09@gmail.com','PAnditas321','admin',1),(10,'Gerardo','administrador@gmail.com','$2b$10$dovGFwyxUkRTVHjiYpGjSe8H7/bf5vjxkMJcLmKMHjom8H.KY2cL6','admin',1),(12,'nuevo','nuevo@gmail.com','$2b$10$iBH.9/HQ0PNFBwktSpePXevsLe3V215GdJLo0H2W8S/WMxqzNKaD6','user',1),(13,'nuevo','prueba@gmail.com','$2b$10$iYf73cMJ6oUDkumVNKdKpu5WZUPf6tz7ZOI8WOk/im03ahpx3dY52','user',1),(14,'Carlos Villa','carlos23@gmail.com','$2b$10$936E03tzTZvAVfJ4OPuF3.WUtFwB.XeOYN3B1g.cOXgzCq71MI35u','user',1);
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

-- Dump completed on 2025-12-15  2:53:10
