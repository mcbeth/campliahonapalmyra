jQuery(document).ready(function( $ ) {

    $("#sendMessage").on("click", function() {
        $("#contactModal").modal("show");
        getNewQuestion();
    });
    
    $("#submitMessage").on("click", function() {
        $.ajax({
            url: "https://api2.bizrapido.com/email/checkContactQuestion",
            data: {question_id: $("#question_id").val(), answer: $("#question_answer").val()},
            type: "GET",
            success: function (sResults) {
                var json = JSON.parse(sResults);
                if (sResults.length > 0) {
                    if (parseInt(sResults) === parseInt($("#question_id").val())) {
                        SendMessage();
                    } else {
                        $("#question_answer").val("");
                        getNewQuestion();
                    }
                }
            }
        });
    });
    
});

function getNewQuestion() {
    $("#question_answer").focus();
    $.ajax({
        url: "https://api2.bizrapido.com/email/getContactQuestion",
        type: "GET",
        success: function (sResults) {
            var json = JSON.parse(sResults);
            if (sResults.length > 0) {
                $.each(json, function (counter, value) {
                    $("#contactQuestion").html(json[counter]["question_text"]);
                    $("#question_id").val(json[counter]["question_id"]);
                });
                //$("#contactModal").modal("hide");
                //$("#register").trigger("click");
            }
        }
    });
}
function SendMessage() {
    var contactData = $("#contactForm").serialize();
    $.ajax({
        url: "/contact/submitContact",
        type: "GET",
        data: contactData,
        success: function (sResults) {
            //var json = JSON.parse(sResults);
            if (sResults.length > 0) {
                alert("Message Sent");
            }
            $("#question_answer").val("");
            $("#contactModal").modal("hide");
        }
    });
}