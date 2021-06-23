
$(document).ready(function() {

    filterButton = document.getElementById("filterButton");
    filterButton.onclick = function () {
        let filterTable = document.getElementById("filterTable");
        let filterTableTbody = filterTable.getElementsByTagName("tbody")[0];

        var new_tbody = document.createElement('tbody');
        filterTableTbody.parentNode.replaceChild(new_tbody, filterTableTbody)

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let logs = JSON.parse(this.responseText);

                for (let log of logs) {
                    let row = document.createElement("tr");
                    new_tbody.appendChild(row);

                    for (let logColumn of log) {
                        let cell = document.createElement("td");
                        cell.innerText = logColumn;
                        row.appendChild(cell);
                    }
                }
            }
        };

        logType = document.getElementById("type").value;
        logSeverity = document.getElementById("severity").value;

        xmlhttp.open("GET","../PHP/getLogsByTypeAndSeverity.php?type=" + logType + "&severity=" + logSeverity,true);
        xmlhttp.send();
    }

    // $("#buttonAll").click(function displayAllLogs() {
    //     var xhttp;
    //     xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState == 4 && this.status == 200) {
    //             document.getElementById("logsTable").innerHTML = this.responseText;
    //         }
    //     };
    //     xhttp.open("GET", "homepage.php?q=all", true);
    //     xhttp.send();
    // })
    //
    // function displayUsersLogs() {
    //     var xhttp;
    //     xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState == 4 && this.status == 200) {
    //             document.getElementById("logsTable").innerHTML = this.responseText;
    //         }
    //     };
    //     xhttp.open("GET", "homepage.php?q=one", true);
    //     xhttp.send();
    // }
    //
    // function displayFilteredLogs() {
    //     var xhttp;
    //     if (str == "") {
    //         document.getElementById("txtHint").innerHTML = "";
    //         return;
    //     }
    //     xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function () {
    //         if (this.readyState == 4 && this.status == 200) {
    //             document.getElementById("logsTable").innerHTML = this.responseText;
    //         }
    //     };
    //     xhttp.open("GET", "homepage.php?q=one", true);
    //     xhttp.send();
    // }
});