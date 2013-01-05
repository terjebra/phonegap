define(['jquery', 'knockout', 'Models/TaskService', 'Models/ToDoStatusService', 'Models/TaskStatusService', 'jquery-ui','bootstrap','handlebars'], function ($, ko, TaskService, ToDoStatusService, TaskStatusService) {
    var TaskViewModel = function () {
        var self = this;
        self.taskInformation = ko.observable();
        self.currentTask = ko.observable();
        self.toDoStatues = ko.observableArray();
        self.taskStatuses = ko.observableArray();
      
        self.fetchTasks = function () {
            TaskService.fetchTasks(function (data) {
                self.taskInformation(data);
            },
            function error(data) {

            })
            ;
        };

        self.showModal = function (task) {
            TaskService.fetchDetailedTask(task, function (currentTask) {
                self.currentTask(currentTask);
                $('#myModal').modal();
                $("#sortable").sortable();
                $("#sortable").disableSelection();
            },
            function error(data) {

            })
            ;
            
        }

        self.fetchToDoStatuses = function () {
            ToDoStatusService.fetchStatuses(function (data) {
                self.toDoStatues(data);
            },
           function error(data) {

           })
            ;
        }


        self.fetchTaskStatuses = function () {
            TaskStatusService.fetchTaskStatuses(function (data) {
                self.taskStatuses(data);
            },
           function error(data) {
               
           })
            ;
        }

        self.updateTask = function () {
            TaskService.updateTask(self.currentTask(), function () {
                $('#myModal').modal('hide');
                self.fetchTasks();
            },
           function error(data) {
                var source   = $("#alert-error").html();
                var template = Handlebars.compile(source);
                var data = {text:"Feil ved lagring"};
               $('.dialogBox').html(template(data));
           })
        }

        setInterval(self.fetchTasks, 99000);
    }


    return TaskViewModel;
});
