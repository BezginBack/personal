$(document).ready(function(){
    var activate = function(){
        var message = $("#form_message").val();
        var email = $("#form_email").val();
        var name = $("#form_name").val();
        if(message == "" || email == "" || name == "") {
            $("#send_button").addClass("disabled");   
        } 
        if(message != "" && email != "" && name != "") {
            $("#send_button").removeClass("disabled");   
        }
        $("#info_span").text("");
    };
    
    $("#form_message").on("keyup", function(){
        activate(); 
    });
    
    $("#form_email").on("keyup", function(){
        activate(); 
    });
    
    $("#form_name").on("keyup", function(){
        activate(); 
    });
    
    $("#send_button").on("keyup", function(){
        activate(); 
    });
    
    var sendMessage = function(){
        var message = $("#form_message").val();
        var email = $("#form_email").val();
        var name = $("#form_name").val();
        var url = "/saveMessage";
        var data = {
            name: name,
            email: email,
            message: message
        };
        var wait = function () {
            $('#form_guest_message')[0].reset();
            $('#send_button').addClass("disabled");
            $(".send").css("display", "none");
            $(".loader").css("display", "block");
        };
        var complete = function() {
            $(".loader").css("display", "none");
            $(".send").css("display", "block");
        };
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', url, data, wait, complete, function (err, res) {
            if(err) {
                $("#info_span").text(err.status + " " + err.statusText);
                $("#info_span").removeClass("text-success");
                $("#info_span").addClass("text-warning");
            } else {
                $("#info_span").text("Thank You");
                $("#info_span").removeClass("text-warning");
                $("#info_span").addClass("text-success");
            }
        }));
    };
    
    $("#send_button").on("click", function() {
        sendMessage(); 
    });
});