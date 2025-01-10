-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2025 at 04:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `szyszka`
--

-- --------------------------------------------------------

--
-- Table structure for table `skladka`
--

CREATE TABLE `skladka` (
  `id` bigint(20) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `data_wplaty` datetime(6) NOT NULL,
  `uzytkownik_id` bigint(20) NOT NULL,
  `kwota` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sprawnosc`
--

CREATE TABLE `sprawnosc` (
  `id` bigint(20) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `opis` tinytext DEFAULT NULL,
  `opis_wymagan` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sprawnosc`
--

INSERT INTO `sprawnosc` (`id`, `nazwa`, `opis`, `opis_wymagan`) VALUES
(1, 'DOBRY DUSZEK', 'Dobry duszek to zuch, który pomaga innym i niezauważenie czyni dobro.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `szostka`
--

CREATE TABLE `szostka` (
  `id` bigint(20) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `data_stworzenia` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `szostka`
--

INSERT INTO `szostka` (`id`, `nazwa`, `data_stworzenia`) VALUES
(1, 'szyszki', '2024-12-17 15:05:08.000000');

-- --------------------------------------------------------

--
-- Table structure for table `typ_uzytkownika`
--

CREATE TABLE `typ_uzytkownika` (
  `id` bigint(20) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `opis` tinytext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uczestnictwo`
--

CREATE TABLE `uczestnictwo` (
  `id` bigint(20) NOT NULL,
  `uzytkownik_id` bigint(20) NOT NULL,
  `wydarzenie_id` bigint(20) NOT NULL,
  `data_zakonczenia` datetime(6) DEFAULT NULL,
  `obecny` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uzytkownik`
--

CREATE TABLE `uzytkownik` (
  `id` bigint(20) NOT NULL,
  `imie` varchar(255) NOT NULL,
  `nazwisko` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `haslo` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `data_urodzenia` datetime(6) DEFAULT NULL,
  `nr_telefonu` varchar(255) DEFAULT NULL,
  `data_dolaczenia_do_gromady` datetime(6) DEFAULT NULL,
  `rodzic_id1` bigint(20) DEFAULT NULL,
  `rodzic_id2` bigint(20) DEFAULT NULL,
  `typ_uzytkownika` varchar(31) NOT NULL,
  `szostka_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uzytkownik`
--

INSERT INTO `uzytkownik` (`id`, `imie`, `nazwisko`, `login`, `haslo`, `email`, `data_urodzenia`, `nr_telefonu`, `data_dolaczenia_do_gromady`, `rodzic_id1`, `rodzic_id2`, `typ_uzytkownika`, `szostka_id`) VALUES
(1, 'Kacper', 'Demczyna', 'kdemcz', '1234', 'costam@gmail.com', '2025-01-08 17:59:10.000000', '123123123', '2015-01-22 17:59:10.000000', NULL, NULL, 'Druzynowy', NULL),
(2, 'Ojciec', 'Kowalski', 'okowal', '123123', 'oao@gmail.com', NULL, '123123123', NULL, NULL, NULL, 'Rodzic', NULL),
(3, 'Matka', 'Kowalski', 'mkowal', '123123', 'oao@gmail.com', NULL, '123123123', NULL, NULL, NULL, 'Rodzic', NULL),
(5, 'Anna', 'Nowak', 'anowak', '123', NULL, NULL, NULL, NULL, NULL, NULL, 'Zuch', NULL),
(6, 'Franek', 'Nowak', 'anowakowska', '123', NULL, NULL, NULL, '2025-01-10 12:00:00.000000', NULL, NULL, 'Zuch', NULL),
(8, 'Adam', 'Nowak', 'anowakoa', '123', NULL, NULL, NULL, NULL, NULL, NULL, 'Druzynowy', NULL),
(9, 'Adam', 'Nowak', 'aansaasmma', '123', NULL, NULL, NULL, NULL, NULL, NULL, 'Rodzic', NULL),
(10, 'Adam', 'Nowak', 'bnasm,asmma', '123', NULL, NULL, NULL, NULL, NULL, NULL, 'Przyboczny', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `wydarzenie`
--

CREATE TABLE `wydarzenie` (
  `id` bigint(20) NOT NULL,
  `nazwa` varchar(255) NOT NULL,
  `data_wyjazdu` datetime(6) NOT NULL,
  `data_zakonczenia` datetime(6) NOT NULL,
  `opis` tinytext DEFAULT NULL,
  `organizator_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zdobyte_sprawnosci`
--

CREATE TABLE `zdobyte_sprawnosci` (
  `id` bigint(20) NOT NULL,
  `uzytkownik_id` bigint(20) NOT NULL,
  `sprawnosc_id` bigint(20) NOT NULL,
  `data_zdobycia_sprawnosci` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `skladka`
--
ALTER TABLE `skladka`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uzytkownik_id` (`uzytkownik_id`);

--
-- Indexes for table `sprawnosc`
--
ALTER TABLE `sprawnosc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `szostka`
--
ALTER TABLE `szostka`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `typ_uzytkownika`
--
ALTER TABLE `typ_uzytkownika`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uczestnictwo`
--
ALTER TABLE `uczestnictwo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uzytkownik_id` (`uzytkownik_id`),
  ADD KEY `wydarzenie_id` (`wydarzenie_id`);

--
-- Indexes for table `uzytkownik`
--
ALTER TABLE `uzytkownik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `rodzic_id1` (`rodzic_id1`),
  ADD KEY `rodzic_id2` (`rodzic_id2`),
  ADD KEY `szostka_id` (`szostka_id`);

--
-- Indexes for table `wydarzenie`
--
ALTER TABLE `wydarzenie`
  ADD PRIMARY KEY (`id`),
  ADD KEY `organizator_id` (`organizator_id`);

--
-- Indexes for table `zdobyte_sprawnosci`
--
ALTER TABLE `zdobyte_sprawnosci`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uzytkownik_id` (`uzytkownik_id`,`sprawnosc_id`),
  ADD KEY `sprawnosc_id` (`sprawnosc_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `skladka`
--
ALTER TABLE `skladka`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sprawnosc`
--
ALTER TABLE `sprawnosc`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `szostka`
--
ALTER TABLE `szostka`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `typ_uzytkownika`
--
ALTER TABLE `typ_uzytkownika`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uczestnictwo`
--
ALTER TABLE `uczestnictwo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uzytkownik`
--
ALTER TABLE `uzytkownik`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `wydarzenie`
--
ALTER TABLE `wydarzenie`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zdobyte_sprawnosci`
--
ALTER TABLE `zdobyte_sprawnosci`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `skladka`
--
ALTER TABLE `skladka`
  ADD CONSTRAINT `skladka_ibfk_1` FOREIGN KEY (`uzytkownik_id`) REFERENCES `uzytkownik` (`id`);

--
-- Constraints for table `uczestnictwo`
--
ALTER TABLE `uczestnictwo`
  ADD CONSTRAINT `uczestnictwo_ibfk_1` FOREIGN KEY (`uzytkownik_id`) REFERENCES `uzytkownik` (`id`),
  ADD CONSTRAINT `uczestnictwo_ibfk_2` FOREIGN KEY (`wydarzenie_id`) REFERENCES `wydarzenie` (`id`);

--
-- Constraints for table `uzytkownik`
--
ALTER TABLE `uzytkownik`
  ADD CONSTRAINT `uzytkownik_ibfk_1` FOREIGN KEY (`rodzic_id1`) REFERENCES `uzytkownik` (`id`),
  ADD CONSTRAINT `uzytkownik_ibfk_2` FOREIGN KEY (`rodzic_id2`) REFERENCES `uzytkownik` (`id`),
  ADD CONSTRAINT `uzytkownik_ibfk_3` FOREIGN KEY (`szostka_id`) REFERENCES `szostka` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `wydarzenie`
--
ALTER TABLE `wydarzenie`
  ADD CONSTRAINT `wydarzenie_ibfk_1` FOREIGN KEY (`organizator_id`) REFERENCES `uzytkownik` (`id`);

--
-- Constraints for table `zdobyte_sprawnosci`
--
ALTER TABLE `zdobyte_sprawnosci`
  ADD CONSTRAINT `zdobyte_sprawnosci_ibfk_1` FOREIGN KEY (`uzytkownik_id`) REFERENCES `uzytkownik` (`id`),
  ADD CONSTRAINT `zdobyte_sprawnosci_ibfk_2` FOREIGN KEY (`sprawnosc_id`) REFERENCES `sprawnosc` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
