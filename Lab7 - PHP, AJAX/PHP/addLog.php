<?php
session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // connect to the database
    $conn = new mysqli("localhost", "root", "", "logreports");
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";
    $userId = $_SESSION["id"];

    $type = $_POST["type"];
    $severity = $_POST["severity"];
    $date = $_POST["date"];
    $message = $_POST["message"];

    $query = "INSERT INTO logreports.logreports(type, severity, dateOfLog, userId, message) VALUES ('$type','$severity', '$date', '$userId','$message')";
    $queryResult = $conn->query($query);

    // close the database connection
    $conn->close();
}

return header("location: ../pages/addPage.php");

?>