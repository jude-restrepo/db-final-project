-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: book_app
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `genre_name` varchar(30) NOT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `genre_name_idx` (`genre_name`),
  CONSTRAINT `fk_book_genre_name` FOREIGN KEY (`genre_name`) REFERENCES `genre` (`genre_name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (11,'The Lord of the Rings','Fantasy'),(12,'The Abolition of Man','Philosophy'),(13,'Foundation','Science Fiction'),(14,'The Hunchback of Notre Dame','Classic'),(15,'Moby Dick','Classic'),(16,'Les Miserables','Classic'),(17,'A Tale of Two Cities','Classic'),(18,'Where the Sidewalk Ends','Poetry'),(19,'Saving Private Ryan','Historical Fiction'),(20,'The Everlasting Man','Theology'),(21,'Mere Christianity','Theology'),(22,'The Knowledge of the Holy','Theology'),(23,'Confessions','Theology'),(24,'The Book of Boy','Historical Fiction'),(25,'An Inquiry into the Good','Philosophy'),(26,'The Way of Kings','Fantasy'),(27,'Mistborn','Fantasy'),(28,'The Waste Lands','Poetry');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `community_name` varchar(100) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`community_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES ('author-spotlights','Deep dives into the lives and works of notable authors. Discuss writing styles, bibliographies, and literary legacies.'),('book-recommendations','Not sure what to read next? Ask for recommendations, share hidden gems, and browse curated reading lists from fellow members.'),('classic-literature','Dive into the timeless works of authors like Dickens, Austen, and Tolstoy. Discuss themes, characters, and the historical context behind the classics.'),('debut-authors','Shine a light on first-time and emerging authors. Discover fresh voices and support new talent in the literary world.'),('fantasy-worlds','A community for fans of epic fantasy, urban fantasy, and everything in between. Dragons, magic systems, and world-building welcome.'),('literary-criticism','A space for thoughtful analysis and critique of literature. Discuss narrative structure, symbolism, themes, and literary theory.'),('mystery-and-thriller','For fans of whodunits, psychological thrillers, and crime fiction. Share your latest page-turner and try not to spoil the ending.'),('poetry-corner','Celebrate the art of poetry. Share poems, discuss poets, analyze verses, and post your own original work for feedback.'),('reading-challenges','Join seasonal and yearly reading challenges. Track your progress, share updates, and motivate each other to hit your reading goals.'),('sci-fi-reads','Explore the galaxy of science fiction literature. From Asimov to Le Guin, discuss dystopias, space operas, and speculative worlds.');
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre` (
  `genre_name` varchar(30) NOT NULL,
  PRIMARY KEY (`genre_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES ('Classic'),('Fantasy'),('Historical Fiction'),('Philosophy'),('Poetry'),('Science Fiction'),('Theology');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `genre_counts`
--

DROP TABLE IF EXISTS `genre_counts`;
/*!50001 DROP VIEW IF EXISTS `genre_counts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `genre_counts` AS SELECT 
 1 AS `community_name`,
 1 AS `genre_name`,
 1 AS `total`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `max_per_community`
--

DROP TABLE IF EXISTS `max_per_community`;
/*!50001 DROP VIEW IF EXISTS `max_per_community`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `max_per_community` AS SELECT 
 1 AS `community_name`,
 1 AS `max_total`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `thread_id` int NOT NULL,
  `content` varchar(500) NOT NULL,
  `created_on` datetime NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`post_id`,`thread_id`),
  KEY `thread_id_idx` (`thread_id`),
  KEY `user_id_idx` (`username`),
  CONSTRAINT `fk_post_thread_id` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`thread_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_post_username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'Absolutely still relevant. The way Austen critiques social class and economic pressure on women is something we still see echoed in modern society. The characters just feel timeless.','2024-01-06 09:15:00','Simon'),(2,1,'I think it depends on the reader. The language can be a barrier but once you get past it the themes of independence and self respect are as fresh as ever.','2024-01-07 14:30:00','Jude'),(3,1,'What gets me is how funny it is. People forget Austen was writing satire. Mr Collins alone makes the whole book worth it.','2024-01-08 11:45:00','Simon'),(4,2,'I always read Raskolnikov as someone whose ideology collapses under the weight of his own humanity. He wants to believe he is above morality but he simply is not built that way.','2024-01-13 10:00:00','Jude'),(5,2,'What fascinates me is that Dostoevsky makes you sympathize with him even when he is at his worst. That is incredibly hard to pull off as a writer.','2024-01-14 15:20:00','Simon'),(6,2,'His relationship with Sonya is what sells the redemption arc for me. Without her it would feel unearned but she grounds the whole second half of the novel.','2024-01-15 09:50:00','Jude'),(7,3,'Dune for me without question. The ecological and religious world building feels so intentional. Every detail serves the larger story in a way Foundation never quite matched.','2024-01-19 08:30:00','Simon'),(8,3,'I would argue Foundation has aged better as a political allegory. The idea of psychohistory feels more relevant now than ever given how we talk about data and prediction.','2024-01-20 13:10:00','Jude'),(9,3,'Both are incredible but Dune wins on atmosphere alone. Arrakis feels like a real place with real consequences. Foundation always felt more like a thought experiment to me.','2024-01-21 16:45:00','Simon'),(10,4,'This book hit me the same way. Le Guin has a way of making you realize how many assumptions you carry without even knowing it. Genly Ai is a frustrating protagonist but intentionally so.','2024-01-23 09:20:00','Jude'),(11,4,'The chapter told from Estravens perspective completely reframed everything for me. Le Guin was doing things structurally that most writers still have not caught up to.','2024-01-24 14:00:00','Simon'),(12,4,'I assigned this in my literature class and the discussions it sparked were unlike anything else on the syllabus. Students who had never thought about gender critically were suddenly deeply engaged.','2024-01-25 11:30:00','Jude'),(13,21,'I think the play is about both simultaneously. Oedipus is fated to do what he does but his pride and relentless pursuit of the truth is entirely his own choice. The tragedy lives in that tension.','2024-06-04 10:00:00','Simon'),(14,21,'What gets me is that every attempt to escape fate is exactly what brings it about. His parents sending him away, him fleeing Corinth. The irony is so precise it feels almost cruel.','2024-06-05 14:30:00','Bella'),(15,21,'Sophocles is really asking whether knowledge is always worth having. Oedipus could have stopped investigating at any point. That choice belongs to him alone.','2024-06-06 09:45:00','Jude'),(16,23,'Brave New World is the one that haunts me most. The idea of a society that is controlled not through fear but through pleasure and distraction feels more relevant every year.','2024-06-15 11:20:00','Isaiah'),(17,23,'Neuromancer basically invented the concept of cyberspace before the internet existed. Gibson was working from pure imagination and ended up describing something that actually happened.','2024-06-16 13:40:00','Josiah'),(18,23,'I would argue We by Yevgeny Zamyatin predates and predicts both 1984 and Brave New World. It is criminally underread for how prescient it was about surveillance and conformity.','2024-06-17 10:10:00','Jude'),(19,25,'Flynn for pure shock and construction, French for atmosphere and depth. Gone Girl is a perfect thriller but the Dublin Murder Squad series has a richness that stays with you much longer.','2024-06-26 09:30:00','Simon'),(20,25,'Tana French for me without hesitation. The way she builds dread slowly over hundreds of pages before it all collapses is something Flynn never quite matches.','2024-06-27 15:00:00','Toby'),(21,25,'Flynn is more plot driven and French is more character driven. Depending on what you want from a thriller they are almost incomparable. I love both for different reasons.','2024-06-28 11:45:00','Isaiah'),(22,27,'It has improved but progress has been uneven. Authors like N.K. Jemisin and Nnedi Okofor have expanded what the genre looks like but they remain exceptions rather than the norm in terms of sales and awards.','2024-07-06 10:00:00','Jude'),(23,27,'I think the bigger issue is publishing and marketing. Diverse fantasy exists in abundance but it does not always get the same promotional support or shelf space as more traditional fare.','2024-07-07 14:15:00','Bella'),(24,27,'The indie and self publishing space is way ahead of traditional publishing on this. Some of the most inventive and diverse fantasy being written right now never makes it into major bookstores.','2024-07-08 09:20:00','Simon'),(25,31,'A Little Life by Hanya Yanagihara. I had to put it down multiple times. Nothing has come close to that level of emotional devastation before or since and I am not sure I want it to.','2024-07-25 10:30:00','Toby'),(26,31,'The Road by Cormac McCarthy. The ending absolutely destroyed me. I called my dad immediately after finishing it which I think was the intended effect.','2024-07-26 13:00:00','Bella'),(27,31,'When Breath Becomes Air by Paul Kalanithi. It is not fiction but nothing I have ever read has hit harder. Knowing it is a true story makes every page almost unbearable.','2024-07-27 16:20:00','Isaiah'),(28,33,'His influence is everywhere once you start looking for it. Salman Rushdie, Isabel Allende, Toni Morrison all carry traces of what Marquez established. He essentially gave literary permission for the supernatural to coexist with the real. Acutally nvm','2024-08-05 11:00:00','Jude'),(29,33,'What I find interesting is how magic realism means something different depending on the cultural tradition it comes from. Marquez is Latin American but the form looks completely different in African or South Asian literature.','2024-08-06 14:30:00','Josiah'),(30,33,'I think his influence is sometimes a trap for younger writers. The surface elements of magic realism are easy to imitate but the political and cultural weight behind Marquez is very hard to replicate.','2024-08-07 10:45:00','Simon'),(31,35,'For Africa I went with Things Fall Apart by Chinua Achebe which felt like an obvious but essential choice. For South America I read The House of the Spirits by Allende which was stunning.','2024-08-15 09:00:00','Bella'),(32,35,'Antarctica is the tricky one. I ended up with The Ice at the End of the World which is nonfiction but I counted it. Would love to know if anyone found a better option.','2024-08-16 12:30:00','Jude'),(33,35,'For Asia I chose Convenience Store Woman by Sayaka Murata. Short, strange, and completely unlike anything else I read that year. Highly recommend it for the challenge.','2024-08-17 15:00:00','Isaiah'),(34,38,'The divide has always been more about marketing than quality. Crime and Punishment is essentially a crime novel. The Road is post apocalyptic fiction. The label changes based on who is publishing and reviewing it.','2024-08-31 10:00:00','Jude'),(35,38,'I think genre fiction becomes great literature when it uses its conventions to say something that transcends those conventions. Ursula Le Guin did this better than almost anyone.','2024-08-31 14:45:00','Toby'),(36,38,'The gatekeeping is mostly class based in my view. Literary fiction is marketed to a certain kind of reader and genre fiction to another. The quality difference people perceive is largely a projection of that distinction.','2024-09-01 11:20:00','Simon'),(37,40,'A distinct voice above everything else. I can forgive structural problems or an uneven plot if the prose makes me feel like I am hearing someone completely new. That is the rarest thing in fiction.','2024-09-11 10:00:00','Bella'),(38,40,'Confidence. The debut novels I remember most are the ones where the author clearly knew exactly what they were doing and committed to it fully rather than hedging toward what they thought readers expected.','2024-09-12 13:30:00','Josiah'),(39,40,'I look for emotional specificity. Anyone can write generally about grief or love but a debut that finds a completely unexpected angle on a universal experience immediately tells me this writer has something real to say.','2024-09-13 09:15:00','Jude'),(40,34,'Absolutely underrated. The character work in It alone rivals anything in so called literary fiction. Richie and Beverly feel more real than most protagonists I have encountered outside the genre.','2024-08-11 10:30:00','Toby'),(41,34,'The problem is volume. King has written so much that the weaker books overshadow the exceptional ones in the minds of critics. If he had written only The Shining and Pet Sematary the conversation would be very different.','2024-08-12 14:00:00','Isaiah'),(42,34,'On Writing is one of the best books about craft ever published regardless of genre. The fact that it does not appear on more literary syllabi says everything about the snobbery directed at him.','2024-08-13 11:30:00','Simon'),(43,13,'Do it again','2026-05-01 16:20:06','Jude'),(44,24,'Its because you\'re bad','2026-05-01 17:49:26','Jude'),(45,22,'Don\'t read it','2026-05-01 17:49:46','Jude'),(47,7,'I would like to not delete this post pleas!','2026-05-02 07:51:41','Isaiah'),(48,47,'Yes, Finally','2026-05-02 12:37:11','Becca'),(50,34,'Hellojk','2026-05-02 13:57:43','Jude');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refers_book`
--

DROP TABLE IF EXISTS `refers_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refers_book` (
  `thread_id` int NOT NULL,
  `book_id` int NOT NULL,
  PRIMARY KEY (`thread_id`,`book_id`),
  KEY `book_id_idx` (`book_id`),
  CONSTRAINT `fk_refers_book_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_refers_book_thread_id` FOREIGN KEY (`thread_id`) REFERENCES `thread` (`thread_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refers_book`
--

LOCK TABLES `refers_book` WRITE;
/*!40000 ALTER TABLE `refers_book` DISABLE KEYS */;
INSERT INTO `refers_book` VALUES (44,11),(46,11),(47,11),(49,11),(44,12),(46,12),(44,13),(45,13),(46,13),(50,13),(45,14),(46,14),(48,14),(50,14),(45,15),(45,16),(50,18),(50,20),(50,21),(50,22),(50,24),(50,25),(49,26),(49,27);
/*!40000 ALTER TABLE `refers_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thread`
--

DROP TABLE IF EXISTS `thread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thread` (
  `thread_id` int NOT NULL AUTO_INCREMENT,
  `community_name` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(500) DEFAULT NULL,
  `created_on` datetime NOT NULL,
  `closed_on` datetime DEFAULT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`thread_id`),
  KEY `username_idx` (`username`),
  KEY `community_name_idx` (`community_name`),
  CONSTRAINT `fk_thread_community_name` FOREIGN KEY (`community_name`) REFERENCES `community` (`community_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_thread_username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thread`
--

LOCK TABLES `thread` WRITE;
/*!40000 ALTER TABLE `thread` DISABLE KEYS */;
INSERT INTO `thread` VALUES (1,'classic-literature','Is Pride and Prejudice still relevant today?','Austen wrote Pride and Prejudice over 200 years ago, but its themes of class, marriage, and independence still feel modern. Do you think it holds up for todays readers?','2024-01-05 10:23:00',NULL,'Jude'),(2,'classic-literature','The complexity of Raskolnikov in Crime and Punishment','Dostoevsky created one of literatures most psychologically complex characters. How do you interpret Raskolnikovs motivations and his eventual redemption?','2024-01-12 14:45:00',NULL,'Simon'),(3,'sci-fi-reads','Dune vs Foundation - which world is more compelling?','Both Herbert and Asimov built incredible universes. Which do you think has the richer lore, political depth, and staying power for modern readers?','2024-01-18 09:10:00',NULL,'Jude'),(4,'sci-fi-reads','Le Guins The Left Hand of Darkness changed how I think about gender','I just finished this book and I am still processing it. The way Le Guin uses an alien society to challenge our assumptions about gender is remarkable. Anyone else feel the same?','2024-01-22 16:30:00',NULL,'Simon'),(5,'mystery-and-thriller','Best Agatha Christie novel for first time readers?','I want to get into Agatha Christie but do not know where to start. Should I go with And Then There Were None or start with a Poirot novel?','2024-02-01 11:00:00',NULL,'Simon'),(6,'mystery-and-thriller','Does the unreliable narrator still work in modern thrillers?','Gone Girl popularized the unreliable narrator in thrillers but now it feels overused. Are there any recent books that pull it off effectively?','2024-02-08 13:20:00',NULL,'Jude'),(7,'fantasy-worlds','The magic system in Sandersons Mistborn is unmatched','Sandersons allomancy is one of the most creative and internally consistent magic systems in fantasy. What other magic systems do you think come close?','2024-02-14 08:45:00',NULL,'Jude'),(8,'fantasy-worlds','Is Tolkien too slow for modern readers?','I love Lord of the Rings but I know many people bounce off it due to the pacing. Do you think Tolkiens style is a barrier to entry for new fantasy readers?','2024-02-20 17:00:00',NULL,'Simon'),(9,'poetry-corner','How do you approach reading poetry for the first time?','Poetry can feel intimidating if you are new to it. What tips or strategies helped you learn to appreciate and understand poems more deeply?','2024-03-03 12:15:00',NULL,'Jude'),(10,'poetry-corner','The confessional poetry of Sylvia Plath','Plaths raw and personal style in Ariel is unlike anything else. How do you feel about confessional poetry as a genre and does it resonate with you?','2024-03-10 15:40:00',NULL,'Simon'),(11,'book-recommendations','Looking for a book that genuinely surprised me with its ending','I have read too many predictable stories lately. Recommend me something where the ending completely recontextualized everything that came before it.','2024-03-15 09:30:00',NULL,'Simon'),(12,'book-recommendations','Best books for someone coming out of a reading slump?','I have not finished a book in months and need something that will pull me back in. Short, gripping, and hard to put down is what I am after.','2024-03-21 11:50:00',NULL,'Jude'),(13,'author-spotlights','The evolution of Cormac McCarthys writing style','From Blood Meridian to The Road, McCarthys prose changed significantly over his career. How do you see his style evolving and which era is your favorite?','2024-04-02 14:00:00','2026-05-01 18:55:22','Jude'),(14,'author-spotlights','Why is Ursula Le Guin not talked about more?','Le Guin was one of the most thoughtful and visionary writers of the 20th century. Why do you think she does not get the same mainstream recognition as her peers?','2024-04-09 10:25:00','2026-05-01 18:55:27','Simon'),(15,'reading-challenges','Anyone doing a read the classics challenge this year?','I set myself a goal to read 12 classic novels this year, one per month. Would love to find others doing the same so we can discuss as we go.','2024-04-15 08:00:00',NULL,'Jude'),(16,'reading-challenges','Halfway through my 52 books in 52 weeks challenge','I am on track so far but struggling to balance longer novels with the pace I need to keep. Anyone else doing this and how are you managing it?','2024-04-22 19:10:00',NULL,'Simon'),(17,'literary-criticism','Is death of the author a useful framework?','Barthes argued we should separate the text from its author entirely. Do you find this a helpful way to analyze literature or does authorial intent still matter to you?','2024-05-01 13:35:00',NULL,'Simon'),(18,'literary-criticism','Symbolism in Melvilles Moby Dick','The white whale means something different to almost every reader and critic. What do you think Melville intended and does it even matter at this point?','2024-05-08 16:20:00',NULL,'Jude'),(19,'debut-authors','Debut novels that blew you away','Some authors come out of nowhere with an incredible first book. Share the debut novels that shocked you with their quality and made you an instant fan.','2024-05-14 10:00:00',NULL,'Jude'),(20,'debut-authors','How do you find new debut authors before they blow up?','I love discovering authors early before they become mainstream. What sources, newsletters, or communities do you use to find promising debut writers?','2024-05-20 14:45:00',NULL,'Simon'),(21,'classic-literature','The role of fate in Oedipus Rex','Sophocles presents a world where fate is inescapable, yet Oedipus still feels responsible for his actions. Do you think the play is ultimately about destiny or free will?','2024-06-03 09:15:00',NULL,'Isaiah'),(22,'classic-literature','Is Moby Dick worth the read?','I know it has a reputation for being dense and slow. For those who have finished it, was the payoff worth the effort? What should first timers know going in?','2024-06-10 14:20:00',NULL,'Bella'),(23,'sci-fi-reads','Has any sci-fi novel accurately predicted the future?','From 1984 to Brave New World, some sci-fi feels eerily prophetic. Which novels do you think came closest to predicting the world we live in today?','2024-06-14 11:00:00',NULL,'Toby'),(24,'sci-fi-reads','Why does sci-fi struggle to win mainstream literary awards?','Despite producing some of the most imaginative and socially relevant fiction, sci-fi is often overlooked by major literary prizes. Why do you think that is?','2024-06-20 16:45:00',NULL,'Josiah'),(25,'mystery-and-thriller','Tana French vs Gillian Flynn - who does psychological thriller better?','Both authors are masters of dark, character driven crime fiction. Which do you prefer and what sets them apart from each other in your opinion?','2024-06-25 10:30:00',NULL,'Bella'),(26,'mystery-and-thriller','The rise of Scandinavian noir','From Stieg Larsson to Jo Nesbo, Nordic crime fiction has taken over the genre. What is it about Scandinavian noir that resonates so strongly with readers worldwide?','2024-07-01 13:00:00',NULL,'Isaiah'),(27,'fantasy-worlds','Does fantasy have a diversity problem?','Classic fantasy is dominated by Eurocentric settings and all white casts. Do you think the genre has made meaningful progress and what authors are leading the way?','2024-07-05 09:45:00',NULL,'Josiah'),(28,'fantasy-worlds','Standalone fantasy vs long series - which do you prefer?','Epic series like Wheel of Time are immersive but a huge commitment. Standalones are satisfying but can feel rushed. Which format do you think works better for fantasy?','2024-07-11 15:10:00',NULL,'Toby'),(29,'poetry-corner','Does poetry need to rhyme to be poetry?','Free verse has been mainstream for over a century but some readers still feel that real poetry should have rhyme and meter. Where do you stand on this debate?','2024-07-15 10:00:00',NULL,'Bella'),(30,'poetry-corner','Spoken word vs written poetry - are they the same art form?','Spoken word performances can be electrifying in a way the page cannot capture. Do you think spoken word and written poetry should be considered distinct forms?','2024-07-20 14:30:00',NULL,'Toby'),(31,'book-recommendations','Books that made you ugly cry','Share the books that completely broke you emotionally. Bonus points if it was in a public place and you had to pretend everything was fine.','2024-07-24 11:15:00',NULL,'Isaiah'),(32,'book-recommendations','What is the perfect beach read?','Summer is here and I need something fun, easy, and hard to put down. Not looking for anything too heavy. What is your go to recommendation for a beach vacation?','2024-07-30 09:00:00',NULL,'Josiah'),(33,'author-spotlights','Gabriel Garcia Marquez and the magic realism tradition','One Hundred Years of Solitude essentially defined magic realism for a generation of readers and writers. How do you see his influence showing up in contemporary literature?','2024-08-04 13:45:00',NULL,'Bella'),(34,'author-spotlights','Is Stephen King underrated as a literary writer?','King is often dismissed as a genre author but his character work and prose are genuinely exceptional. Do you think he deserves more recognition from the literary establishment?','2024-08-10 16:00:00',NULL,'Isaiah'),(35,'reading-challenges','Reading a book from every continent - share your picks','I am doing a challenge to read at least one book set on or written by an author from each continent. Would love recommendations and to hear how others approached this.','2024-08-14 08:30:00',NULL,'Toby'),(36,'reading-challenges','Has a reading challenge ever ruined reading for you?','Sometimes chasing a goal makes reading feel like a chore. Has a challenge ever backfired and taken the joy out of it? How did you get your love of reading back?','2024-08-20 12:00:00',NULL,'Josiah'),(37,'literary-criticism','Is postcolonial literary theory still useful today?','Postcolonial criticism opened up the canon in important ways but some argue it has become too prescriptive. Do you find it a useful lens for reading literature in 2024?','2024-08-24 10:15:00',NULL,'Bella'),(38,'literary-criticism','Can genre fiction be great literature?','The divide between literary fiction and genre fiction has always felt arbitrary to me. What criteria do you use to judge whether a novel rises to the level of great literature?','2024-08-30 14:50:00',NULL,'Toby'),(39,'debut-authors','Debut novels that flopped but deserved better','Not every great first novel finds its audience right away. Share debut books you think were overlooked on release and deserve a second chance in the spotlight.','2024-09-04 11:30:00',NULL,'Josiah'),(40,'debut-authors','What makes a debut novel stand out to you?','With so many new books released every year it is hard to know where to look. What qualities in a debut novel immediately grab your attention and make you want to keep reading?','2024-09-10 09:45:00',NULL,'Isaiah'),(41,'author-spotlights','Let\'s talk Tolkein','He is amazing','2026-05-01 12:52:48','2026-05-01 12:53:08','Jude'),(44,'author-spotlights','Helllo there','What is up my dudes','2026-05-01 13:45:08',NULL,'Jude'),(45,'author-spotlights','Another one again','Hello hello hello','2026-05-01 14:57:41',NULL,'Jude'),(46,'author-spotlights','Woah','Woah','2026-05-01 14:57:55',NULL,'Jude'),(47,'author-spotlights','Finally','Today!','2026-05-01 14:58:52',NULL,'Jude'),(48,'fantasy-worlds','A new thread has appeared','Hello again friend!','2026-05-01 16:26:21',NULL,'Jude'),(49,'debut-authors','Hello There','Once Again','2026-05-01 18:51:47',NULL,'Jude'),(50,'author-spotlights','dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd','Hello there. I\'m sick and tired of this dumb app','2026-05-02 12:36:57','2026-05-02 12:42:29','Becca');
/*!40000 ALTER TABLE `thread` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `hash_pass` varchar(100) NOT NULL,
  `created_on` datetime NOT NULL,
  `role` enum('admin','pleb') NOT NULL DEFAULT 'pleb',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Becca','$2b$10$aJYQlV.XUf9An7qKqL.mPeARe2kEuhSpe1fZLd8OdZ2RsUjL1AQgC','2026-05-02 12:35:54','pleb'),('Bella','$2b$10$L6MalCLf9.2gkfZQm.MFmuOKkigcnyRF.SCbhdNVTxGKqsEllsIMW','2026-04-30 12:50:09','pleb'),('Isaiah','$2b$10$UVGZxLJ/Na3JawEkRVylieZm8PRstP1dduUcNrBW6nS0vK14iOIs2','2026-04-30 12:50:04','pleb'),('Josiah','$2b$10$4uNw.Kd4sRrjhSYiu9z2juid1K2Xo2/yZCHbbhblhh4JNx6Bdn66e','2026-04-30 12:50:17','pleb'),('Jude','$2b$10$tV68cA.agWf5mK9asuiABO5SXmPivvTQje.D7sw8zzXk8nJdjWgv2','2026-04-30 07:24:06','admin'),('Simon','$2b$10$Fy4SBW5BHpmnYDNZADRg/.AqY0qw6Ltdaq4ecYcm6ZZBpxiMIVAu2','2026-04-30 07:26:08','admin'),('Toby','$2b$10$bYcdxOJ87gg74ydFsTTSouG2ZMQPWagXsXFDP08mLx8.Y/CpftXo6','2026-04-30 12:49:56','pleb');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `genre_counts`
--

/*!50001 DROP VIEW IF EXISTS `genre_counts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `genre_counts` AS select `t`.`community_name` AS `community_name`,`b`.`genre_name` AS `genre_name`,count(`b`.`book_id`) AS `total` from ((`thread` `t` join `refers_book` `r` on((`t`.`thread_id` = `r`.`thread_id`))) join `book` `b` on((`r`.`book_id` = `b`.`book_id`))) group by `t`.`community_name`,`b`.`genre_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `max_per_community`
--

/*!50001 DROP VIEW IF EXISTS `max_per_community`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `max_per_community` AS select `genre_counts`.`community_name` AS `community_name`,max(`genre_counts`.`total`) AS `max_total` from `genre_counts` group by `genre_counts`.`community_name` */;
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

-- Dump completed on 2026-05-02 15:52:08
