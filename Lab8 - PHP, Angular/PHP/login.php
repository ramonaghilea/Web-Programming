<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
//header('Access-Control-Allow-Origin: http://localhost:8080');
//header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST,GET');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
//header('Content-Type: application/json');
// enable CORS - required for Angular UI
//header("Access-Control-Allow-Origin: *");
//header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

//add_header('Access-Control-Allow-Origin', 'http://localhost:8080', always);

session_start();

$username = $password = "";
$databaseUsername = $databasePassword = "";
$userId = "";
$usernameError = $passwordError = "";

//if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // connect to the database
    $conn = new mysqli("localhost", "root", "", "logreports");
    if ($conn->connect_error)
    {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";
//
//     check if the user credentials are in the database
//     take the credentials from the input fields
//    $data = file_get_contents("php://input");
//    $data = json_decode($data);
//
//    $username = $data->username;
//    $password = $data->password;
//    echo $username;
//    echo $password;

    $username = $_GET['username'];
    $password = $_GET['password'];

//    $username = "anna";
//    $password = "anna12";
//
//    echo $username;
//    echo $password;

//    echo '<script>';
//    echo 'console.log('. json_encode( $username ) .')';
//    echo 'console.log('. json_encode( 'heii' ) .')';
//    echo '</script>';

//    $query = "SELECT id, usernameString, passwordString FROM logreports.users where usernameString = '$username' LIMIT 1";
//    $queryResult = $conn->query($query);

    // prepared statement
    $query = "SELECT id, usernameString, passwordString FROM logreports.users where usernameString = ? LIMIT 1";
    $statement = $conn->prepare($query);
    $statement->bind_param("s", $username);
    $statement->execute();
    $queryResult = $statement->get_result();

    if($queryResult)
    {
//        $row = mysqli_fetch_row($queryResult);

//        $row = $queryResult->fetch_assoc();
//        $userId= $row['id'];
//        $databaseUsername = $row['usernameString'];
//        $databasePassword= $row['passwordString'];

        $row = $queryResult->fetch_row();
        $userId= $row[0];
        $databaseUsername = $row[1];
        $databasePassword= $row[2];
    }

    if($username == $databaseUsername && $password == $databasePassword)
    {
        // if the credentials are correct, set the session variables
//        $_SESSION["username"] = $username;
        $_SESSION["id"] = $userId;
        echo json_encode($userId);
        // redirect the user to the homepage
//        header("Location: http://localhost:4200/homepage");
//        exit();

//        echo 'true';
    }
    else
    {
        echo json_encode('100');
        $userId = 100;
    }

    // close the database connection
    $conn->close();

    echo json_encode($userId);
//}


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