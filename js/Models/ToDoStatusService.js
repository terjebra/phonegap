define(['jquery','Models/ToDoStatus'], function ($, ToDoStatus) {

    function fetchStatuses(successCallback, failureCallback) {

        var request = $.ajax({
            url: "http://10.0.0.3:5858/statusservice/todo",
            dataType: "jsonp",
            success: function(data){
                parseToDo(data, successCallback);
               },
            error : failureCallback
        });
    }

    function parseToDo(data, successCallback) {
        var todoList = [];

        for (var i = 0 ; i < data.length; i++){
            var todoStatus = new ToDoStatus();
            todoStatus.name(data[i]);
            todoList.push(todoStatus);
        }
         successCallback(todoList);
    }


    return {
        fetchStatuses: fetchStatuses,
        parseToDo: parseToDo
    };
});