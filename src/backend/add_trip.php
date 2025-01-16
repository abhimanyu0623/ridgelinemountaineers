<?php
include 'db_connect.php';

$title = $_POST['title'];
$description = $_POST['description'];
$location = $_POST['location'];
$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];
$price = $_POST['price'];
$image_url = $_POST['image_url'];

$sql = "INSERT INTO trips (title, description, location, start_date, end_date, price, image_url)
        VALUES ('$title', '$description', '$location', '$start_date', '$end_date', '$price', '$image_url')";

if ($conn->query($sql) === TRUE) {
    echo "Trip added successfully!";
} else {
    echo "Error: " . $conn->error;
}
?>
