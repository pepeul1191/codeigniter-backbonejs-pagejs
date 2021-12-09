-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: jousemoi_legisv22
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.16.04.1

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
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Amazonas'),(2,'Ancash'),(3,'Apurimac'),(4,'Arequipa'),(5,'Ayacucho'),(6,'Cajamarca'),(7,'Callao'),(8,'Cuzco'),(9,'Huancavelica'),(10,'Huánuco'),(11,'Ica'),(12,'Junin'),(13,'La Libertad'),(14,'Lambayeque'),(15,'Lima'),(16,'Loreto'),(17,'Madre de Dios'),(18,'Moquegua'),(19,'Pasco'),(20,'Piura'),(21,'Puno'),(22,'San Martín'),(23,'Tacna'),(24,'Tumbes'),(25,'Ucayali');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `districts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `province_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `province_id` (`province_id`),
  CONSTRAINT `districts_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1834 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES (1,'Chachapoyas',1),(2,'Asuncion',1),(3,'Balsas',1),(4,'Cheto',1),(5,'Chiliquin',1),(6,'Chuquibamba',1),(7,'Granada',1),(8,'Huancas',1),(9,'La Jalca',1),(10,'Leimebamba',1),(11,'Levanto',1),(12,'Magdalena',1),(13,'Mariscal Castilla',1),(14,'Molinopampa',1),(15,'Montevideo',1),(16,'Olleros',1),(17,'Quinjalca',1),(18,'San Francisco De Daguas',1),(19,'San Isidro De Maino',1),(20,'Soloco',1),(21,'Sonche',1),(22,'La Peca',2),(23,'Aramango',2),(24,'Copallin',2),(25,'El Parco',2),(26,'Imaza',2),(27,'Jumbilla',3),(28,'Chisquilla',3),(29,'Churuja',3),(30,'Corosha',3),(31,'Cuispes',3),(32,'Florida',3),(33,'Jazan',3),(37,'Valera',3),(38,'Yambrasbamba',3),(39,'Nieva',4),(40,'El Cenepa',4),(41,'Rio Santiago',4),(42,'Lamud',5),(43,'Camporredondo',5),(44,'Cocabamba',5),(45,'Colcamar',5),(46,'Conila',5),(47,'Inguilpata',5),(48,'Longuita',5),(49,'Lonya Chico',5),(50,'Luya',5),(51,'Luya Viejo',5),(52,'Maria',5),(53,'Ocalli',5),(54,'Ocumal',5),(55,'Pisuquia',5),(56,'Providencia',5),(57,'San Cristobal',5),(58,'San Francisco Del Yeso',5),(59,'San Jeronimo',5),(60,'San Juan De Lopecancha',5),(61,'Santa Catalina',5),(62,'Santo Tomas',5),(63,'Tingo',5),(64,'Trita',5),(65,'San Nicolas',6),(66,'Chirimoto',6),(67,'Cochamal',6),(68,'Huambo',6),(69,'Limabamba',6),(70,'Longar',6),(71,'Mariscal Benavides',6),(72,'Milpuc',6),(73,'Omia',6),(74,'Santa Rosa',6),(75,'Totora',6),(76,'Vista Alegre',6),(77,'Bagua Grande',7),(78,'Cajaruro',7),(79,'Cumba',7),(80,'El Milagro',7),(81,'Jamalca',7),(82,'Lonya Grande',7),(83,'Yamon',7),(84,'Huaraz',8),(85,'Cochabamba',8),(86,'Colcabamba',8),(87,'Huanchay',8),(88,'Independencia',8),(89,'Jangas',8),(90,'La Libertad',8),(91,'Olleros',8),(92,'Pampas',8),(93,'Pariacoto',8),(94,'Pira',8),(95,'Tarica',8),(96,'Aija',9),(97,'Coris',9),(98,'Huacllan',9),(99,'La Merced',9),(100,'Succha',9),(101,'Llamellin',10),(102,'Aczo',10),(103,'Chaccho',10),(104,'Chingas',10),(105,'Mirgas',10),(106,'San Juan De Rontoy',10),(107,'Chacas',11),(108,'Acochaca',11),(109,'Chiquian',12),(110,'Abelardo Pardo Lezameta',12),(111,'Antonio Raymondi',12),(112,'Aquia',12),(113,'Cajacay',12),(114,'Canis',12),(115,'Colquioc',12),(116,'Huallanca',12),(117,'Huasta',12),(118,'Huayllacayan',12),(119,'La Primavera',12),(120,'Mangas',12),(121,'Pacllon',12),(122,'San Miguel De Corpanqui',12),(123,'Ticllos',12),(124,'Carhuaz',13),(125,'Acopampa',13),(126,'Amashca',13),(127,'Anta',13),(128,'Ataquero',13),(129,'Marcara',13),(130,'Pariahuanca',13),(131,'San Miguel De Aco',13),(132,'Shilla',13),(133,'Tinco',13),(134,'Yungar',13),(135,'San Luis',14),(136,'San Nicolas',14),(137,'Yauya',14),(138,'Casma',15),(139,'Buena Vista Alta',15),(140,'Comandante Noel',15),(141,'Yautan',15),(142,'Corongo',16),(143,'Aco',16),(144,'Bambas',16),(145,'Cusca',16),(146,'La Pampa',16),(147,'Yanac',16),(148,'Yupan',16),(149,'Huari',17),(150,'Anra',17),(151,'Cajay',17),(152,'Chavin De Huantar',17),(153,'Huacachi',17),(154,'Huacchis',17),(155,'Huachis',17),(156,'Huantar',17),(157,'Masin',17),(158,'Paucas',17),(159,'Ponto',17),(160,'Rahuapampa',17),(161,'Rapayan',17),(162,'San Marcos',17),(163,'San Pedro De Chana',17),(164,'Uco',17),(165,'Huarmey',18),(166,'Cochapeti',18),(167,'Culebras',18),(168,'Huayan',18),(169,'Malvas',18),(170,'Caraz',19),(171,'Huallanca',19),(172,'Huata',19),(173,'Huaylas',19),(174,'Mato',19),(175,'Pamparomas',19),(176,'Pueblo Libre',19),(177,'Santa Cruz',19),(178,'Santo Toribio',19),(179,'Yuracmarca',19),(180,'Piscobamba',20),(181,'Casca',20),(182,'Eleazar Guzman Barron',20),(183,'Fidel Olivas Escudero',20),(184,'Llama',20),(185,'Llumpa',20),(186,'Lucma',20),(187,'Musga',20),(188,'Ocros',21),(189,'Acas',21),(190,'Cajamarquilla',21),(191,'Carhuapampa',21),(192,'Cochas',21),(193,'Congas',21),(194,'Llipa',21),(195,'San Cristobal De Rajan',21),(196,'San Pedro',21),(197,'Santiago De Chilcas',21),(198,'Cabana',22),(199,'Bolognesi',22),(200,'Conchucos',22),(201,'Huacaschuque',22),(202,'Huandoval',22),(203,'Lacabamba',22),(204,'Llapo',22),(205,'Pallasca',22),(206,'Pampas',22),(207,'Santa Rosa',22),(208,'Tauca',22),(209,'Pomabamba',23),(210,'Huayllan',23),(211,'Parobamba',23),(212,'Quinuabamba',23),(213,'Recuay',24),(214,'Catac',24),(215,'Cotaparaco',24),(216,'Huayllapampa',24),(217,'Llacllin',24),(218,'Marca',24),(219,'Pampas Chico',24),(220,'Pararin',24),(221,'Tapacocha',24),(222,'Ticapampa',24),(223,'Chimbote',25),(224,'Caceres Del Peru',25),(225,'Coishco',25),(226,'Macate',25),(227,'Moro',25),(228,'Nepeña',25),(229,'Samanco',25),(230,'Santa',25),(231,'Nuevo Chimbote',25),(232,'Sihuas',26),(233,'Acobamba',26),(234,'Alfonso Ugarte',26),(235,'Cashapampa',26),(236,'Chingalpo',26),(237,'Huayllabamba',26),(238,'Quiches',26),(239,'Ragash',26),(240,'San Juan',26),(241,'Sicsibamba',26),(242,'Yungay',27),(243,'Cascapara',27),(244,'Mancos',27),(245,'Matacoto',27),(246,'Quillo',27),(247,'Ranrahirca',27),(248,'Shupluy',27),(249,'Yanama',27),(250,'Abancay',28),(251,'Chacoche',28),(252,'Circa',28),(253,'Curahuasi',28),(254,'Huanipaca',28),(255,'Lambrama',28),(256,'Pichirhua',28),(257,'San Pedro De Cachora',28),(258,'Tamburco',28),(259,'Andahuaylas',29),(260,'Andarapa',29),(261,'Chiara',29),(262,'Huancarama',29),(263,'Huancaray',29),(264,'Huayana',29),(265,'Kishuara',29),(266,'Pacobamba',29),(267,'Pacucha',29),(268,'Pampachiri',29),(269,'Pomacocha',29),(270,'San Antonio De Cachi',29),(271,'San Jeronimo',29),(272,'San Miguel De Chaccrampa',29),(273,'Santa Maria De Chicmo',29),(274,'Talavera',29),(275,'Tumay Huaraca',29),(276,'Turpo',29),(277,'Kaquiabamba',29),(278,'Antabamba',30),(279,'El Oro',30),(280,'Huaquirca',30),(281,'Juan Espinoza Medrano',30),(282,'Oropesa',30),(283,'Pachaconas',30),(284,'Sabaino',30),(285,'Chalhuanca',31),(286,'Capaya',31),(287,'Caraybamba',31),(288,'Chapimarca',31),(289,'Colcabamba',31),(290,'Cotaruse',31),(291,'Huayllo',31),(292,'Justo Apu Sahuaraura',31),(293,'Lucre',31),(294,'Pocohuanca',31),(295,'San Juan De Chacña',31),(296,'Sañayca',31),(297,'Soraya',31),(298,'Tapairihua',31),(299,'Tintay',31),(300,'Toraya',31),(301,'Yanaca',31),(302,'Tambobamba',32),(303,'Cotabambas',32),(304,'Coyllurqui',32),(305,'Haquira',32),(306,'Mara',32),(307,'Challhuahuacho',32),(308,'Chincheros',33),(309,'Anco-Huallo',33),(310,'Cocharcas',33),(311,'Huaccana',33),(312,'Ocobamba',33),(313,'Ongoy',33),(314,'Uranmarca',33),(315,'Ranracancha',33),(316,'Chuquibambilla',34),(317,'Curpahuasi',34),(318,'Gamarra',34),(319,'Huayllati',34),(320,'Mamara',34),(321,'Micaela Bastidas',34),(322,'Pataypampa',34),(323,'Progreso',34),(324,'San Antonio',34),(325,'Santa Ros a',34),(326,'Turpay',34),(327,'Vilcabamba',34),(328,'Virundo',34),(329,'Curasco',34),(330,'Arequipa',35),(331,'Alto Selva Alegre',35),(332,'Cayma',35),(333,'Cerro Colorado',35),(334,'Characato',35),(335,'Chiguata',35),(336,'Jacobo Hunter',35),(337,'La Joya',35),(338,'Mariano Melgar',35),(339,'Miraflores',35),(340,'Mollebaya',35),(341,'Paucarpata',35),(342,'Pocsi',35),(343,'Polobaya',35),(344,'Quequeña',35),(345,'Sabandia',35),(346,'Sachaca',35),(347,'San Juan De Siguas',35),(348,'San Juan De Tarucani',35),(349,'Santa Isabel De Siguas',35),(350,'Santa Rita De Siguas',35),(351,'Socabaya',35),(352,'Tiabaya',35),(353,'Uchumayo',35),(354,'Vitor',35),(355,'Yanahuara',35),(356,'Yarabamba',35),(357,'Yura',35),(358,'Jose Luis Bustamante Y Rive',35),(359,'Camana',36),(360,'Jose Maria Quimper',36),(361,'Mariano Nicolas Valcarcel',36),(362,'Mariscal Caceres',36),(363,'Nicolas De Pierola',36),(364,'Ocoña',36),(365,'Quilca',36),(366,'Samuel Pastor',36),(367,'Caraveli',37),(368,'Acari',37),(369,'Atico',37),(370,'Atiquipa',37),(371,'Bella Union',37),(372,'Cahuacho',37),(373,'Chala',37),(374,'Chaparra',37),(375,'Huanuhuanu',37),(376,'Jaqui',37),(377,'Lomas',37),(378,'Quicacha',37),(379,'Yauca',37),(380,'Aplao',38),(381,'Andagua',38),(382,'Ayo',38),(383,'Chachas',38),(384,'Chilcaymarca',38),(385,'Choco',38),(386,'Huancarqui',38),(387,'Machaguay',38),(388,'Orcopampa',38),(389,'Pampacolca',38),(390,'Tipan',38),(391,'Uñon',38),(392,'Uraca',38),(393,'Viraco',38),(394,'Chivay',39),(395,'Achoma',39),(396,'Cabanaconde',39),(397,'Callalli',39),(398,'Caylloma',39),(399,'Coporaque',39),(400,'Huambo',39),(401,'Huanca',39),(402,'Ichupampa',39),(403,'Lari',39),(404,'Lluta',39),(405,'Maca',39),(406,'Madrigal',39),(407,'San Antonio De Chuca',39),(408,'Sibayo',39),(409,'Tapay',39),(410,'Tisco',39),(411,'Tuti',39),(412,'Yanque',39),(413,'Majes',39),(414,'Chuquibamba',40),(415,'Andaray',40),(416,'Cayarani',40),(417,'Chichas',40),(418,'Iray',40),(419,'Rio Grande',40),(420,'Salamanca',40),(421,'Yanaquihua',40),(422,'Chuquibamba',41),(423,'Andaray',41),(424,'Cayarani',41),(425,'Chichas',41),(426,'Iray',41),(427,'Rio Grande',41),(428,'Salamanca',41),(429,'Yanaquihua',41),(430,'Cotahuasi',42),(431,'Alca',42),(432,'Charcana',42),(433,'Huaynacotas',42),(434,'Pampamarca',42),(435,'Puyca',42),(436,'Quechualla',42),(437,'Sayla',42),(438,'Tauria',42),(439,'Tomepampa',42),(440,'Toro',42),(441,'Ayacucho',43),(442,'Acocro',43),(443,'Acos Vinchos',43),(444,'Carmen Alto',43),(445,'Chiara',43),(446,'Ocros',43),(447,'Pacaycasa',43),(448,'Quinua',43),(449,'San Jose De Ticllas',43),(450,'San Juan Bautista',43),(451,'Santiago De Pischa',43),(452,'Socos',43),(453,'Tambillo',43),(454,'Vinchos',43),(455,'Jesus Nazareno',43),(456,'Cangallo',44),(457,'Chuschi',44),(458,'Los Morochucos',44),(459,'Maria Parado De Bellido',44),(460,'Paras',44),(461,'Totos',44),(462,'Sancos',45),(463,'Carapo',45),(464,'Sacsamarca',45),(465,'Santiago De Lucanamarca',45),(466,'Huanta',46),(467,'Ayahuanco',46),(468,'Huamanguilla',46),(469,'Iguain',46),(470,'Luricocha',46),(471,'Santillana',46),(472,'Sivia',46),(473,'Llochegua',46),(474,'San Miguel',47),(475,'Anco',47),(476,'Ayna',47),(477,'Chilcas',47),(478,'Chungui',47),(479,'Luis Carranza',47),(480,'Santa Rosa',47),(481,'Tambo',47),(482,'Puquio',48),(483,'Aucara',48),(484,'Cabana',48),(485,'Carmen Salcedo',48),(486,'Chaviña',48),(487,'Chipao',48),(488,'Huac-Huas',48),(489,'Laramate',48),(490,'Leoncio Prado',48),(491,'Llauta',48),(492,'Lucanas',48),(493,'Ocaña',48),(494,'Otoca',48),(495,'Saisa',48),(496,'San Cristobal',48),(497,'San Juan',48),(498,'San Pedro',48),(499,'San Pedro De Palco',48),(500,'Sancos',48),(501,'Santa Ana De Huaycahuacho',48),(502,'Santa Lucia',48),(503,'Coracora',49),(504,'Chumpi',49),(505,'Coronel Castaðeda',49),(506,'Pacapausa',49),(507,'Pullo',49),(508,'Puyusca',49),(509,'San Francisco De Ravacayco',49),(510,'Upahuacho',49),(511,'Pausa',50),(512,'Colta',50),(513,'Corculla',50),(514,'Lampa',50),(515,'Marcabamba',50),(516,'Oyolo',50),(517,'Pararca',50),(518,'San Javier De Alpabamba',50),(519,'San Jose De Ushua',50),(520,'Sara Sara',50),(521,'Querobamba',51),(522,'Belen',51),(523,'Chalcos',51),(524,'Chilcayoc',51),(525,'Huacaña',51),(526,'Morcolla',51),(527,'Paico',51),(528,'San Pedro De Larcay',51),(529,'San Salvador De Quije',51),(530,'Santiago De Paucaray',51),(531,'Soras',51),(532,'Huancapi',52),(533,'Alcamenca',52),(534,'Apongo',52),(535,'Asquipata',52),(536,'Canaria',52),(537,'Cayara',52),(538,'Colca',52),(539,'Huamanquiquia',52),(540,'Huancaraylla',52),(541,'Huaya',52),(542,'Sarhua',52),(543,'Vilcanchos',52),(544,'Vilcas Huaman',53),(545,'Accomarca',53),(546,'Carhuanca',53),(547,'Concepcion',53),(548,'Huambalpa',53),(549,'Independencia',53),(550,'Saurama',53),(551,'Vischongo',53),(552,'Cajamarca',54),(553,'Asuncion',54),(554,'Chetilla',54),(555,'Cospan',54),(556,'Encañada',54),(557,'Jesus',54),(558,'Llacanora',54),(559,'Los Baños Del Inca',54),(560,'Magdalena',54),(561,'Matara',54),(562,'Namora',54),(563,'San Juan',54),(564,'Cajabamba',55),(565,'Cachachi',55),(566,'Condebamba',55),(567,'Sitacocha',55),(568,'Celendin',56),(569,'Chumuch',56),(570,'Cortegana',56),(571,'Huasmin',56),(572,'Jorge Chavez',56),(573,'Jose Galvez',56),(574,'Miguel Iglesias',56),(575,'Oxamarca',56),(576,'Sorochuco',56),(577,'Sucre',56),(578,'Utco',56),(579,'La Libertad De Pallan',56),(580,'Chota',57),(581,'Anguia',57),(582,'Chadin',57),(583,'Chiguirip',57),(584,'Chimban',57),(585,'Choropampa',57),(586,'Cochabamba',57),(587,'Conchan',57),(588,'Huambos',57),(589,'Lajas',57),(590,'Llama',57),(591,'Miracosta',57),(592,'Paccha',57),(593,'Pion',57),(594,'Querocoto',57),(595,'San Juan De Licupis',57),(596,'Tacabamba',57),(597,'Tocmoche',57),(598,'Chalamarca',57),(599,'Contumaza',58),(600,'Chilete',58),(601,'Cupisnique',58),(602,'Guzmango',58),(603,'San Benito',58),(604,'Santa Cruz De Toled',58),(605,'Tantarica',58),(606,'Yonan',58),(607,'Cutervo',59),(608,'Callayuc',59),(609,'Choros',59),(610,'Cujillo',59),(611,'La Ramada',59),(612,'Pimpingos',59),(613,'Querocotillo',59),(614,'San Andres De Cutervo',59),(615,'San Juan De Cutervo',59),(616,'San Luis De Lucma',59),(617,'Santa Cruz',59),(618,'Santo Domingo De La Capilla',59),(619,'Santo Tomas',59),(620,'Socota',59),(621,'Toribio Casanova',59),(622,'Bambamarca',60),(623,'Chugur',60),(624,'Hualgayoc',60),(625,'Jaen',61),(626,'Bellavista',61),(627,'Chontali',61),(628,'Colasay',61),(629,'Huabal',61),(630,'Las Pirias',61),(631,'Pomahuaca',61),(632,'Pucara',61),(633,'Sallique',61),(634,'San Felipe',61),(635,'San Jose Del Alto',61),(636,'Santa Rosa',61),(637,'San Ignacio',62),(638,'Chirinos',62),(639,'Huarango',62),(640,'La Coipa',62),(641,'Namballe',62),(642,'San Jose De Lourdes',62),(643,'Tabaconas',62),(644,'Pedro Galvez',63),(645,'Chancay',63),(646,'Eduardo Villanueva',63),(647,'Gregorio Pita',63),(648,'Ichocan',63),(649,'Jose Manuel Quiroz',63),(650,'Jose Sabogal',63),(651,'San Miguel',64),(652,'Bolivar',64),(653,'Calquis',64),(654,'Catilluc',64),(655,'El Prado',64),(656,'La Florida',64),(657,'Llapa',64),(658,'Nanchoc',64),(659,'Niepos',64),(660,'San Gregorio',64),(661,'San Silvestre De Cochan',64),(662,'Tongod',64),(663,'Union Agua Blanca',64),(664,'San Pablo',65),(665,'San Bernardino',65),(666,'San Luis',65),(667,'Tumbaden',65),(668,'Santa Cruz',66),(669,'Andabamba',66),(670,'Catache',66),(671,'Chancaybaños',66),(672,'La Esperanza',66),(673,'Ninabamba',66),(674,'Pulan',66),(675,'Saucepampa',66),(676,'Sexi',66),(677,'Uticyacu',66),(678,'Yauyucan',66),(679,'Callao',67),(680,'Bellavista',67),(681,'Carmen De La Legua Reynoso',67),(682,'La Perla',67),(683,'La Punta',67),(684,'Ventanilla',67),(685,'Cusco',68),(686,'Ccorca',68),(687,'Poroy',68),(688,'San Jeronimo',68),(689,'San Sebastian',68),(690,'Santiago',68),(691,'Saylla',68),(692,'Wanchaq',68),(693,'Acomayo',69),(694,'Acopia',69),(695,'Acos',69),(696,'Mosoc Llacta',69),(697,'Pomacanchi',69),(698,'Rondocan',69),(699,'Sangarara',69),(700,'Anta',70),(701,'Ancahuasi',70),(702,'Cachimayo',70),(703,'Chinchaypujio',70),(704,'Huarocondo',70),(705,'Limatambo',70),(706,'Mollepata',70),(707,'Pucyura',70),(708,'Zurite',70),(709,'Calca',71),(710,'Coya',71),(711,'Lamay',71),(712,'Lares',71),(713,'Pisac',71),(714,'San Salvador',71),(715,'Taray',71),(716,'Yanatile',71),(717,'Yanaoca',72),(718,'Checca',72),(719,'Kunturkanki',72),(720,'Langui',72),(721,'Layo',72),(722,'Pampamarca',72),(723,'Quehue',72),(724,'Tupac Amaru',72),(725,'Sicuani',73),(726,'Checacupe',73),(727,'Combapata',73),(728,'Marangani',73),(729,'Pitumarca',73),(730,'San Pablo',73),(731,'San Pedro',73),(732,'Tinta',73),(733,'Santo Tomas',74),(734,'Capacmarca',74),(735,'Chamaca',74),(736,'Colquemarca',74),(737,'Livitaca',74),(738,'Llusco',74),(739,'Quiñota',74),(740,'Velille',74),(741,'Espinar',75),(742,'Condoroma',75),(743,'Coporaque',75),(744,'Ocoruro',75),(745,'Pallpata',75),(746,'Pichigua',75),(747,'Suyckutambo',75),(748,'Alto Pichigua',75),(749,'Santa Ana',76),(750,'Echarate',76),(751,'Huayopata',76),(752,'Maranura',76),(753,'Ocobamba',76),(754,'Quellouno',76),(755,'Kimbiri',76),(756,'Santa Teresa',76),(757,'Vilcabamba',76),(758,'Pichari',76),(759,'Paruro',77),(760,'Accha',77),(761,'Ccapi',77),(762,'Colcha',77),(763,'Huanoquite',77),(764,'Omacha',77),(765,'Paccaritambo',77),(766,'Pillpinto',77),(767,'Yaurisque',77),(768,'Paucartambo',78),(769,'Caicay',78),(770,'Challabamba',78),(771,'Colquepata',78),(772,'Huancarani',78),(773,'Kosñipata',78),(774,'Urcos',79),(775,'Andahuaylillas',79),(776,'Camanti',79),(777,'Ccarhuayo',79),(778,'Ccatca',79),(779,'Cusipata',79),(780,'Huaro',79),(781,'Lucre',79),(782,'Marcapata',79),(783,'Ocongate',79),(784,'Oropesa',79),(785,'Quiquijana',79),(786,'Urubamba',80),(787,'Chinchero',80),(788,'Huayllabamba',80),(789,'Machupicchu',80),(790,'Maras',80),(791,'Ollantaytambo',80),(792,'Yucay',80),(793,'Huancavelica',81),(794,'Acobambilla',81),(795,'Acoria',81),(796,'Conayca',81),(797,'Cuenca',81),(798,'Huachocolpa',81),(799,'Huayllahuara',81),(800,'Izcuchaca',81),(801,'Laria',81),(802,'Manta',81),(803,'Mariscal Caceres',81),(804,'Moya',81),(805,'Nuevo Occoro',81),(806,'Palca',81),(807,'Pilchaca',81),(808,'Vilca',81),(809,'Yauli',81),(810,'Ascension',81),(811,'Acobamba',82),(812,'Andabamba',82),(813,'Anta',82),(814,'Caja',82),(815,'Marcas',82),(816,'Paucara',82),(817,'Pomacocha',82),(818,'Rosario',82),(819,'Lircay',83),(820,'Anchonga',83),(821,'Callanmarca',83),(822,'Ccochaccasa',83),(823,'Chincho',83),(824,'Congalla',83),(825,'Huanca-Huanca',83),(826,'Huayllay Grande',83),(827,'Julcamarca',83),(828,'San Antonio De Antaparco',83),(829,'Santo Tomas De Pata',83),(830,'Secclla',83),(831,'Castrovirreyna',84),(832,'Arma',84),(833,'Aurahua',84),(834,'Capillas',84),(835,'Chupamarca',84),(836,'Cocas',84),(837,'Huachos',84),(838,'Huamatambo',84),(839,'Mollepampa',84),(840,'San Juan',84),(841,'Santa Ana',84),(842,'Tantara',84),(843,'Ticrapo',84),(844,'Churcampa',85),(845,'Anco',85),(846,'Chinchihuasi',85),(847,'El Carmen',85),(848,'La Merced',85),(849,'Locroja',85),(850,'Paucarbamba',85),(851,'San Miguel De Mayocc',85),(852,'San Pedro De Coris',85),(853,'Pachamarca',85),(854,'Huaytara',86),(855,'Ayavi',86),(856,'Cordova',86),(857,'Huayacundo Arma',86),(858,'Laramarca',86),(859,'Ocoyo',86),(860,'Pilpichaca',86),(861,'Querco',86),(862,'Quito-Arma',86),(863,'San Antonio De Cusicancha',86),(864,'San Francisco De Sangayaico',86),(865,'San Isidro',86),(866,'Santiago De Chocorvos',86),(867,'Santiago De Quirahuara',86),(868,'Santo Domingo De Capillas',86),(869,'Tambo',86),(870,'Pampas',87),(871,'Acostambo',87),(872,'Acraquia',87),(873,'Ahuaycha',87),(874,'Colcabamba',87),(875,'Daniel Hernandez',87),(876,'Huachocolpa',87),(877,'Huando',87),(878,'Huaribamba',87),(879,'Ñahuimpuquio',87),(880,'Pazos',87),(881,'Quishuar',87),(882,'Salcabamba',87),(883,'Salcahuasi',87),(884,'San Marcos De Rocchac',87),(885,'Surcubamba',87),(886,'Tintay Puncu',87),(887,'Huanuco',88),(888,'Amarilis',88),(889,'Chinchao',88),(890,'Churubamba',88),(891,'Margos',88),(892,'Quisqui',88),(893,'San Francisco De Cayran',88),(894,'San Pedro De Chaulan',88),(895,'Santa Maria Del Valle',88),(896,'Yarumayo',88),(897,'Pillco Marca',88),(898,'Ambo',89),(899,'Cayna',89),(900,'Colpas',89),(901,'Conchamarca',89),(902,'Huacar',89),(903,'San Francisco',89),(904,'San Rafael',89),(905,'Tomay Kichwa',89),(906,'La Union',90),(907,'Chuquis',90),(908,'Marias',90),(909,'Pachas',90),(910,'Quivilla',90),(911,'Ripan',90),(912,'Shunqui',90),(913,'Sillapata',90),(914,'Yanas',90),(915,'Huacaybamba',91),(916,'Canchabamba',91),(917,'Cochabamba',91),(918,'Pinra',91),(919,'Llata',92),(920,'Arancay',92),(921,'Chavin De Pariarca',92),(922,'Jacas Grande',92),(923,'Jircan',92),(924,'Miraflores',92),(925,'Monzon',92),(926,'Punchao',92),(927,'Puños',92),(928,'Singa',92),(929,'Tantamayo',92),(930,'Rupa-Rupa',93),(931,'Daniel Alomia Robles',93),(932,'Hermilio Valdizan',93),(933,'Jose Crespo Y Castillo',93),(934,'Luyando',93),(935,'Mariano Damaso Beraun',93),(936,'Huacrachuco',94),(937,'Cholon',94),(938,'San Buenaventura',94),(939,'Panao',95),(940,'Chaglla',95),(941,'Molino',95),(942,'Umari',95),(943,'Puerto Inca',96),(944,'Codo Del Pozuzo',96),(945,'Honoria',96),(946,'Tournavista',96),(947,'Yuyapichis',96),(948,'Jesus',97),(949,'Baños',97),(950,'Jivia',97),(951,'Queropalca',97),(952,'Rondos',97),(953,'San Francisco De Asis',97),(954,'San Miguel De Cauri',97),(955,'Chavinillo',98),(956,'Cahuac',98),(957,'Chacabamba',98),(958,'Aparicio Pomares',98),(959,'Jacas Chico',98),(960,'Obas',98),(961,'Pampamarca',98),(962,'Choras',98),(963,'Ica',99),(964,'La Tinguiða',99),(965,'Los Aquijes',99),(966,'Ocucaje',99),(967,'Pachacutec',99),(968,'Parcona',99),(969,'Pueblo Nuevo',99),(970,'Salas',99),(971,'San Jose De Los Molinos',99),(972,'San Juan Bautista',99),(973,'Santiago',99),(974,'Subtanjalla',99),(975,'Tate',99),(976,'Yauca Del Rosario',99),(977,'Chincha Alta',100),(978,'Alto Laran',100),(979,'Chavin',100),(980,'Chincha Baja',100),(981,'El Carmen',100),(982,'Grocio Prado',100),(983,'Pueblo Nuevo',100),(984,'San Juan De Yanac',100),(985,'San Pedro De Huacarpana',100),(986,'Sunampe',100),(987,'Tambo De Mora',100),(988,'Nazca',101),(989,'Changuillo',101),(990,'El Ingenio',101),(991,'Marcona',101),(992,'Vista Alegre',101),(993,'Palpa',102),(994,'Llipata',102),(995,'Rio Grande',102),(996,'Santa Cruz',102),(997,'Tibillo',102),(998,'Pisco',103),(999,'Huancano',103),(1000,'Humay',103),(1001,'Independencia',103),(1002,'Paracas',103),(1003,'San Andres',103),(1004,'San Clemente',103),(1005,'Tupac Amaru Inca',103),(1006,'Huancayo',104),(1007,'Carhuacallanga',104),(1008,'Chacapampa',104),(1009,'Chicche',104),(1010,'Chilca',104),(1011,'Chongos Alto',104),(1012,'Chupuro',104),(1013,'Colca',104),(1014,'Cullhuas',104),(1015,'El Tambo',104),(1016,'Huacrapuquio',104),(1017,'Hualhuas',104),(1018,'Huancan',104),(1019,'Huasicancha',104),(1020,'Huayucachi',104),(1021,'Ingenio',104),(1022,'Pariahuanca',104),(1023,'Pilcomayo',104),(1024,'Pucara',104),(1025,'Quichuay',104),(1026,'Quilcas',104),(1027,'San Agustin',104),(1028,'San Jeronimo De Tunan',104),(1029,'Saño',104),(1030,'Sapallanga',104),(1031,'Sicaya',104),(1032,'Santo Domingo De Acobamba',104),(1033,'Viques',104),(1034,'Concepcion',105),(1035,'Aco',105),(1036,'Andamarca',105),(1037,'Chambara',105),(1038,'Cochas',105),(1039,'Comas',105),(1040,'Heroinas Toledo',105),(1041,'Manzanares',105),(1042,'Mariscal Castilla',105),(1043,'Matahuasi',105),(1044,'Mito',105),(1045,'Nueve De Julio',105),(1046,'Orcotuna',105),(1047,'San Jose De Quero',105),(1048,'Santa Rosa De Ocopa',105),(1049,'Chanchamayo',106),(1050,'Perene',106),(1051,'Pichanaqui',106),(1052,'San Luis De Shuaro',106),(1053,'San Ramon',106),(1054,'Vitoc',106),(1055,'Jauja',107),(1056,'Acolla',107),(1057,'Apata',107),(1058,'Ataura',107),(1059,'Canchayllo',107),(1060,'Curicaca',107),(1061,'El Mantaro',107),(1062,'Huamali',107),(1063,'Huaripampa',107),(1064,'Huertas',107),(1065,'Janjaillo',107),(1066,'Julcan',107),(1067,'Leonor Ordoñez',107),(1068,'Llocllapampa',107),(1069,'Marco',107),(1070,'Masma',107),(1071,'Masma Chicche',107),(1072,'Molinos',107),(1073,'Monobamba',107),(1074,'Muqui',107),(1075,'Muquiyauyo',107),(1076,'Paca',107),(1077,'Paccha',107),(1078,'Pancan',107),(1079,'Parco',107),(1080,'Pomacancha',107),(1081,'Ricran',107),(1082,'San Lorenzo',107),(1083,'San Pedro De Chunan',107),(1084,'Sausa',107),(1085,'Sincos',107),(1086,'Tunan Marca',107),(1087,'Yauli',107),(1088,'Yauyos',107),(1089,'Junin',108),(1090,'Carhuamayo',108),(1091,'Ondores',108),(1092,'Ulcumayo',108),(1093,'Satipo',109),(1094,'Coviriali',109),(1095,'Llaylla',109),(1096,'Mazamari',109),(1097,'Pampa Hermosa',109),(1098,'Pangoa',109),(1099,'Rio Negro',109),(1100,'Rio Tambo',109),(1101,'Tarma',110),(1102,'Acobamba',110),(1103,'Huaricolca',110),(1104,'Huasahuasi',110),(1105,'La Union',110),(1106,'Palca',110),(1107,'Palcamayo',110),(1108,'San Pedro De Cajas',110),(1109,'Tapo',110),(1110,'La Oroya',111),(1111,'Chacapalpa',111),(1112,'Huay-Huay',111),(1113,'Marcapomacocha',111),(1114,'Morococha',111),(1115,'Paccha',111),(1116,'Santa Barbara De Carhuacaya',111),(1117,'Santa Rosa De Sacco',111),(1118,'Suitucancha',111),(1119,'Yauli',111),(1120,'Chupaca',112),(1121,'Ahuac',112),(1122,'Chongos Bajo',112),(1123,'Huachac',112),(1124,'Huamancaca Chico',112),(1125,'San Juan De Iscos',112),(1126,'San Juan De Jarpa',112),(1127,'Tres De Diciembre',112),(1128,'Yanacancha',112),(1129,'Trujillo',113),(1130,'El Porvenir',113),(1131,'Florencia De Mora',113),(1132,'Huanchaco',113),(1133,'La Esperanza',113),(1134,'Laredo',113),(1135,'Moche',113),(1136,'Poroto',113),(1137,'Salaverry',113),(1138,'Simbal',113),(1139,'Victor Larco Herrera',113),(1140,'Ascope',114),(1141,'Chicama',114),(1142,'Chocope',114),(1143,'Magdalena De Cao',114),(1144,'Paijan',114),(1145,'Razuri',114),(1146,'Santiago De Cao',114),(1147,'Casa Grande',114),(1148,'Bolivar',115),(1149,'Bambamarca',115),(1150,'Condormarca',115),(1151,'Longotea',115),(1152,'Uchumarca',115),(1153,'Ucuncha',115),(1154,'Chepen',116),(1155,'Pacanga',116),(1156,'Pueblo Nuevo',116),(1157,'Julcan',117),(1158,'Calamarca',117),(1159,'Carabamba',117),(1160,'Huaso',117),(1161,'Otuzco',118),(1162,'Agallpampa',118),(1163,'Charat',118),(1164,'Huaranchal',118),(1165,'La Cuesta',118),(1166,'Mache',118),(1167,'Paranday',118),(1168,'Salpo',118),(1169,'Sinsicap',118),(1170,'Usquil',118),(1171,'San Pedro De Lloc',119),(1172,'Guadalupe',119),(1173,'Jequetepeque',119),(1174,'Pacasmayo',119),(1175,'San Jose',119),(1176,'Tayabamba',120),(1177,'Buldibuyo',120),(1178,'Chillia',120),(1179,'Huancaspata',120),(1180,'Huaylillas',120),(1181,'Huayo',120),(1182,'Ongon',120),(1183,'Parcoy',120),(1184,'Pataz',120),(1185,'Pias',120),(1186,'Santiago De Challas',120),(1187,'Taurija',120),(1188,'Urpay',120),(1189,'Chugay',121),(1190,'Huamachuco',121),(1191,'Cochorco',121),(1192,'Curgos',121),(1193,'Marcabal',121),(1194,'Sanagoran',121),(1195,'Sarin',121),(1196,'Sartimbamba',121),(1197,'Santiago De Chuco',122),(1198,'Angasmarca',122),(1199,'Cachicadan',122),(1200,'Mollebamba',122),(1201,'Mollepata',122),(1202,'Quiruvilca',122),(1203,'Santa Cruz De Chuca',122),(1204,'Sitabamba',122),(1205,'Cascas',123),(1206,'Lucma',123),(1207,'Marmot',123),(1208,'Sayapullo',123),(1209,'Viru',124),(1210,'Chao',124),(1211,'Guadalupito',124),(1212,'Chiclayo',125),(1213,'Chongoyape',125),(1214,'Eten',125),(1215,'Eten Puerto',125),(1216,'Jose Leonardo Ortiz',125),(1217,'La Victoria',125),(1218,'Lagunas',125),(1219,'Monsefu',125),(1220,'Nueva Arica',125),(1221,'Oyotun',125),(1222,'Picsi',125),(1223,'Pimentel',125),(1224,'Reque',125),(1225,'Santa Rosa',125),(1226,'Saña',125),(1227,'Cayalti',125),(1228,'Patapo',125),(1229,'Pomalca',125),(1230,'Pucala',125),(1231,'Tuman',125),(1232,'Ferreñafe',126),(1233,'Cañaris',126),(1234,'Incahuasi',126),(1235,'Manuel Antonio Mesones',126),(1236,'Muro',126),(1237,'Pitipo',126),(1238,'Pueblo Nuevo',126),(1239,'Lambayeque',127),(1240,'Chochope',127),(1241,'Illimo',127),(1242,'Jayanca',127),(1243,'Mochumi',127),(1244,'Morrope',127),(1245,'Motupe',127),(1246,'Olmos',127),(1247,'Pacora',127),(1248,'Salas',127),(1249,'San Jose',127),(1250,'Tucume',127),(1251,'Lima',128),(1252,'Ancon',128),(1253,'Ate',128),(1254,'Barranco',128),(1255,'Breña',128),(1256,'Carabayllo',128),(1257,'Chaclacayo',128),(1258,'Chorrillos',128),(1259,'Cieneguilla',128),(1260,'Comas',128),(1261,'El Agustino',128),(1262,'Independencia',128),(1263,'Jesus Maria',128),(1264,'La Molina',128),(1265,'La Victoria',128),(1266,'Lince',128),(1267,'Los Olivos',128),(1268,'Lurigancho',128),(1269,'Lurin',128),(1270,'Magdalena Del Mar',128),(1271,'Magdalena Vieja',128),(1272,'Miraflores',128),(1273,'Pachacamac',128),(1274,'Pucusana',128),(1275,'Puente Piedra',128),(1276,'Punta Hermosa',128),(1277,'Punta Negra',128),(1278,'Rimac',128),(1279,'San Bartolo',128),(1280,'San Borja',128),(1281,'San Isidro',128),(1282,'San Juan De Lurigancho',128),(1283,'San Juan De Miraflores',128),(1284,'San Luis',128),(1285,'San Martin De Porres',128),(1286,'San Miguel',128),(1287,'Santa Anita',128),(1288,'Santa Maria Del Mar',128),(1289,'Santa Rosa',128),(1290,'Santiago De Surco',128),(1291,'Surquillo',128),(1292,'Villa El Salvador',128),(1293,'Villa Maria Del Triunfo',128),(1294,'Barranca',129),(1295,'Paramonga',129),(1296,'Pativilca',129),(1297,'Supe',129),(1298,'Supe Puerto',129),(1299,'Cajatambo',130),(1300,'Copa',130),(1301,'Gorgor',130),(1302,'Huancapon',130),(1303,'Manas',130),(1304,'Canta',131),(1305,'Arahuay',131),(1306,'Huamantanga',131),(1307,'Huaros',131),(1308,'Lachaqui',131),(1309,'San Buenaventura',131),(1310,'Santa Rosa De Quives',131),(1311,'San Vicente De Cañete',132),(1312,'Asia',132),(1313,'Calango',132),(1314,'Cerro Azul',132),(1315,'Chilca',132),(1316,'Coayllo',132),(1317,'Imperial',132),(1318,'Lunahuana',132),(1319,'Mala',132),(1320,'Nuevo Imperial',132),(1321,'Pacaran',132),(1322,'Quilmana',132),(1323,'San Antonio',132),(1324,'San Luis',132),(1325,'Santa Cruz De Flores',132),(1326,'Zuðiga',132),(1327,'Huaral',133),(1328,'Atavillos Alto',133),(1329,'Atavillos Bajo',133),(1330,'Aucallama',133),(1331,'Chancay',133),(1332,'Ihuari',133),(1333,'Lampian',133),(1334,'Pacaraos',133),(1335,'San Miguel De Acos',133),(1336,'Santa Cruz De Andamarca',133),(1337,'Sumbilca',133),(1338,'Veintisiete De Noviembre',133),(1339,'Matucana',134),(1340,'Antioquia',134),(1341,'Callahuanca',134),(1342,'Carampoma',134),(1343,'Chicla',134),(1344,'Cuenca',134),(1345,'Huachupampa',134),(1346,'Huanza',134),(1347,'Huarochiri',134),(1348,'Lahuaytambo',134),(1349,'Langa',134),(1350,'Laraos',134),(1351,'Mariatana',134),(1352,'Ricardo Palma',134),(1353,'San Andres De Tupicocha',134),(1354,'San Antonio',134),(1355,'San Bartolome',134),(1356,'San Damian',134),(1357,'San Juan De Iris',134),(1358,'San Juan De Tantaranche',134),(1359,'San Lorenzo De Quinti',134),(1360,'San Mateo',134),(1361,'San Mateo De Otao',134),(1362,'San Pedro De Casta',134),(1363,'San Pedro De Huancayre',134),(1364,'Sangallaya',134),(1365,'Santa Cruz De Cocachacra',134),(1366,'Santa Eulalia',134),(1367,'Santiago De Anchucaya',134),(1368,'Santiago De Tuna',134),(1369,'Santo Domingo De Los Ollero',134),(1370,'Surco',134),(1371,'Huacho',135),(1372,'Ambar',135),(1373,'Caleta De Carquin',135),(1374,'Checras',135),(1375,'Hualmay',135),(1376,'Huaura',135),(1377,'Leoncio Prado',135),(1378,'Paccho',135),(1379,'Santa Leonor',135),(1380,'Santa Maria',135),(1381,'Sayan',135),(1382,'Vegueta',135),(1383,'Oyon',136),(1384,'Andajes',136),(1385,'Caujul',136),(1386,'Cochamarca',136),(1387,'Navan',136),(1388,'Pachangara',136),(1389,'Yauyos',137),(1390,'Alis',137),(1391,'Ayauca',137),(1392,'Ayaviri',137),(1393,'Azangaro',137),(1394,'Cacra',137),(1395,'Carania',137),(1396,'Catahuasi',137),(1397,'Chocos',137),(1398,'Cochas',137),(1399,'Colonia',137),(1400,'Hongos',137),(1401,'Huampara',137),(1402,'Huancaya',137),(1403,'Huangascar',137),(1404,'Huantan',137),(1405,'Huaðec',137),(1406,'Laraos',137),(1407,'Lincha',137),(1408,'Madean',137),(1409,'Miraflores',137),(1410,'Omas',137),(1411,'Putinza',137),(1412,'Quinches',137),(1413,'Quinocay',137),(1414,'San Joaquin',137),(1415,'San Pedro De Pilas',137),(1416,'Tanta',137),(1417,'Tauripampa',137),(1418,'Tomas',137),(1419,'Tupe',137),(1420,'Viðac',137),(1421,'Vitis',137),(1422,'Iquitos',138),(1423,'Alto Nanay',138),(1424,'Fernando Lores',138),(1425,'Indiana',138),(1426,'Las Amazonas',138),(1427,'Mazan',138),(1428,'Napo',138),(1429,'Punchana',138),(1430,'Putumayo',138),(1431,'Torres Causana',138),(1432,'Belen',138),(1433,'San Juan Bautista',138),(1434,'Yurimaguas',139),(1435,'Balsapuerto',139),(1436,'Barranca',139),(1437,'Cahuapanas',139),(1438,'Jeberos',139),(1439,'Lagunas',139),(1440,'Manseriche',139),(1441,'Morona',139),(1442,'Pastaza',139),(1443,'Santa Cruz',139),(1444,'Teniente Cesar Lopez Rojas',139),(1445,'Nauta',140),(1446,'Parinari',140),(1447,'Tigre',140),(1448,'Trompeteros',140),(1449,'Urarinas',140),(1450,'Ramon Castilla',141),(1451,'Pebas',141),(1452,'Yavari',141),(1453,'San Pablo',141),(1454,'Requena',142),(1455,'Alto Tapiche',142),(1456,'Capelo',142),(1457,'Emilio San Martin',142),(1458,'Maquia',142),(1459,'Puinahua',142),(1460,'Saquena',142),(1461,'Soplin',142),(1462,'Tapiche',142),(1463,'Jenaro Herrera',142),(1464,'Yaquerana',142),(1465,'Contamana',143),(1466,'Inahuaya',143),(1467,'Padre Marquez',143),(1468,'Pampa Hermosa',143),(1469,'Sarayacu',143),(1470,'Vargas Guerra',143),(1471,'Tambopata',144),(1472,'Inambari',144),(1473,'Las Piedras',144),(1474,'Laberinto',144),(1475,'Manu',145),(1476,'Fitzcarrald',145),(1477,'Madre De Dios',145),(1478,'Huepetuhe',145),(1479,'Iñapari',146),(1480,'Iberia',146),(1481,'Tahuamanu',146),(1482,'Moquegua',147),(1483,'Carumas',147),(1484,'Cuchumbaya',147),(1485,'Samegua',147),(1486,'San Cristobal',147),(1487,'Torata',147),(1488,'Omate',148),(1489,'Chojata',148),(1490,'Coalaque',148),(1491,'Ichuña',148),(1492,'La Capilla',148),(1493,'Lloque',148),(1494,'Matalaque',148),(1495,'Puquina',148),(1496,'Quinistaquillas',148),(1497,'Ubinas',148),(1498,'Yunga',148),(1499,'Ilo',149),(1500,'El Algarrobal',149),(1501,'Pacocha',149),(1502,'Chaupimarca',150),(1503,'Huachon',150),(1504,'Huariaca',150),(1505,'Huayllay',150),(1506,'Ninacaca',150),(1507,'Pallanchacra',150),(1508,'Paucartambo',150),(1509,'San Fco.De As is De Yarusyac',150),(1510,'Simon Bolivar',150),(1511,'Ticlacayan',150),(1512,'Tinyahuarco',150),(1513,'Vicco',150),(1514,'Yanacancha',150),(1515,'Yanahuanca',151),(1516,'Chacayan',151),(1517,'Goyllarisquizga',151),(1518,'Paucar',151),(1519,'San Pedro De Pillao',151),(1520,'Santa Ana De Tusi',151),(1521,'Tapuc',151),(1522,'Vilcabamba',151),(1523,'Oxapampa',152),(1524,'Chontabamba',152),(1525,'Huancabamba',152),(1526,'Palcazu',152),(1527,'Pozuzo',152),(1528,'Puerto Bermudez',152),(1529,'Villa Rica',152),(1530,'Piura',153),(1531,'Castilla',153),(1532,'Catacaos',153),(1533,'Cura Mori',153),(1534,'El Tallan',153),(1535,'La Arena',153),(1536,'La Union',153),(1537,'Las Lomas',153),(1538,'Tambo Grande',153),(1539,'Ayabaca',154),(1540,'Frias',154),(1541,'Jilili',154),(1542,'Lagunas',154),(1543,'Montero',154),(1544,'Pacaipampa',154),(1545,'Paimas',154),(1546,'Sapillica',154),(1547,'Sicchez',154),(1548,'Suyo',154),(1549,'Huancabamba',155),(1550,'Canchaque',155),(1551,'El Carmen De La Frontera',155),(1552,'Huarmaca',155),(1553,'Lalaquiz',155),(1554,'San Miguel De El Faique',155),(1555,'Sondor',155),(1556,'Sondorillo',155),(1557,'Chulucanas',156),(1558,'Buenos Aires',156),(1559,'Chalaco',156),(1560,'La Matanza',156),(1561,'Morropon',156),(1562,'Salitral',156),(1563,'San Juan De Bigote',156),(1564,'Santa Catalina De Mossa',156),(1565,'Santo Domingo',156),(1566,'Yamango',156),(1567,'Paita',157),(1568,'Amotape',157),(1569,'Arenal',157),(1570,'Colan',157),(1571,'La Huaca',157),(1572,'Tamarindo',157),(1573,'Vichayal',157),(1574,'Sullana',158),(1575,'Bellavista',158),(1576,'Ignacio Escudero',158),(1577,'Lancones',158),(1578,'Marcavelica',158),(1579,'Miguel Checa',158),(1580,'Querecotillo',158),(1581,'Salitral',158),(1582,'Pariñas',159),(1583,'El Alto',159),(1584,'La Brea',159),(1585,'Lobitos',159),(1586,'Los Organos',159),(1587,'Mancora',159),(1588,'Sechura',160),(1589,'Bellavista De La Union',160),(1590,'Bernal',160),(1591,'Cristo Nos Valga',160),(1592,'Vice',160),(1593,'Rinconada Llicuar',160),(1594,'Puno',161),(1595,'Acora',161),(1596,'Amantani',161),(1597,'Atuncolla',161),(1598,'Capachica',161),(1599,'Chucuito',161),(1600,'Coata',161),(1601,'Huata',161),(1602,'Mañazo',161),(1603,'Paucarcolla',161),(1604,'Pichacani',161),(1605,'Plateria',161),(1606,'San Antonio',161),(1607,'Tiquillaca',161),(1608,'Vilque',161),(1609,'Azangaro',162),(1610,'Achaya',162),(1611,'Arapa',162),(1612,'Asillo',162),(1613,'Caminaca',162),(1614,'Chupa',162),(1615,'Jose Domingo Choquehuanca',162),(1616,'Muñani',162),(1617,'Potoni',162),(1618,'Saman',162),(1619,'San Anton',162),(1620,'San Jose',162),(1621,'San Juan De Salinas',162),(1622,'Santiago De Pupuja',162),(1623,'Tirapata',162),(1624,'Macusani',163),(1625,'Ajoyani',163),(1626,'Ayapata',163),(1627,'Coasa',163),(1628,'Corani',163),(1629,'Crucero',163),(1630,'Ituata',163),(1631,'Ollachea',163),(1632,'San Gaban',163),(1633,'Usicayos',163),(1634,'Juli',164),(1635,'Desaguadero',164),(1636,'Huacullani',164),(1637,'Kelluyo',164),(1638,'Pisacoma',164),(1639,'Pomata',164),(1640,'Zepita',164),(1641,'Ilave',165),(1642,'Capazo',165),(1643,'Pilcuyo',165),(1644,'Santa Rosa',165),(1645,'Conduriri',165),(1646,'Huancane',166),(1647,'Cojata',166),(1648,'Huatasani',166),(1649,'Inchupalla',166),(1650,'Pusi',166),(1651,'Rosaspata',166),(1652,'Taraco',166),(1653,'Vilque Chico',166),(1654,'Lampa',167),(1655,'Cabanilla',167),(1656,'Calapuja',167),(1657,'Nicasio',167),(1658,'Ocuviri',167),(1659,'Palca',167),(1660,'Paratia',167),(1661,'Pucara',167),(1662,'Santa Lucia',167),(1663,'Vilavila',167),(1664,'Ayaviri',168),(1665,'Antauta',168),(1666,'Cupi',168),(1667,'Llalli',168),(1668,'Macari',168),(1669,'Nuñoa',168),(1670,'Orurillo',168),(1671,'Santa Rosa',168),(1672,'Umachiri',168),(1673,'Moho',169),(1674,'Conima',169),(1675,'Huayrapata',169),(1676,'Tilali',169),(1677,'Putina',170),(1678,'Ananea',170),(1679,'Pedro Vilca Apaza',170),(1680,'Quilcapuncu',170),(1681,'Sina',170),(1682,'Juliaca',171),(1683,'Cabana',171),(1684,'Cabanillas',171),(1685,'Caracoto',171),(1686,'Sandia',172),(1687,'Cuyocuyo',172),(1688,'Limbani',172),(1689,'Patambuco',172),(1690,'Phara',172),(1691,'Quiaca',172),(1692,'San Juan Del Oro',172),(1693,'Yanahuaya',172),(1694,'Alto Inambari',172),(1695,'Yunguyo',173),(1696,'Anapia',173),(1697,'Copani',173),(1698,'Cuturapi',173),(1699,'Ollaraya ',173),(1700,'Tinicachi ',173),(1701,'Unicachi',173),(1702,'Moyobamba ',174),(1703,'Calzada ',174),(1704,'Habana ',174),(1705,'Jepelacio ',174),(1706,'Soritor ',174),(1707,'Yantalo ',174),(1708,'Bellavista ',175),(1709,'Alto Biavo ',175),(1710,'Bajo Biavo ',175),(1711,'Huallaga ',175),(1712,'San Pablo ',175),(1713,'San Rafael ',175),(1714,'San Jose De Sisa',176),(1715,'Agua Blanca',176),(1716,'San Martin',176),(1717,'Santa Rosa',176),(1718,'Shatoja',176),(1719,'Saposoa',177),(1720,'Alto Saposoa',177),(1721,'El Eslabon',177),(1722,'Piscoyacu',177),(1723,'Sacanche',177),(1724,'Tingo De Saposoa',177),(1725,'Lamas',178),(1726,'Alonso De Alvarado',178),(1727,'Barranquita',178),(1728,'Caynarachi 1/',178),(1729,'Cuñumbuqui',178),(1730,'Pinto Recodo',178),(1731,'Rumisapa',178),(1732,'San Roque De Cumbaza',178),(1733,'Shanao',178),(1734,'Tabalosos',178),(1735,'Zapatero',178),(1736,'Juanjui',179),(1737,'Campanilla',179),(1738,'Huicungo',179),(1739,'Pachiza',179),(1740,'Pajarillo',179),(1741,'Picota',180),(1742,'Buenos Aires',180),(1743,'Caspisapa',180),(1744,'Pilluana',180),(1745,'Pucacaca',180),(1746,'San Cristobal',180),(1747,'San Hilarion',180),(1748,'Shamboyacu',180),(1749,'Tingo De Ponasa',180),(1750,'Tres Unidos',180),(1751,'Rioja',181),(1752,'Awajun',181),(1753,'Elias Soplin Vargas',181),(1754,'Nueva Cajamarca',181),(1755,'Pardo Miguel',181),(1756,'Posic',181),(1757,'San Fernando',181),(1758,'Yorongos',181),(1759,'Yuracyacu',181),(1760,'Tarapoto',182),(1761,'Alberto Leveau',182),(1762,'Cacatachi',182),(1763,'Chazuta',182),(1764,'Chipurana',182),(1765,'El Porvenir',182),(1766,'Huimbayoc',182),(1767,'Juan Guerra',182),(1768,'La Banda De Shilcayo',182),(1769,'Morales',182),(1770,'Papaplaya',182),(1771,'San Antonio',182),(1772,'Sauce',182),(1773,'Shapaja',182),(1774,'Tocache',183),(1775,'Nuevo Progreso',183),(1776,'Polvora',183),(1777,'Shunte',183),(1778,'Uchiza',183),(1779,'Tacna',184),(1780,'Alto De La Alianza',184),(1781,'Calana',184),(1782,'Ciudad Nueva',184),(1783,'Inclan',184),(1784,'Pachia',184),(1785,'Palca',184),(1786,'Pocollay',184),(1787,'Sama',184),(1788,'Coronel Gregorio Albarracín',184),(1789,'Lanchipa',184),(1790,'Candarave',185),(1791,'Cairani',185),(1792,'Camilaca',185),(1793,'Curibaya',185),(1794,'Huanuara',185),(1795,'Quilahuani',185),(1796,'Locumba',186),(1797,'Ilabaya',186),(1798,'Ite',186),(1799,'Tarata',187),(1800,'Chucatamani',187),(1801,'Estique',187),(1802,'Estique-Pampa',187),(1803,'Sitajara',187),(1804,'Susapaya',187),(1805,'Tarucachi',187),(1806,'Ticaco',187),(1807,'Tumbes',188),(1808,'Corrales',188),(1809,'La Cruz',188),(1810,'Pampas De Hospital',188),(1811,'San Jacinto',188),(1812,'San Juan De La Virgen',188),(1813,'Zorritos',189),(1814,'Casitas',189),(1815,'Zarumilla',190),(1816,'Aguas Verdes',190),(1817,'Matapalo',190),(1818,'Papayal',190),(1819,'Calleria',191),(1820,'Campoverde',191),(1821,'Iparia',191),(1822,'Masisea',191),(1823,'Yarinacocha',191),(1824,'Nueva Requena',191),(1825,'Raymondi',192),(1826,'Sepahua',192),(1827,'Tahuania',192),(1828,'Yurua',192),(1829,'Padre Abad',193),(1830,'Irazola',193),(1831,'Curimana',193),(1832,'Puru',194),(1833,'Pueblo Libre',128);
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  `url` varchar(100) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_types`
--

DROP TABLE IF EXISTS `event_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `event_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_types`
--

LOCK TABLES `event_types` WRITE;
/*!40000 ALTER TABLE `event_types` DISABLE KEYS */;
INSERT INTO `event_types` VALUES (1,'Curso'),(2,'Diplomado');
/*!40000 ALTER TABLE `event_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `hours` int(11) DEFAULT NULL,
  `picture_url` varchar(100) DEFAULT NULL,
  `init_date` date NOT NULL,
  `init_hour` time NOT NULL,
  `gift` varchar(40) DEFAULT NULL,
  `description` text,
  `event_type_id` int(11) DEFAULT NULL,
  `specialism_id` int(11) DEFAULT NULL,
  `code` int(11) DEFAULT NULL,
  `upload_path` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_type_id` (`event_type_id`),
  KEY `fk_specialims_events_1` (`specialism_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`event_type_id`) REFERENCES `event_types` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_specialims_events_1` FOREIGN KEY (`specialism_id`) REFERENCES `jousemoi_legisv2`.`specialisms` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'TIPIFICACION PENAL Y ASPECTOS PROCESALES RELACIONADOS AL ESTADO DE EMERGENCIA NACIONAL Y AISLAMIENTO SOCIAL',2,'uploads/zYgeGFQrd4LRwkubVOsK.jpeg','2020-01-01','12:00:00','','LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,5,1,NULL),(2,'VIOLENCIA FAMILIAR Y VIOLENCIA DE GÉNERO EN EL MARCO DEL DERECHO PENAL',NULL,'assets/events/e02.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,5,NULL,NULL),(3,'DELITOS APLICABLES EN EL CONTEXTO DE LA PANDEMIA DEL COVID-19',NULL,'assets/events/e03.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,5,NULL,NULL),(4,'DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA Y CORRUPCIÓN DE FUNCIONARIOS',NULL,'assets/events/e04.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,5,NULL,NULL),(5,'DERECHO PENAL, DERECHO PROCESAL Y ANTICORRUPCIÓN',NULL,'assets/events/e05.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,5,NULL,NULL),(6,'FEMINICIDIO, VIOLENCIA FAMILIAR Y DELITOS SEXUALES',NULL,'assets/events/e06.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO',1,5,NULL,NULL),(7,'PRISIÓN PREVENTIVA, MEDIDAS DE COERCIÓN Y BENEFICIOS PENITENCIARIOS',NULL,'assets/events/e07.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,5,NULL,NULL),(8,'DELITOS COMETIDOS POR FUNCIONARIOS PÚBLICOS EN EL EJERCICIO DE SUS FUNCIONES, DELITOS COMETIDOS POR PARTICULARES Y DELITOS ECONÓMICOS',0,'uploads/mEuKqdeYZNVwtioAMD3G.jpeg','2020-01-01','12:00:00','','LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,5,1,NULL),(9,'DELITOS CONTRA LA VIDA, EL CUERPO Y LA SALUD',NULL,'assets/events/e09.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO',1,5,NULL,NULL),(10,'CRIMINALÍSTICA, CRIMINOLGÍA Y CIENCIAS FORENSES',NULL,'assets/events/e10.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,9,NULL,NULL),(11,'LOS PLAZOS DE LOS PROCEDIMIENTOS ADMINISTRATIVOS A PARTIR DE SU SUSPENSIÓN DICTADA POR LOS DECRETOS DE URGENCIA N°026-2020 Y N°029-2020 COMO MEDIDA DEL ESTADO DE EMERGENCIA POR EL COVID-19',NULL,'assets/events/e11.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,10,NULL,NULL),(12,'DERECHO ADMINISTRATIVO, LOS PROCEDIMIENTOS ADMINISTRATIVOS SANCIONADORES Y LAS ACTUACIONES DE LAS ENTIDADES PÚBLICAS DURANTE EL ESTADO DE EMERGENCIA',NULL,'assets/events/e12.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO',1,10,NULL,NULL),(13,'DERECHO LABORAL Y ANÁLISIS DEL DECRETO DE URGENCIA N°038-2020',NULL,'assets/events/e13.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,8,NULL,NULL),(14,'DERECHO DE FAMILIA, PROCESOS JUDICIALES, CONCILIACIÓN EXTRAJUDICIAL E INTERESES SUPERIOR DEL NIÑO',NULL,'assets/events/e14.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,4,NULL,NULL),(15,'PENSIÓN DE ALIMENTOS, TENENCIA, RÉGIMEN DE VISITAS Y FILIACION EXTRAMATRIMONIAL',NULL,'assets/events/e15.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,4,NULL,NULL),(16,'DERECHO DE FAMILIA, PROTECCIÓN DEL NIÑO Y ADOLECENTE',NULL,'assets/img/default-event.png','2020-01-01','00:00:00',NULL,'LLEVAR UN CURSO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, CERTIFICADO POR NUESTRA INSITUTCIÓN.',1,4,NULL,NULL),(18,'DELITOS CONTRA LA LIBERTAD SEXUAL, FEMINICIDIO, LESIONES, VIOLENCIA FAMILIAR Y DE GÉNERO EN EL MARCO DEL DERECHO PENAL',NULL,'assets/events/e18.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN DIPLOMADO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, NUESTROS DIPLOMADOS ESTÁN CERTIFICADOS POR EL ILUSTRE COLEGIO DE ABOGADOS DE LIMA Y NUESTRA INSTITUCIÓN, CONTAMOS CON UNA DESTACADA Y RECONOCIDA PLANA DE DOCENTES DE ALTO NIVEL. DIRIGIDO A ABOGADOS, ESTUDIANTES DE DERECHO Y PÚBLICO EN GENERAL.',2,5,NULL,NULL),(19,'DERECHO PENAL, DERECHO PROCESAL, MEDIDAS DE COERCIÓN  Y DELITOS CONTRA EL PATRIMONIO',NULL,'assets/events/e19.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN DIPLOMADO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, NUESTROS DIPLOMADOS ESTÁN CERTIFICADOS POR EL ILUSTRE COLEGIO DE ABOGADOS DE LIMA Y NUESTRA INSTITUCIÓN, CONTAMOS CON UNA DESTACADA Y RECONOCIDA PLANA DE DOCENTES DE ALTO NIVEL. DIRIGIDO A ABOGADOS, ESTUDIANTES DE DERECHO Y PÚBLICO EN GENERAL.',2,5,NULL,NULL),(20,'TÉCNICAS DE LITIGACIÓN ORAL EN EL PROCESO PENAL, TEORIA DEL CASO Y EL NUEVO CÓDIGO PROCESAL PENAL',NULL,'assets/events/e20.jpeg','2020-01-01','00:00:00',NULL,'LLEVAR UN DIPLOMADO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, NUESTROS DIPLOMADOS ESTÁN CERTIFICADOS POR EL ILUSTRE COLEGIO DE ABOGADOS DE LIMA Y NUESTRA INSTITUCIÓN, CONTAMOS CON UNA DESTACADA Y RECONOCIDA PLANA DE DOCENTES DE ALTO NIVEL. DIRIGIDO A ABOGADOS, ESTUDIANTES DE DERECHO Y PÚBLICO EN GENERAL.',2,5,NULL,NULL),(21,'VIOLENCIA CONTRA LA MUJER Y EL GRUPO FAMILIAR, EXPLOTACIÓN SEXUAL Y LABORAL, DELITOS DE TRATA DE PERSONAS Y DELITOS SEXUALES',0,'uploads/Iv2jsC58A4FkN7xc6nJT.jpeg','2020-01-01','12:00:00','','LLEVAR UN DIPLOMADO DE ALTA ESPECIALIZACIÓN, NO SOLO PERMITE ESPECIALIZARSE EN DETERMINADA ÁREA, SINO TAMBIÉN SER UN PROFESIONAL MÁS COMPETITIVO QUE PUEDA DIFERENCIARSE DEL RESTO, NUESTROS DIPLOMADOS ESTÁN CERTIFICADOS POR EL ILUSTRE COLEGIO DE ABOGADOS DE LIMA Y NUESTRA INSTITUCIÓN, CONTAMOS CON UNA DESTACADA Y RECONOCIDA PLANA DE DOCENTES DE ALTO NIVEL. DIRIGIDO A ABOGADOS, ESTUDIANTES DE DERECHO Y PÚBLICO EN GENERAL.',2,5,1,NULL),(22,'DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA, CORRUPCIÓN DE FUNCIONARIOS, LAVADO DE ACTIVOS Y CRIMEN ORGANIZADO',1,'uploads/X5kWEfldyVuMHhUwpK2I.jpeg','2021-03-01','12:00:00','','DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA, CORRUPCIÓN DE FUNCIONARIOS, LAVADO DE ACTIVOS Y CRIMEN ORGANIZADO\n\nDIPLOMADO DE ALTA ESPECIALIZACIO?N EN:\n\n\"DELITOS CONTRA LA ADMINISTRACIÓN PÚBLICA, CORRUPCIÓN DE FUNCIONARIOS, LAVADO DE ACTIVOS Y CRIMEN ORGANIZADO\"\n\nDOCENTES DE PRIMER NIVEL:\n\nDr. Alonso Pen?a Cabrera.\nDr. Sergio Cha?vez P.\nDr. Frank Almanza A.\nDr. Hamilton Castro T.\nDr. José Palomino M.\n\nCERTIFICADO POR:\n\nILUSTRE COLEGIO DE ABOGADOS DE LIMA\nLEGIS JURISTAS ESCUELA DE DERECHO',2,8,1,NULL),(23,'FEMINICIDIO, VIOLENCIA DE GÉNERO, ACOSO SEXUAL, DELITO DE PROXENETISMO Y PROSTITUCIÓN EN EL PERÚ, ABUSO INFANTIL Y TOCAMIENTOS INDEBIDOS DENTRO DEL CONTEXTO FAMILIAR',4,'uploads/gKx63olmIO1nTWhbSZ4D.jpeg','2021-04-03','09:45:00','','FEMINICIDIO, VIOLENCIA DE GÉNERO, ACOSO SEXUAL, DELITO DE PROXENETISMO Y PROSTITUCIÓN EN EL PERÚ, ABUSO INFANTIL Y TOCAMIENTOS INDEBIDOS DENTRO DEL CONTEXTO FAMILIAR',2,5,1,NULL),(24,'DERECHO PROCESAL PENAL, LA TEORÍA DEL DELITO, RECURSOS IMPUGNATORIOS Y MEDIDAS CAUTELARES',4,'uploads/40aITfgbJylEMK8Rx7Zs.jpeg','2021-04-03','09:45:00','GESTIÓN PÚBLICA Y DERECHO ADMINISTRATIVO','Diplomado de alta especialización\n\nMás curso en vivo de regalo',2,5,0,NULL),(25,'VIOLENCIA FAMILIAR, PERITAJE MÉDICO LEGAL EN LOS CASOS DE ABUSO SEXUAL, CAMARA GESELL, LA PSICOLOGÍA FORENSE Y LOS TRASTORNOS PSICOPATOLÓGICOS DEL AGRESOR',4,'uploads/rYkeXbWyD60Km5MNcOnA.jpeg','2021-06-05','09:45:00','DERECHO DE FAMILIA, PROCESAL FAMILIAR Y ','Diplomado de alta especialización',2,5,1,NULL),(26,'CRIMINALIDAD ORGANIZADA EN EL PERÚ, DELITOS DE CORRUPCIÓN DE FUNCIONARIOS, TRÁFICO DE INFLUENCIAS, ENRIQUECIMIENTO ILÍCITO Y COLABORACIÓN EFICAZ EN EL DELITO DE LAVADO DE ACTIVOS',250,'uploads/7XPyVEsOJmGFRi5Bb3pK.jpeg','2024-08-15','09:00:00','NUEVO CÓDIGO PROCESAL PENAL, TEORÍA DEL ','DIPLOMADO DE ALTA ESPECIALIZACIÓN',2,5,0,NULL);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_speakers`
--

DROP TABLE IF EXISTS `events_speakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_speakers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `speaker_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `speaker_id` (`speaker_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `events_speakers_ibfk_1` FOREIGN KEY (`speaker_id`) REFERENCES `speakers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `events_speakers_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_speakers`
--

LOCK TABLES `events_speakers` WRITE;
/*!40000 ALTER TABLE `events_speakers` DISABLE KEYS */;
INSERT INTO `events_speakers` VALUES (1,1,1),(2,1,3),(3,1,2),(4,1,4),(5,1,6),(6,1,5),(7,1,7),(8,1,8),(9,1,9),(10,7,5),(11,8,5),(12,9,7),(13,2,10),(14,10,11),(15,10,12),(16,11,13),(17,12,14),(18,13,14),(19,12,15),(20,12,16),(26,1,18),(27,9,18),(28,3,18),(29,4,18),(30,1,19),(31,2,19),(32,3,19),(33,4,19),(34,1,20),(35,9,20),(36,3,20),(37,6,20),(38,1,21),(39,2,21),(40,3,21),(41,5,21),(42,1,22),(43,3,22),(44,9,22),(45,5,23),(46,2,23),(47,4,23),(48,3,23),(49,1,23),(50,12,23),(51,1,24),(52,3,24),(53,6,24),(54,9,24),(55,13,25),(56,1,25),(57,2,25),(58,5,25),(59,1,26),(60,4,26),(61,9,26),(62,3,26);
/*!40000 ALTER TABLE `events_speakers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_students`
--

DROP TABLE IF EXISTS `events_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `events_students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `events_students_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `events_students_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_students`
--

LOCK TABLES `events_students` WRITE;
/*!40000 ALTER TABLE `events_students` DISABLE KEYS */;
/*!40000 ALTER TABLE `events_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (1,'Masculino'),(2,'Femenino'),(3,'Otros');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinces`
--

DROP TABLE IF EXISTS `provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provinces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `provinces_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinces`
--

LOCK TABLES `provinces` WRITE;
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` VALUES (1,'Chachapoyas',1),(2,'Bagua ',1),(3,'Bongara ',1),(4,'Condorcanqui',1),(5,'Luya ',1),(6,'Rodriguez De Mendo',1),(7,'Utcubamba',1),(8,'Huaraz',2),(9,'Aija',2),(10,'Antonio Raymondi',2),(11,'Asunción',2),(12,'Bolognesi',2),(13,'Carhuaz',2),(14,'Carlos F. Fitzcarrald',2),(15,'Casma ',2),(16,'Corongo ',2),(17,'Huari',2),(18,'Huarmey ',2),(19,'Huaylas',2),(20,'Mariscal Luzuriaga',2),(21,'Ocros ',2),(22,'Pallasca ',2),(23,'Pomabamba',2),(24,'Recuay',2),(25,'Santa',2),(26,'Sihuas ',2),(27,'Yungay',2),(28,'Abancay',3),(29,'Andahuaylas',3),(30,'Antabamba',3),(31,'Aymaraes',3),(32,'Cotabambas',3),(33,'Chincheros',3),(34,'Grau',3),(35,'Arequipa',4),(36,'Camana',4),(37,'Caraveli',4),(38,'Castilla',4),(39,'Caylloma',4),(40,'Condesuyos',4),(41,'Islay',4),(42,'La Union ',4),(43,'Huamanga',5),(44,'Cangallo ',5),(45,'Huanca Sancos',5),(46,'Huanta',5),(47,'La Mar',5),(48,'Lucanas',5),(49,'Parinacochas',5),(50,'Paucar Del Sara Sara',5),(51,'Sucre',5),(52,'Victor Fajardo',5),(53,'Vilcas Huaman',5),(54,'Cajamarca',6),(55,'Cajabamba',6),(56,'Celendin ',6),(57,'Chota ',6),(58,'Contumaza ',6),(59,'Cutervo ',6),(60,'Hualgayoc',6),(61,'Jaen',6),(62,'San Ignacio',6),(63,'San Marcos',6),(64,'San Miguel ',6),(65,'San Pablo',6),(66,'Santa Cruz',6),(67,'Callao',7),(68,'Cusco ',8),(69,'Acomayo ',8),(70,'Anta',8),(71,'Calca',8),(72,'Canas ',8),(73,'Canchis',8),(74,'Chumbivilcas',8),(75,'Espinar',8),(76,'La Convencion',8),(77,'Paruro ',8),(78,'Paucartambo',8),(79,'Quispicanchi',8),(80,'Urubamba',8),(81,'Huancavelica',9),(82,'Acobamba ',9),(83,'Angaraes ',9),(84,'Castrovirreyna',9),(85,'Churcampa',9),(86,'Huaytara',9),(87,'Tayacaja',9),(88,'Huanuco ',10),(89,'Ambo ',10),(90,'Dos De Mayo',10),(91,'Huacaybamba',10),(92,'Huamalies',10),(93,'Leoncio Prado',10),(94,'Marañón',10),(95,'Pachitea ',10),(96,'Puerto Inca ',10),(97,'Lauricocha ',10),(98,'Yarowilca',10),(99,'Ica',11),(100,'Chincha',11),(101,'Nazca ',11),(102,'Palpa  ',11),(103,'Pisco ',11),(104,'Huancayo',12),(105,'Concepcion',12),(106,'Chanchamayo',12),(107,'Jauja',12),(108,'Junin ',12),(109,'Satipo ',12),(110,'Tarma ',12),(111,'Yauli',12),(112,'Chupaca',12),(113,'Trujillo',13),(114,'Ascope',13),(115,'Bolivar ',13),(116,'Chepen ',13),(117,'Julcan ',13),(118,'Otuzco ',13),(119,'Pacasmayo',13),(120,'Pataz',13),(121,'Sanchez Carrion',13),(122,'Santiago De Chuco',13),(123,'Gran Chimu',13),(124,'Viru',13),(125,'Chiclayo',14),(126,'Ferreñafe',14),(127,'Lambayeque ',14),(128,'Lima',15),(129,'Barranca ',15),(130,'Cajatambo',15),(131,'Canta',15),(132,'Cañete',15),(133,'Huaral ',15),(134,'Huarochiri ',15),(135,'Huaura',15),(136,'Oyon',15),(137,'Yauyos ',15),(138,'Maynas',16),(139,'Alto Amazonas',16),(140,'Loreto',16),(141,'Mariscal Ramon Castilla',16),(142,'Requena ',16),(143,'Ucayali ',16),(144,'Tambopata ',17),(145,'Manu ',17),(146,'Tahuamanu',17),(147,'Mariscal Nieto',18),(148,'General Sanchez Cerro',18),(149,'Ilo',18),(150,'Pasco',19),(151,'Daniel Alcides Carrion',19),(152,'Oxapampa',19),(153,'Piura',20),(154,'Ayabaca',20),(155,'Huancabamba',20),(156,'Morropon',20),(157,'Paita',20),(158,'Sullana ',20),(159,'Talara ',20),(160,'Sechura ',20),(161,'Puno',21),(162,'Azangaro',21),(163,'Carabaya ',21),(164,'Chucuito ',21),(165,'El Collao  ',21),(166,'Huancane ',21),(167,'Lampa',21),(168,'Melgar ',21),(169,'Moho ',21),(170,'San Antonio De Putina ',21),(171,'San Roman ',21),(172,'Sandia ',21),(173,'Yunguyo ',21),(174,'Moyobamba ',22),(175,'Bellavista ',22),(176,'El Dorado ',22),(177,'Huallaga ',22),(178,'Lamas',22),(179,'Mariscal Caceres',22),(180,'Picota',22),(181,'Rioja',22),(182,'San Martin  ',22),(183,'Tocache ',22),(184,'Tacna',23),(185,'Candarave',23),(186,'Jorge Basadre',23),(187,'Tarata',23),(188,'Tumbes',24),(189,'Contralmirante Villar',24),(190,'Zarumilla',24),(191,'Coronel Portillo',25),(192,'Atalaya',25),(193,'Padre Abad',25),(194,'Purus',25);
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20180716031559'),('20180716032053'),('20180716033310'),('20180716033439'),('20180716033614'),('20180716033710'),('20180716035126'),('20201015014657'),('20201015014702'),('20201016163807'),('20201016170903'),('20201017020259'),('20201118144041'),('20201118144047'),('20201118145050'),('20201118145055'),('20201118150654'),('20201118150655'),('20201118151002'),('20201123133044'),('20201123145825'),('20201127212848'),('20210609210045'),('20210610152010'),('20210610152258'),('20210611202005'),('20210612001252'),('20210614132736'),('20210614152143'),('20210616125716'),('20210624031713'),('20210624032321'),('20210624154008'),('20210630130603'),('20210701164647'),('20210713174155');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speakers`
--

DROP TABLE IF EXISTS `speakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `speakers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) DEFAULT NULL,
  `tuition` int(11) DEFAULT NULL,
  `dni` varchar(8) NOT NULL,
  `names` varchar(50) NOT NULL,
  `last_names` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `picture_url` varchar(100) DEFAULT NULL,
  `resume` text,
  `gender_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gender_id` (`gender_id`),
  CONSTRAINT `speakers_ibfk_1` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speakers`
--

LOCK TABLES `speakers` WRITE;
/*!40000 ALTER TABLE `speakers` DISABLE KEYS */;
INSERT INTO `speakers` VALUES (1,1,0,'123','ALONSO RAÚL','PEÑA CABRERA FREYRE','','','assets/speakers/s01.png','FISCAL PROVINCIAL TITULAR DEL DISTRITO FISCAL DE LIMA, EX FISCAL SUPERIOR DE LIMA - JEFE DE LA UNIDAD DE  COOPERACIÓN JUDICIAL INTERNACIONAL - FISCALÍA DE LA NACIÓN. ',1),(2,NULL,NULL,'123','JOSÉ LUIS ','PACHECO DE LA CRUZ',NULL,NULL,'assets/speakers/s02.png','MÉDICO ESPECIALISTA EN MEDICINA LEGAL, PERITAJES FORENCES, CRIMINALÍSTICA, DOCTOR EN DERECHO. DOCENTE DE MAESTRIAS Y DOCTORADOS EN LA SESIÓN DE POSTGRADO.',1),(3,NULL,NULL,'123','SERGIO EMERSON','CHÁVEZ PANDURO',NULL,NULL,'assets/speakers/s03.png','ABOGADO DE LA FISCALÍA CORPORATIVA ESPECIALIZADA EN DELITOS DE CORRUPCIÓN DE FUNCIONARIOS DE LIMA. MAESTRÍA EN CIENCIAS PENALES POR LA UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS. MAESTRÍA EN DERECHO CONSTITUCIONAL Y DERECHOS HUMANOS POR LA UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS. INVESTIGADOR ACADÉMICO DE DIVERSAS RAMAS DEL DERECHO',1),(4,NULL,NULL,'123','LUIS ALBERTO','PACHECO MANDUJANO',NULL,NULL,'assets/speakers/s04.png','PROFESOR DE DERECHO PENAL E INTERCULTURALIDAD Y DERECHO PENAL Y CONSTITUCIÓN EN LA MAESTRÍA DE DERECHO PENAL DE LA UNIVERSIDAD SAN MARTÍN DE PORRES. MAGISTER EN DERECHO CONSTITUCIONAL POR LA UNIVERSIDAD DE CASTILLA - LA MANCHA, ESPAÑA, DOCTOR HONORIS CAUSA POR LA FACULTAD INTERAMERICANA DE LITIGACIÓN ORAL DE MÉXICO. ',1),(5,NULL,NULL,'123','LETICIA MERCY ','SILVA CHÁVEZ',NULL,NULL,'assets/speakers/s05.png','FISCAL PROVINCIAL TITULAR DE LA NOVENA FISCALÍA PROVINCIAL DE FAMILIA DE LIMA. DOCENTE DE PRE Y POSGRADO UNIVERSITARIO Y DE LA ACADEMIA DE LA MAGISTRATURA. EGRESADA DE LA UNIVERSIDAD MAYOR DE SAN MARCOS, MAGÍSTER EN DERECHO CIVIL Y COMERCIAL.',2),(6,1,1,'123','ALCIDES ','CHINCHAY CASTILLO','','','assets/speakers/s06.png','FISCAL ADJUNTO SUPREMO TITULAR, SEGUNDA FISCALÍA SUPREMA TRANSITORIA ESPECIALIZADA EN DELITOS COMETIDOS POR FUNCIONARIOS PÚBLICOS, ABOGADO POR LA PONTIFICIA UNIVERSIDAD CATÓLICA DEL PERÚ. ',1),(7,NULL,NULL,'123','CHRISTIAN','SALAS BETETA',NULL,NULL,'assets/speakers/s07.png','ABOGADO PENALISTA. EXPERTO EN DERECHO PENAL Y PROCESAL PENAL. CON EXPERIENCIA EN LA DIRECCIÓN DE EQUIPOS DE LITIGIO DE CASOS DE CORRUPCIÓN Y LAVADO DE ACTIVOS EN CONTEXTO DE CRIMEN ORGANIZADO. FUNDADOR DE LA FIRMA SALAS BETETA ABOGADOS',1),(8,NULL,NULL,'123','FERNANDO JOSE','CORNEJO MALMA',NULL,NULL,'assets/speakers/s08.png','ABOGADO ESPECIALISTA Y CAPACITADOR EN DERECHO PENAL Y PROCESAL PENAL, CATEDRÁTICO CON MÁS DE 15 AÑOS DE TRAYECTORIA EN DOCENCIA Y EN LAS CIENCIAS JURÍDICAS',1),(9,NULL,NULL,'123','FRANK','ALMANZA ALTAMIRANO',NULL,NULL,'assets/speakers/s09.png','FISCAL SUPERIOR PENAL DE LIMA. MAESTRÍA EN CIENCIAS PENALES DE LA UNIVERSIDAD  MAYOR DE SAN MARCOS Y LA UNIVERSIDAD INCA GARCILASO DE LA VEGA. DIPLOMADO EN DERECHOS HUMANOS Y PROCESAL CONSTITUCIONAL EN LA APECC',1),(10,1,123,'123','FERNANDO','COSTA MOSCOL','','','assets/speakers/s10.png','MAGISTER EN DERECHO EMPRESARIAL POR LA PUCP. ESPECIALISTA LEGAL SENIOR EN OSINERGMIN. ABOGADO POR LA UNIVERSIDAD DE PIURA.',1),(11,1,123,'123','ROLANDO','UBILLÚS BRACAMONTE','','','assets/speakers/s11.png','DOCTOR Y MAGISTER EN DERECHO DEL TRABAJO Y DE LA SEGURIDAD SOCIAL',1),(12,1,123,'123','FRANCISCO LUIS','VILLANUEVA ORIHUELA','','','assets/speakers/s12.png','ABOGADO CIVILISTA, ESPECIALISTA EN DERECHO DE FAMILIA Y DERECHO AMBIENTAL. CATEDRÁTICO',1),(13,1,123,'','ROBERT GONZALO','COZ RODRIGUEZ','','','assets/speakers/s13.png','ABOGADO ESPECIALISTA Y CAPACITADOR EN DERECHO CIVIL, PROCESAL CIVIL Y DERECHO COMERCIAL, CATEDRÁTICO CON MÁS DE 20 AÑOS DE TRAYECTORIA EN DOCENCIA Y EN LAS CIENCIAS JURÍDICAS',1),(14,0,1,'','Leticia','Silva C.','','','assets/img/default-user.png','Egresada de la Universidad Nacional Mayor de San Marcos, Magíster en Derecho Civil y Comercial, Licenciada  en  Educación, con estudios de Doctorado en Derecho y Ciencias Políticas. Con estudios de “Experta Universitaria en el Curso de Derecho Español para Juristas Extranjeros”.',2);
/*!40000 ALTER TABLE `speakers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisms`
--

DROP TABLE IF EXISTS `specialisms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialisms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisms`
--

LOCK TABLES `specialisms` WRITE;
/*!40000 ALTER TABLE `specialisms` DISABLE KEYS */;
INSERT INTO `specialisms` VALUES (1,'Derechos Humanos'),(2,'Derecho Internacional'),(3,'Derecho Corporativo o Empresarial'),(4,'Derecho Civil'),(5,'Derecho Penal'),(6,'Derecho Mercantil'),(7,'Derecho Tributario'),(8,'Derecho Laboral'),(9,'CRIMINOLOGIA'),(10,'DERECHO ADMINISTRATIVO');
/*!40000 ALTER TABLE `specialisms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisms_speakers`
--

DROP TABLE IF EXISTS `specialisms_speakers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialisms_speakers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `speaker_id` int(11) DEFAULT NULL,
  `specialism_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `speaker_id` (`speaker_id`),
  KEY `specialism_id` (`specialism_id`),
  CONSTRAINT `specialisms_speakers_ibfk_1` FOREIGN KEY (`speaker_id`) REFERENCES `speakers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `specialisms_speakers_ibfk_2` FOREIGN KEY (`specialism_id`) REFERENCES `specialisms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisms_speakers`
--

LOCK TABLES `specialisms_speakers` WRITE;
/*!40000 ALTER TABLE `specialisms_speakers` DISABLE KEYS */;
INSERT INTO `specialisms_speakers` VALUES (1,1,5),(2,2,5),(3,3,5),(4,4,5),(5,5,5),(6,6,5),(7,7,5),(8,8,5),(9,9,5),(10,10,10),(11,11,8),(12,12,4),(13,13,4),(14,2,6),(15,14,5);
/*!40000 ALTER TABLE `specialisms_speakers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisms_students`
--

DROP TABLE IF EXISTS `specialisms_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specialisms_students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `specialism_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `specialism_id` (`specialism_id`),
  CONSTRAINT `specialisms_students_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `specialisms_students_ibfk_2` FOREIGN KEY (`specialism_id`) REFERENCES `specialisms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisms_students`
--

LOCK TABLES `specialisms_students` WRITE;
/*!40000 ALTER TABLE `specialisms_students` DISABLE KEYS */;
/*!40000 ALTER TABLE `specialisms_students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) DEFAULT NULL,
  `tuition` int(11) DEFAULT NULL,
  `dni` varchar(8) NOT NULL,
  `names` varchar(50) NOT NULL,
  `last_names` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `picture_url` varchar(100) DEFAULT NULL,
  `address` varchar(120) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `videos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text,
  `url` varchar(50) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `vw_districts`
--

DROP TABLE IF EXISTS `vw_districts`;
/*!50001 DROP VIEW IF EXISTS `vw_districts`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_districts` AS SELECT 
 1 AS `id`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_events_documents_students`
--

DROP TABLE IF EXISTS `vw_events_documents_students`;
/*!50001 DROP VIEW IF EXISTS `vw_events_documents_students`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_events_documents_students` AS SELECT 
 1 AS `event_id`,
 1 AS `student_id`,
 1 AS `document_id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `url`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_events_speakers`
--

DROP TABLE IF EXISTS `vw_events_speakers`;
/*!50001 DROP VIEW IF EXISTS `vw_events_speakers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_events_speakers` AS SELECT 
 1 AS `event_id`,
 1 AS `event_name`,
 1 AS `gender_id`,
 1 AS `names`,
 1 AS `last_names`,
 1 AS `picture_url`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_events_specialisms`
--

DROP TABLE IF EXISTS `vw_events_specialisms`;
/*!50001 DROP VIEW IF EXISTS `vw_events_specialisms`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_events_specialisms` AS SELECT 
 1 AS `id`,
 1 AS `init_date`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_events_students`
--

DROP TABLE IF EXISTS `vw_events_students`;
/*!50001 DROP VIEW IF EXISTS `vw_events_students`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_events_students` AS SELECT 
 1 AS `event_id`,
 1 AS `event_name`,
 1 AS `event_description`,
 1 AS `picture_url`,
 1 AS `id`,
 1 AS `names`,
 1 AS `last_names`,
 1 AS `code`,
 1 AS `tuition`,
 1 AS `dni`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_events_types`
--

DROP TABLE IF EXISTS `vw_events_types`;
/*!50001 DROP VIEW IF EXISTS `vw_events_types`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_events_types` AS SELECT 
 1 AS `id`,
 1 AS `code`,
 1 AS `name`,
 1 AS `hours`,
 1 AS `picture_url`,
 1 AS `init_date`,
 1 AS `init_hour`,
 1 AS `gift`,
 1 AS `description`,
 1 AS `event_type_id`,
 1 AS `event_type_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `vw_events_videos_students`
--

DROP TABLE IF EXISTS `vw_events_videos_students`;
/*!50001 DROP VIEW IF EXISTS `vw_events_videos_students`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_events_videos_students` AS SELECT 
 1 AS `event_id`,
 1 AS `student_id`,
 1 AS `video_id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `url`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_districts`
--

/*!50001 DROP VIEW IF EXISTS `vw_districts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_districts` AS select `DI`.`id` AS `id`,concat(`DI`.`name`,', ',`PR`.`name`,', ',`DE`.`name`) AS `name` from ((`districts` `DI` join `provinces` `PR` on((`DI`.`province_id` = `PR`.`id`))) join `departments` `DE` on((`PR`.`department_id` = `DE`.`id`))) limit 2000 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_events_documents_students`
--

/*!50001 DROP VIEW IF EXISTS `vw_events_documents_students`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_events_documents_students` AS select `E`.`id` AS `event_id`,`ES`.`student_id` AS `student_id`,`D`.`id` AS `document_id`,`D`.`name` AS `name`,`D`.`description` AS `description`,`D`.`url` AS `url` from ((`documents` `D` join `events` `E` on((`D`.`event_id` = `E`.`id`))) join `events_students` `ES` on((`ES`.`event_id` = `E`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_events_speakers`
--

/*!50001 DROP VIEW IF EXISTS `vw_events_speakers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_events_speakers` AS select `ES`.`event_id` AS `event_id`,`E`.`name` AS `event_name`,`S`.`gender_id` AS `gender_id`,`S`.`names` AS `names`,`S`.`last_names` AS `last_names`,`S`.`picture_url` AS `picture_url` from ((`events_speakers` `ES` join `speakers` `S` on((`ES`.`speaker_id` = `S`.`id`))) join `events` `E` on((`ES`.`event_id` = `E`.`id`))) limit 2000 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_events_specialisms`
--

/*!50001 DROP VIEW IF EXISTS `vw_events_specialisms`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_events_specialisms` AS select `E`.`specialism_id` AS `id`,`E`.`init_date` AS `init_date`,`S`.`name` AS `name` from (`events` `E` join `specialisms` `S` on((`S`.`id` = `E`.`specialism_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_events_students`
--

/*!50001 DROP VIEW IF EXISTS `vw_events_students`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_events_students` AS select ifnull(`ES`.`event_id`,9999) AS `event_id`,`E`.`name` AS `event_name`,`E`.`description` AS `event_description`,`E`.`picture_url` AS `picture_url`,`S`.`id` AS `id`,`S`.`names` AS `names`,`S`.`last_names` AS `last_names`,`S`.`code` AS `code`,`S`.`tuition` AS `tuition`,`S`.`dni` AS `dni` from ((`students` `S` left join `events_students` `ES` on((`ES`.`student_id` = `S`.`id`))) join `events` `E` on((`E`.`id` = `ES`.`event_id`))) order by `S`.`last_names` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_events_types`
--

/*!50001 DROP VIEW IF EXISTS `vw_events_types`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_events_types` AS select `E`.`id` AS `id`,`E`.`code` AS `code`,`E`.`name` AS `name`,`E`.`hours` AS `hours`,`E`.`picture_url` AS `picture_url`,`E`.`init_date` AS `init_date`,`E`.`init_hour` AS `init_hour`,`E`.`gift` AS `gift`,`E`.`description` AS `description`,`E`.`event_type_id` AS `event_type_id`,`ET`.`name` AS `event_type_name` from (`events` `E` join `event_types` `ET` on((`ET`.`id` = `E`.`event_type_id`))) limit 2000 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_events_videos_students`
--

/*!50001 DROP VIEW IF EXISTS `vw_events_videos_students`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_events_videos_students` AS select `E`.`id` AS `event_id`,`ES`.`student_id` AS `student_id`,`V`.`id` AS `video_id`,`V`.`name` AS `name`,`V`.`description` AS `description`,`V`.`url` AS `url` from ((`videos` `V` join `events` `E` on((`V`.`event_id` = `E`.`id`))) join `events_students` `ES` on((`ES`.`event_id` = `E`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-13 20:24:51
