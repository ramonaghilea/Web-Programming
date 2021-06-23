<?php
header('Access-Control-Allow-Origin: *');

session_start();

// connect to the database
$conn = new mysqli("localhost", "root", "", "logreports");
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

$userId = $_GET["userId"];

$type = $_GET["type"];
$severity = $_GET["severity"];

if ($type == "") {
    $query = "SELECT * FROM logreports.logreports WHERE userId = ?
            AND severity = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param("ss", $userId, $severity);
    $statement->execute();
    $queryResult = $statement->get_result();
}
elseif ($severity == "") {
    $query = "SELECT * FROM logreports.logreports WHERE userId = ?
            AND type = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param("ss", $userId, $type);
    $statement->execute();
    $queryResult = $statement->get_result();
}
else {
    $query = "SELECT * FROM logreports.logreports WHERE userId = ?
                AND type = ? AND severity = ?";
    $statement = $conn->prepare($query);
    $statement->bind_param("sss", $userId, $type, $severity);
    $statement->execute();
    $queryResult = $statement->get_result();
}

$logs = array();

//while ($row = mysqli_fetch_array($queryResult)) {

while($row = $queryResult->fetch_assoc()) {
    $log = array();
    array_push($log, $row["logId"]);
    array_push($log, $row["type"]);
    array_push($log, $row["severity"]);
    array_push($log, $row["dateOfLog"]);
    array_push($log, $row["message"]);

    array_push($logs, $log);
}

echo json_encode($logs);

$conn->close();

?>