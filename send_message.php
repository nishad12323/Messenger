<?php
// Database connection
$servername = "sql202.infinityfree.com";
$username = "if0_38280584";
$password = "oxPjv99J26aVO9";
$dbname = "if0_38280584_messages";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle message sending
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sender_id = $_POST['sender_id'];
    $receiver_id = $_POST['receiver_id'];
    $message_text = $_POST['message_text'];

    $stmt = $conn->prepare("INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $sender_id, $receiver_id, $message_text);

    if ($stmt->execute()) {
        echo "Message sent!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
