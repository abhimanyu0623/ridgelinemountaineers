<?php
include 'db_connect.php';
header('Content-Type: application/json');

$id = isset($_GET['id']) ? intval($_GET['id']) : 0; // Ensure id is safe and valid

if ($id === 0) {
    echo json_encode(['error' => 'Invalid trip ID']);
    exit;
}

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
        h.history,
        o.paragraph,
        o.excitement,
        g.image_url AS gallery_image,
        i.day_number,
        i.title AS itinerary_title,
        i.distance,
        i.height_gain,
        i.image_url AS itinerary_image,
        i.schedule,
        i.description AS itinerary_description,
        g.caption
    FROM 
        trips t
    LEFT JOIN 
        trip_history h ON t.id = h.trip_id
    LEFT JOIN 
        trip_overview o ON t.id = o.trip_id
    LEFT JOIN 
        trip_gallery g ON t.id = g.trip_id
    LEFT JOIN 
        trip_long_itinerary i ON t.id = i.trip_id
    WHERE 
        t.status = 1 AND t.id = $id
    ORDER BY 
        i.day_number;
";

$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $tripDetails = [];

    while ($row = $result->fetch_assoc()) {
        $trip_id = $row['trip_id'];

        // Initialize trip only once
        if (!isset($tripDetails[$trip_id])) {
            $tripDetails[$trip_id] = [
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
                'itinerary' => [],
                'history' => $row['history'],
                'paragraph' => $row['paragraph'],
                'excitement' => $row['excitement'],
                'image_url' => [],
                'caption' => $row['caption'],
            ];
        }

        // Add unique itinerary entries
        $itineraryEntry = [
            'day_number' => $row['day_number'],
            'itinerary_title' => $row['itinerary_title'],
            'distance' => $row['distance'],
            'height_gain' => $row['height_gain'],
            'schedule' => $row['schedule'],
            'itinerary_image' => $row['itinerary_image'],
            'description' => $row['itinerary_description']
        ];
        if ($row['day_number'] && !in_array($itineraryEntry, $tripDetails[$trip_id]['itinerary'])) {
            $tripDetails[$trip_id]['itinerary'][] = $itineraryEntry;
        }

        // Add unique gallery images
        if (!empty($row['gallery_image']) && !in_array($row['gallery_image'], $tripDetails[$trip_id]['image_url'])) {
            $tripDetails[$trip_id]['image_url'][] = $row['gallery_image'];
        }
    }

    // Return trip details
    echo json_encode(array_values($tripDetails));
} else {
    echo json_encode(['message' => 'No trip details found']);
}

$conn->close();
?>
