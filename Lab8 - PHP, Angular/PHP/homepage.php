<?php header('Access-Control-Allow-Origin: *'); ?>

<?php

session_start();

if (isset($_SESSION["id"]))
{
    $userId = $_SESSION["id"];
    $username = $_SESSION["username"];

    // connect to the database
    $conn = new mysqli("localhost", "root", "", "logreports");
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }


    $typeOfTable = "all";

    // all logs reports
    if ($typeOfTable == "all")
    {
        $query = "SELECT * FROM logreports.logreports";
        $queryResult = $conn->query($query);
        if($queryResult)
        {
            echo "<table>";
            echo "<tr>";
            echo "<th>LogId</th>";
            echo "<th>Type</th>";
            echo "<th>Severity</th>";
            echo "<th>Date</th>";
            echo "<th>UserId</th>";
            echo "<th>Message</th>";
            echo "<tr>";

            while ($row = mysqli_fetch_array($queryResult)){
                echo "<tr>";
                echo "<td>".$row["logId"]."</td>";
                echo "<td>".$row["type"]."</td>";
                echo "<td>".$row["severity"]."</td>";
                echo "<td>".$row["dateOfLog"]."</td>";
                echo "<td>".$row["userId"]."</td>";
                echo "<td>".$row["message"]."</td>";
                echo "</tr>";
            }
            echo "</table>";
        }
    }
    elseif ($typeOfTable == "one")
    {
        $query = "SELECT * FROM logreports.logreports where usernameString = '$username'";
        $queryResult = $conn->query($query);
        if($queryResult)
        {
            $row = mysqli_fetch_row($queryResult);
            $userId= $row[0];
            $databaseUsername = $row[1];
            $databasePassword= $row[2];
        }
    }

    $conn->close();
}
else
{
    header("Location: ../pages/login.html");
    die();
}

?>