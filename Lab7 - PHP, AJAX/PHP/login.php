
<?php

session_start();

$username = $password = "";
$databaseUsername = $databasePassword = "";
$userId = "";
$usernameError = $passwordError = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // connect to the database
    $conn = new mysqli("localhost", "root", "", "logreports");
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";

    // check if the user credentials are in the database
    $username = $_POST["username"];
    $password = $_POST["password"];

    $query = "SELECT id, usernameString, passwordString FROM logreports.users where usernameString = '$username' LIMIT 1";
    $queryResult = $conn->query($query);
    if($queryResult)
    {
        $row = mysqli_fetch_row($queryResult);
        $userId= $row[0];
        $databaseUsername = $row[1];
        $databasePassword= $row[2];
    }

    if($username == $databaseUsername && $password == $databasePassword)
    {
        // if the credentials are correct, set the session variables
        $_SESSION["username"] = $username;
        $_SESSION["id"] = $userId;

        // redirect the user to the homepage
        header("Location: ../pages/homepageMain.php");
    }
    else
    {
        echo "Incorrect credentials";
    }

    // close the database connection
    $conn->close();
}


//    if (empty($_POST["username"])) {
//        $usernameError = "Username is required";
//    } else {
//        $username = test_input($_POST["username"]);
//    }
//
//    if (empty($_POST["password"])) {
//        $passwordError = "Password is required";
//    } else {
//        $password = test_input($_POST["password"]);
//    }


//$_SESSION["username"] = $username;
//
//function test_input($data) {
//    $data = trim($data);
//    $data = stripslashes($data);
//    $data = htmlspecialchars($data);
//    return $data;
//}


?>
