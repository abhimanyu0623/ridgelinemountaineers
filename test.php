<?php
$servername = "localhost";
$username = "root";
$password = ""; // Default for XAMPP
$dbname = "ridgelinemountaineers"; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connection successful!<br>";
}

// Test simple query
$sql = "SELECT * FROM trips";
$result = $conn->query($sql);

if (!$result) {
    echo "Error running query: " . $conn->error;
    exit();
}

$trips = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $trips[] = $row;
    }
    echo json_encode($trips);
} else {
    echo "No data found in trips table.";
}

$conn->close();
?>
