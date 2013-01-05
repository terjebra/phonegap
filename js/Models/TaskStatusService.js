define(['jquery', 'Models/TaskStatus'], function ($, TaskStatus) {

    function fetchTaskStatuses(successCallback, failureCallback) {

        var request = $.ajax({
            url: "http://10.0.0.3:5858/statusservice/task",
            dataType: "jsonp",
            success: function(data){
                parse(data, successCallback);
               },
            error : failureCallback
        });
    }

    function parse(data, successCallback) {
        var statuses = [];

        for (var i = 0 ; i < data.length; i++){
            var taskStatus = new TaskStatus();
            taskStatus.name(data[i]);
            statuses.push(taskStatus);
        }
        successCallback(statuses);
    }


    return {
        fetchTaskStatuses: fetchTaskStatuses
    };
});