<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Register</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="registerScript.js"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>

    <body>
    <div class="container">
        <div class="d-flex align-items-center justify-content-center" style="height: 600px">

            <form class="form-group" action="register-servlet" method="post">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username">
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="form-control" id="password" placeholder="Enter password">
                </div>

                <div class="form-group">
                    <label for="repeatPassword">Confirm Password</label>
                    <input type="password" name="repeatPassword" class="form-control" id="repeatPassword"  placeholder="Repeat password">
                </div>

                <button type="submit" class="btn btn-primary" id="register-button">Register</button>
            </form>

        </div>
    </div>

    </body>
</html>
