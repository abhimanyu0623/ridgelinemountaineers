<?php
header("Access-Control-Allow-Origin: *");

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "ridgelinemountaineers"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
