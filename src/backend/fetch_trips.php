<?php
include 'db_connect.php';
header('Content-Type: application/json');

$sql = "
        SELECT 
            t.id AS trip_id,
            t.title,
            t.start_from,
            t.end_to,
            t.start_datetime,
            t.end_datetime,
            t.duration,
            t.price,
            t.image,
            t.created_at,
            t.status,
            i.day_number,
            i.from_location,
            i.to_location,
            i.drive_distance,
            i.height,
            i.time_taken,
            i.description AS itinerary_description
        FROM 
            trips t
        LEFT JOIN 
            trip_itinerary i 
        ON 
            t.id = i.trip_id
        WHERE 
            t.status = 1
        ORDER BY 
            t.id, i.day_number;
    ";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $trips = [];
    
    while ($row = $result->fetch_assoc()) {
        $trip_id = $row['trip_id'];
        
        if (!isset($trips[$trip_id])) {
            $trips[$trip_id] = [
                'id' => $row['trip_id'],
                'title' => $row['title'],
                'start_from' => $row['start_from'],
                'end_to' => $row['end_to'],
                'start_datetime' => $row['start_datetime'],
                'end_datetime' => $row['end_datetime'],
                'duration' => $row['duration'],
                'price' => $row['price'],
                'image' => $row['image'],
                'created_at' => $row['created_at'],
                'itinerary' => []
            ];
        }
        
        if ($row['day_number']) {
            $trips[$trip_id]['itinerary'][] = [
                'day_number' => $row['day_number'],
                'from_location' => $row['from_location'],
                'to_location' => $row['to_location'],
                'drive_distance' => $row['drive_distance'],
                'height' => $row['height'],
                'time_taken' => $row['time_taken'],
                'description' => $row['itinerary_description']
            ];
        }
    }
    
    $trips = array_values($trips);

    echo json_encode($trips);
} else {
    echo json_encode([]);
}

$conn->close();
?>
