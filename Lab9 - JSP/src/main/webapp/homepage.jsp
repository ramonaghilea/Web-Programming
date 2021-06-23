
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>Homepage</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="scriptHomepage.js"></script>
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



    <%-- All topics --%>
    <div class="container-md">
        <div class="row justify-content-center">
            <h1>Topics</h1>
            <table id="topics-table" class="table table-striped"></table>

        <%--    <form action="comment-servlet" method="post">--%>
        <%--        <input type="submit" name="logout" value="Get comments for topic 1">--%>
        <%--            <input type="hidden" name="action" value="setCurrentTopicId">--%>
        <%--            <input type="hidden" name="topicId" value="1">--%>
        <%--    </form>--%>
        </div>
    </div>

    <%--    Add a new topic --%>
    <div class="container-sm">
        <div class="row justify-content-center">
            <button type="button" id="add-topic-button" class="btn btn-secondary">Create a new topic</button>
        </div>
    </div>

    <div class="container-sm">
        <div class="row justify-content-center">
            <form id="add-topic-form" class="form-group">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" class="form-control" id="name" placeholder="Enter name">
                </div>

                <button type="button" id="add-topic-button-submit" class="btn btn-info">Add</button>
            </form>
        </div>
    </div>

</body>
</html>
