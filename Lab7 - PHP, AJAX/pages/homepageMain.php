<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Homepage</title>
    <link rel="stylesheet" type="text/css" href="../style/main.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="../scripts/script.js"></script>
</head>

<body>
<div class="container-main container-login">
    <div class="wrap-main wrap-login">

            <span class="title-main">
                Log Reports
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

        $total_pages_sql = "SELECT COUNT(*) FROM logreports.logreports ";
        $result = mysqli_query($conn, $total_pages_sql);
        $total_rows = mysqli_fetch_array($result)[0];
        $total_pages = ceil($total_rows / $no_of_records_per_page);

        $query = "SELECT * FROM logreports.logreports LIMIT $offset, $no_of_records_per_page";
        $result = mysqli_query($conn, $query);

        if(mysqli_num_rows($result)>0){
            echo "<table class='table'>";
            echo "<tr>";
            echo "<th>LogId</th>";
            echo "<th>Type</th>";
            echo "<th>Severity</th>";
            echo "<th>Date</th>";
            echo "<th>UserId</th>";
            echo "<th>Message</th>";
            echo "</tr>";
            while ($row = mysqli_fetch_array($result)){
                echo "<tr>";
                echo "<th>".$row['logId']."</th>";
                echo "<th>".$row['type']."</th>";
                echo "<th>".$row['severity']."</th>";
                echo "<th>".$row['dateOfLog']."</th>";
                echo "<th>".$row['userId']."</th>";
                echo "<th>".$row['message']."</th>";
                echo "</tr>";
            }
            echo "</table>";
        }

        $conn->close();
        ?>

        <div class="pagination">
            <button class='pages'>
                <a href="?pageno=1">First</a>
            </button>&emsp;
            <button class="pages <?php if($pageno <= 1){ echo 'disabled'; } ?>">
                <a href="<?php if($pageno <= 1){ echo '#'; } else { echo "?pageno=".($pageno - 1); } ?>">Prev</a>
            </button>&emsp;
            <button class="pages <?php if($pageno >= $total_pages){ echo 'disabled'; } ?>">
                <a href="<?php if($pageno >= $total_pages){ echo '#'; } else { echo "?pageno=".($pageno + 1); } ?>">Next</a>
            </button>&emsp;
            <button class='pages'>
                <a href="?pageno=<?php echo $total_pages; ?>">Last</a>
            </button>&emsp;
        </div>
<!--        <div id="logsTable">-->
<!--            </div>-->

        <div class="wrap-button">
            <input class ="button" type="button" onclick="location.href='addPage.php'" value="Add Log">
<!--                <button class="button">-->
<!--                    <a href="./addPage.php" value="""Add Log"></a>-->
<!--                </button>-->
        </div>

        <div class="wrap-button">
            <input class ="button" type="button" onclick="location.href='updatePage.php'" value="Update Log">
        </div>

        <div class="wrap-button">
            <input class ="button" type="button" onclick="location.href='deletePage.php'" value="Delete Log">
        </div>

        <div class="wrap-button">
            <input class ="button" type="button" onclick="location.href='filterPage.html'" value="Filter Logs">
<!--            <form action="">-->
<!--                <button class="button" id="buttonAll" onclick="displayAllLogs()">Display all log reports</button>-->
<!--            </form>-->
        </div>

    </div>
</div>
</body>
</html>