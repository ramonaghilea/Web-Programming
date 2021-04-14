
<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Log</title>
    <link rel="stylesheet" type="text/css" href="../style/main.css">
</head>

<body>
<div class="container-main container-login">
    <div class="wrap-main wrap-login">

        <form class="form-main form-login" action="../PHP/updateLog.php" method="post">
            <span class="title-main">
                Update Log
            </span>


            <?php
            if (isset($_GET['pageno'])) {
                $pageno = $_GET['pageno'];
            } else {
                $pageno = 1;
            }
            $no_of_records_per_page = 4;
            $offset = ($pageno-1) * $no_of_records_per_page;

            $conn = new mysqli("localhost", "root", "", "logreports");
            if ($conn->connect_error)
            {
                die("Connection failed: " . $conn->connect_error);
            }

            $userId = $_SESSION['id'];

            $total_pages_sql = "SELECT COUNT(*) FROM logreports.logreports WHERE userId = '$userId'";
            $result = mysqli_query($conn, $total_pages_sql);
            $total_rows = mysqli_fetch_array($result)[0];
            $total_pages = ceil($total_rows / $no_of_records_per_page);

            $query = "SELECT * FROM logreports.logreports WHERE userId = '$userId' LIMIT $offset, $no_of_records_per_page";
            $result = mysqli_query($conn, $query);

            if(mysqli_num_rows($result)>0){
                echo "<table class='table'>";
                echo "<tr>";
                echo "<th>LogId</th>";
                echo "<th>Type</th>";
                echo "<th>Severity</th>";
                echo "<th>Date</th>";
                echo "<th>Message</th>";
                echo "</tr>";
                while ($row = mysqli_fetch_array($result)){
                    echo "<tr>";
                    echo "<th>".$row['logId']."</th>";
                    echo "<th>".$row['type']."</th>";
                    echo "<th>".$row['severity']."</th>";
                    echo "<th>".$row['dateOfLog']."</th>";
                    echo "<th>".$row['message']."</th>";
                    echo "</tr>";
                }
                echo "</table>";
            }

            $conn->close();
            ?>

            <div class="pagination">
                <button class='pages'><a href="?pageno=1">First</a></button>&emsp;
                <button class="pages <?php if($pageno <= 1){ echo 'disabled'; } ?>">
                    <a href="<?php if($pageno <= 1){ echo '#'; } else { echo "?pageno=".($pageno - 1); } ?>">Prev</a>
                </button>&emsp;
                <button class="pages <?php if($pageno >= $total_pages){ echo 'disabled'; } ?>">
                    <a href="<?php if($pageno >= $total_pages){ echo '#'; } else { echo "?pageno=".($pageno + 1); } ?>">Next</a>
                </button>&emsp;
                <button class='pages'><a href="?pageno=<?php echo $total_pages; ?>">Last</a></button>&emsp;
            </div>


            <span class="subtitle-main">
                Log Id
            </span>
            <div class="wrap-input">
                <input class="input" type="text" name="logid" placeholder="Log Id">
            </div>

            <span class="subtitle-main">
                Type
            </span>
            <div class="wrap-input">
                <input class="input" type="text" name="type" placeholder="Type">
            </div>

            <span class="subtitle-main">
                Severity
            </span>
            <div class="wrap-input">
                <input class="input" type="text" name="severity" placeholder="Severity">
            </div>

            <span class="subtitle-main">
                Date
            </span>
            <div class="wrap-input">
                <input class="input" type="date" name="date" placeholder="Date">
            </div>

            <span class="subtitle-main">
                Message
            </span>
            <div class="wrap-input">
                <input class="input" type="text" name="message" placeholder="Message">
            </div>


            <div class="wrap-button">
                <button class="button" type="submit">Update</button>
            </div>
        </form>

        <div class="homepage-button">
            <button class="button" type="submit">
                <a href="homepageMain.php">Homepage</a>
            </button>
        </div>

    </div>
</div>

</body>
</html>