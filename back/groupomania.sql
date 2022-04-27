-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 27 avr. 2022 à 02:09
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `texte` text NOT NULL,
  `id_post` int(11) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id_post` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `titre` varchar(40) NOT NULL,
  `texte` varchar(255) NOT NULL,
  `media` varchar(255) NOT NULL,
  `date_add` datetime NOT NULL,
  `date_update` datetime NOT NULL,
  PRIMARY KEY (`id_post`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id_post`, `id_user`, `titre`, `texte`, `media`, `date_add`, `date_update`) VALUES
(1, 25, 'jjj', 'aaaa', '', '2022-04-26 01:24:00', '2022-04-26 01:24:00'),
(2, 25, 'test', 'lundi c ava ', 'Capture_d’écran_2022-03-28_211108.png1650929078537.png', '2022-04-26 01:24:38', '2022-04-26 01:24:38'),
(3, 31, 'test', 'jour 2', 'Capture_d’écran_2022-04-15_182812.png1650929395252.png', '2022-04-26 01:29:55', '2022-04-26 01:29:55'),
(4, 31, 'testgggggg', 'kkkkkkk', 'Capture_d’écran_2022-03-28_211108.png1650932813375.png', '2022-04-26 02:26:53', '2022-04-26 02:26:53'),
(5, 31, 'aaaaaaaa', 'zzzzzzzzzz', '', '2022-04-26 02:35:48', '2022-04-26 02:35:48'),
(6, 31, 'testaaaaaaaaaaaaaaaaaa', 'sssssssssssssss', '', '2022-04-27 03:44:37', '2022-04-27 03:44:37'),
(7, 31, 'essais', 'teste', 'Capture_d’écran_2022-03-28_211108.png1651023907521.png', '2022-04-27 03:45:07', '2022-04-27 03:45:07'),
(8, 31, '', '', '', '2022-04-27 03:56:00', '2022-04-27 03:56:00'),
(9, 31, 'ss', 's', '', '2022-04-27 03:57:19', '2022-04-27 03:57:19');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `isActif` tinyint(1) NOT NULL,
  `date_add` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_update` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `isAdmin`, `isActif`, `date_add`, `date_update`) VALUES
(25, 'Amine Derbal', 'a.derbal@e-enfance.org', '$2b$10$iLQ.qyx9usd6AEN47mZMkezi5uZNNY5QaGBXVYWpc1V2NpOHqHOIW', 0, 0, '2022-04-22 01:39:13', '2022-04-22 01:39:13'),
(26, 'Amine Derbal', 'a.derbal@e-enfance.fr', '$2b$10$2keIhFGwQKi8S7ctp80bq.NjO2WSK0.G3//Gpkvw4i4GWbVVayr.y', 0, 0, '2022-04-22 01:57:45', '2022-04-22 01:57:45'),
(30, 'toto', 'muhammadderbal@outlook.com', '$2b$10$Zc0j/AnHeTVFB3hq.QSTQe4bAtRjDarnAcmtBRYFAF2pqQ10AiaI.', 0, 0, '2022-04-22 15:36:52', '2022-04-22 15:36:52'),
(28, 'toto', 'test4@test.com', '$2b$10$HgpyJDja8LNFmsCh/9wWXOvZxyzoyzAHifzBNs4uk0uV4kPOxS86a', 0, 0, '2022-04-22 04:13:06', '2022-04-22 04:13:06'),
(31, 'tata', 'admin@gm.com', '$2b$10$DZeqvpD5W46dJ9U9gwjumuVlSJBsevqXyw2vFghkGI6JQJV/Izq7W', 1, 0, '2022-04-22 15:43:29', '2022-04-22 15:43:29');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
