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
    $userId = $_GET["userId"];

    $logId = $_GET["logId"];
    $type = $_GET["type"];
    $severity = $_GET["severity"];
    $date = $_GET["date"];
    $message = $_GET["message"];

    // check if the logId belongs to the current user
    $query = "SELECT userId FROM logreports.logreports where logId = ? LIMIT 1";
    $statement = $conn->prepare($query);
    $statement->bind_param("s", $logId);
    $statement->execute();
    $queryResult = $statement->get_result();

    if($queryResult)
    {
        $row = $queryResult->fetch_row();
        $userIdDatabase = $row[0];
        if(!$userIdDatabase == $userId)
        {
            echo "Invalid delete";
        }
        else{
            $query = "UPDATE logreports.logreports
        SET type = ?, severity = ?, dateOfLog = ?, userId = ?, message = ?
        WHERE logId = ?";
            $statement = $conn->prepare($query);
            $statement->bind_param("ssssss", $type, $severity, $date, $userId, $message, $logId);
            $statement->execute();
            $queryResult = $statement->get_result();

            // close the database connection
            $conn->close();

            echo "updated element";
        }
    }
    else {
        echo "The log id does not exist";
    }

//    $query = "UPDATE logreports.logreports
//        SET type = '$type', severity = '$severity', dateOfLog = '$date', userId = '$userId', message = '$message'
//        WHERE logId = '$logId'";
//    $queryResult = $conn->query($query);

//    $query = "UPDATE logreports.logreports
//        SET type = ?, severity = ?, dateOfLog = ?, userId = ?, message = ?
//        WHERE logId = ?";
//    $statement = $conn->prepare($query);
//    $statement->bind_param("ssssss", $type, $severity, $date, $userId, $message, $logId);
//    $statement->execute();
//    $queryResult = $statement->get_result();
//
//    // close the database connection
//    $conn->close();

?>