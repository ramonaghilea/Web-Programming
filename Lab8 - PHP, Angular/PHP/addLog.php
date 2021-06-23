<?php

header('Access-Control-Allow-Origin: *');

session_start();

    // connect to the database
    $conn = new mysqli("localhost", "root", "", "logreports");
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";
//    $userId = $_SESSION["id"];

    $userId = $_GET["userId"];

    $type = $_GET["type"];
    $severity = $_GET["severity"];
    $date = $_GET["date"];
    $message = $_GET["message"];

//    $query = "INSERT INTO logreports.logreports(type, severity, dateOfLog, userId, message) VALUES ('$type','$severity', '$date', '$userId','$message')";
//    $queryResult = $conn->query($query);

    $query = "INSERT INTO logreports.logreports(type, severity, dateOfLog, userId, message) VALUES (?, ?, ?, ?, ?)";
    $statement = $conn->prepare($query);
    $statement->bind_param("sssss", $type, $severity, $date, $userId, $message);
    $statement->execute();
    $queryResult = $statement->get_result();

    // close the database connection
    $conn->close();

//return header("location: ../pages/addPage.php");

?>