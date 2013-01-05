define(['knockout','Models/ToDo'], function(ko, ToDo){
    var Task = function () {
        var self = this;
        self.customer = ko.observable();
        self.taskId = ko.observable();
        self.createdDate = ko.observable();
        self.productInfo = ko.observable();
        self.percentage = ko.observable();
        self.taskPriority = ko.observable();
        self.taskNumber = ko.observable();
        self.toDoList = ko.observableArray();
        self.note = ko.observable();
        self.status = ko.observable();
        self.addToDo = function (toDo) {
            self.toDoList.push(toDo);
        }

        self.removeToDo = function (toDo) {
            self.toDoList.remove(toDo);
        }

        self.addNewToDo = function () {
            var toDo = new ToDo();
            self.toDoList.push(toDo);
        }

        self.getToDoByIndex = function (index) {
            return self.toDoList()[index];
        }

        self.addToDoAtIndex = function (toDo, index) {
            self.toDoList.splice(index, 0, toDo);
        }
    }

    return Task;
});
