<?php
// Connect to the database
$host = "localhost";
$username = "root";
$password = "";
$dbname = "guessbase";

$conn = mysqli_connect($host, $username, $password);

if (!$conn) {
    die('Could not connect: ' . mysql_error());
}

$sql = "CREATE DATABASE IF NOT EXISTS guessbase;";
$conn->query($sql);
$conn -> select_db($dbname);

?>