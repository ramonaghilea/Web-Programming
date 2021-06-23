<?php

header('Access-Control-Allow-Origin: *');

//session_start();

// connect to the database
$conn = new mysqli("localhost", "root", "", "logreports");
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

//$userId = $_SESSION["id"];
//
//$type = $_GET["type"];
//$severity = $_GET["severity"];


    $query = "SELECT * FROM logreports.logreports";
    $statement = $conn->prepare($query);
    $statement->execute();
    $queryResult = $statement->get_result();


$logs = array();

//while ($row = mysqli_fetch_array($queryResult)) {

while($row = $queryResult->fetch_assoc()) {
    $log = array();
    array_push($log, $row["logId"]);
    array_push($log, $row["type"]);
    array_push($log, $row["severity"]);
    array_push($log, $row["dateOfLog"]);
    array_push($log, $row["userId"]);
    array_push($log, $row["message"]);

    array_push($logs, $log);
}

echo json_encode($logs);

$conn->close();

?>
