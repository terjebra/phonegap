define(['jquery', 'knockout', 'Models/TaskService', 'Models/ToDoStatusService', 'Models/TaskStatusService', 'jquery-mobile'], function ($, ko, TaskService, ToDoStatusService, TaskStatusService) {
    var TaskDetailMobileViewModel = function (Mediator) {
        var self = this;
        self.taskInformation = ko.observable();
        self.currentTask = ko.observable();
        self.toDoStatues = ko.observableArray();
        self.taskStatuses = ko.observableArray();
      
        self.mediator = Mediator;

        self.mediator.subscribe(function(value)
        {
            $.mobile.changePage("#details",
                {
                    transition: "slide"
                }

            );
           
            self.fetchTaskStatuses();
            self.fetchToDoStatuses();
            self.showDetail(value);
        },self, "details")

        self.postProcess = function(){
             $("#details").trigger('create');
        }

        self.fetchToDoStatuses = function () {
            ToDoStatusService.fetchStatuses(function (data) {
                self.toDoStatues(data);
            },
           function error(data) {

           })
            ;
        }

        self.showDetail = function (task) {
             $.mobile.loading('show')
            TaskService.fetchDetailedTask(task, function (currentTask) {
              self.currentTask(currentTask);   
               self.postProcess();
            },
            function error(data) {

            })
            ;
         $.mobile.loading('hide')
        }

        self.fetchTaskStatuses = function () {
            TaskStatusService.fetchTaskStatuses(function (data) {
                self.taskStatuses(data);
            },
           function error(data) {
               
           });
        }

        self.updateTask = function () {
            TaskService.updateTask(self.currentTask(), function () {            
                self.close();
            },
           function error(data) {

           })
        }

        self.close = function () {
            Mediator.notify(null, "back");
        }
    }


    return TaskDetailMobileViewModel;
});
