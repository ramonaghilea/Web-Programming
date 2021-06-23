<?php

header('Access-Control-Allow-Origin: *');


    // connect to the database
    $conn = new mysqli("localhost", "root", "", "logreports");
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";
//    $userId = $_SESSION["id"];

    $userId = $_GET["userId"];
    $logId = $_GET["logId"];

//    $query = "DELETE FROM logreports.logreports WHERE logId = '$logId'";
//    $queryResult = $conn->query($query);

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
            $query = "DELETE FROM logreports.logreports WHERE logId = ?";
            $statement = $conn->prepare($query);
            $statement->bind_param("s", $logId);
            $statement->execute();
            $queryResult = $statement->get_result();

            // close the database connection
            $conn->close();

            echo "deleted element";
        }
    }
    else {
        echo "The log id does not exist";
    }

//    $query = "DELETE FROM logreports.logreports WHERE logId = ?";
//    $statement = $conn->prepare($query);
//    $statement->bind_param("s", $logId);
//    $statement->execute();
//    $queryResult = $statement->get_result();
//
//    // close the database connection
//    $conn->close();
//
//    echo "deleted element"

?>