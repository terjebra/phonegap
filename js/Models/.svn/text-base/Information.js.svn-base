define(['knockout'], function(ko){
    var Information = function () {
        var self = this;
        self.totalTasks = ko.observable();
        self.numberOfExpressTasks = ko.observable();
        self.numberOfVIPTasks = ko.observable();
        self.numberOfOrdinaryTasks = ko.observable();
        self.normalTasks = ko.observableArray();
        self.expressTasks = ko.observableArray();
        self.VIPTasks = ko.observableArray();

        self.addNormalTask = function (task) {
            self.normalTasks.push(task);
        }

        self.addExpressTask = function (task) {
            self.expressTasks.push(task);
        }

        self.addVIPTask = function (task) {
            self.VIPTasks.push(task);
        }
    }

    return Information;
});
