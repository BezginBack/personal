var appUrl = window.location.origin;
var ajaxFunctions = {
    ready: function ready (fn) {
        if (typeof fn !== 'function') {
            return;
        }
        if (document.readyState === 'complete') {
            return fn();
        }
        document.addEventListener('DOMContentLoaded', fn, false);
    },
    ajaxRequest: function ajaxRequest (method, url, data, waitFunction, completeFunction, callback) {
        $.ajax({
            type: method,
            url : appUrl + url,
            data : data,
            dataType : 'json',
            beforeSend : waitFunction,
            complete : completeFunction,
            error : function(err){
                callback(err, null);   
            },
            success : function(response){
                callback(null, response);
            }
        });
    }
};