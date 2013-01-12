define(['jquery', 'knockout', 'Models/TaskService', 'Models/ToDoStatusService', 'Models/TaskStatusService', 'jquery-mobile'], function ($, ko, TaskService, ToDoStatusService, TaskStatusService) {
    var TasksMobileViewModel = function (Mediator) {
        var self = this;
        self.taskInformation = ko.observable();
        self.mediator = Mediator;


        self.mediator.subscribe(function(value)
        {
            $.mobile.changePage("#mainPage",
                {
                    transition: "slide",
                    reverse: true
                });
            self.fetchTasks();
           
        },self, "back")

        self.fetchTasks = function () {
            TaskService.fetchTasks(function (data) {
                self.taskInformation(data);
                $("#mainPage").trigger('create');

            },
            function error(data) {

            })
            ;
        };

        self.postProcess = function(){

             
        }
        self.showDetail = function (task) {
                        
               self.mediator.notify(task,"details");
    
        }

        setInterval(self.fetchTasks, 10000);
    }

    return TasksMobileViewModel;
});
