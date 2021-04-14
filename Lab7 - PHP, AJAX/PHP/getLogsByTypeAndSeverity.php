<?php
session_start();


// connect to the database
$conn = new mysqli("localhost", "root", "", "logreports");
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

$userId = $_SESSION["id"];

$type = $_GET["type"];
$severity = $_GET["severity"];

if ($type == "")
    $query = "SELECT * FROM logreports.logreports WHERE userId = '$userId'
            AND severity = '$severity'";
elseif ($severity == "")
    $query = "SELECT * FROM logreports.logreports WHERE userId = '$userId'
            AND type = '$type'";
else
    $query = "SELECT * FROM logreports.logreports WHERE userId = '$userId'
                AND type = '$type' AND severity = '$severity'";

$queryResult = $conn->query($query);

$logs = array();

while ($row = mysqli_fetch_array($queryResult)) {
    $log = array();
    array_push($log, $row["type"]);
    array_push($log, $row["severity"]);
    array_push($log, $row["dateOfLog"]);
    array_push($log, $row["message"]);

    array_push($logs, $log);
}

echo json_encode($logs);

$conn->close();

?>