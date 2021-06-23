
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Topic Details</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="scriptOneTopic.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

</head>

<body>

<%
    Integer userId = (Integer) session.getAttribute("userId");
    String username = (String) session.getAttribute("username");

    if(userId == null) {
        response.sendRedirect("index.jsp");
        return;
    }
    else {
%>
<nav class="navbar navbar-light bg-light">
    <a class="navbar-brand"> Welcome <%=username%> </a>
<%
    }
%>

    <script>
        var sessionUserId = "<%=userId%>";
    </script>


    <%--  Logout button --%>
    <form class="form-inline" action="logout-servlet" method="post">
        <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit" name="logout" value="Logout">Logout</button>
    </form>

</nav>



    <%-- All comments --%>
    <div class="container-md">
        <div class="row justify-content-center">
            <h1 id="h1-title">Comments</h1>
        </div>
    </div>

    <div class="container">
        <div class="d-flex mt-5 justify-content-center">
            <div id="comments-section"></div>
        </div>
    </div>


    <br>
    <br>


    <%--    Add a new comment --%>
    <div class="container-sm">
        <div class="row justify-content-center">
            <button type="button" id="add-comment-button" class="btn btn-secondary">Add a new comment</button>
        </div>
    </div>


    <br>


    <div class="container-sm">
        <div class="row justify-content-center">
        <form id="add-comment-form" class="form-group">
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" name="description" class="form-control" id="description" placeholder="Enter description">
            </div>

            <button type="button" id="add-comment-button-submit" class="btn btn-info">Add</button>
        </form>
        </div>
    </div>

</body>
</html>

