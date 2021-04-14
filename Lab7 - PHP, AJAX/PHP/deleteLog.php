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

    $logId = $_POST["logid"];

    $query = "DELETE FROM logreports.logreports WHERE logId = '$logId'";
    $queryResult = $conn->query($query);

    // close the database connection
    $conn->close();
}

return header("location: ../pages/deletePage.php");

?>