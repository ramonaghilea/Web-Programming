<?php
//
//// enable CORS - required for Angular UI
//header("Access-Control-Allow-Origin: *");
//
//// connect to the database
//$conn = new mysqli("localhost", "root", "", "logreports");
//if ($conn->connect_error)
//{
//    die("Connection failed: " . $conn->connect_error);
//}
//
//$query = "SELECT * FROM logreports.users";
//$queryResult = $conn->query($query);
//
//$students = array();
//while($row = $queryResult->fetch_row()) {
//    $stud = array();
//    array_push($stud, $row['username']);
//    array_push($stud, $row['password']);
//
//    array_push($students, $stud);
//}
//
//echo json_encode($students);