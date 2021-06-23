function getAllComments() {
    $.getJSON("comment-servlet", {action: "getAll"},
        function (response) {
            console.log(response);

            $('#comments-section').html("");
            // $('#comments-section').append(
            //     "<thead>" +
            //     "<tr>" +
            //     "<th> Comment Id </th>" +
            //     "<th> Description </th>" +
            //     "<th> User Id </th>" +
            //     "<th> Topic Id </th>" +
            //     "<th> delete </th>" +
            //     "</tr>" +
            //     "</thead>");

            // $('#comments-section').append("<tbody>");
            for (var comment in response) {
                comment = response[comment];
                console.log(comment);
                if(parseInt(comment.userid) == parseInt(sessionUserId))
                    $('#comments-section').append(
                        '<div class="card" style="width: 30rem;">' +
                            '<div class="card-header">' +
                                '<p class="user-id"> Created by ' + comment.username + '</p>' +
                            '</div>' +

                            '<div class="card-body">' +
                                '<h5 class="card-title">' +
                                    '<p hidden class="comment-id">' + comment.id + '</p>' +
                                '</h5>' +

                                '<p class="card-text">' + comment.description + '</p>' +
                                '<p><button type="button" class="deleteButton"> Delete </button></p>' +
                            '</div>' +
                        '</div>' +
                        '<br'
                    );
                else
                    $('#comments-section').append(
                        // '<div class="one-comment-section">' +
                        // '<p class="comment-id">' + comment.id + '</p>' +
                        // '<p class="comment-descr">' + comment.description + '</p>' +
                        // '<p class="user-id"> Created by ' + comment.userid + '</p>' +
                        // '<p class="topic-id">' + comment.topicid + '</p>' +
                        // '</div>' +
                        // '<br'

                        '<div class="card" style="width: 30rem;">' +
                            '<div class="card-header">' +
                                '<p class="user-id"> Created by ' + comment.username + '</p>' +
                            '</div>' +

                            '<div class="card-body">' +
                                '<h5 class="card-title">' +
                                    '<p hidden class="comment-id">' + comment.id + '</p>' +
                                '</h5>' +

                                '<p class="card-text">' + comment.description + '</p>' +
                            '</div>' +
                        '</div>' +
                        '<br'
                    );

                // console.log(comment.userid + " " + sessionUserId);
                //
                // if(parseInt(comment.userid) == parseInt(sessionUserId))
                //     $('#comments-section').append(
                //         '<p><button type="button" class="deleteButton"> Delete </button></p>'
                //     );
                //
                // $('#comments-section').append(
                //     '</div>' +
                //     '<br'
                // );
            }
            // $('#comments-section').append("</tbody>");
        }
    );
}

function deleteComment(commentId) {
    $.post("comment-servlet", {action: "delete", commentId: commentId},
        function (data)
        {
            console.log(data);
            // alert(data);
        });
}



$(document).ready(function () {
    getAllComments();
    $("#add-comment-form").hide();

    $("#comments-section").on("click", ".deleteButton", function(event) {
        // var tr = $(this).closest('tr');
        // var commentId = tr.find('td').eq(0).html();
        // var confirmation = confirm("Are you sure you want to delete comment with id = " + commentId + "?");
        // if(confirmation === true) {
        //     deleteComment(commentId);
        //     getAllComments();
        // }

        var closestDiv = $(this).closest('div');
        var commentId = $(closestDiv).find('.comment-id').eq(0).html();

        var confirmation = confirm("Are you sure you want to delete this comment ?");
        if(confirmation === true) {
            deleteComment(commentId);
            getAllComments();
        }
    });

    $("#add-comment-button").click(function(){
        $("#add-comment-form").show();
    });

    $("#add-comment-button-submit").on('click', function(){
        var descriptionForm = $('#description').val();
        $.post("comment-servlet", {action: "add", description: descriptionForm, userId: sessionUserId},
            function (data)
            {
                console.log(data);
                // alert(data);
            });

        // hide the form
        $("#add-comment-form").hide();

        getAllComments();
    });
});

