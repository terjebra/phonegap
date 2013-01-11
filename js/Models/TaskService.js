define(['jquery', 'Models/Task', 'Models/Customer', 'Models/Information', 'Models/ToDo','knockout'], function ($, Task, Customer, Information, ToDo,ko) {

    function fetchTasks(successCallback, failureCallback) {

        var request = $.ajax({
            url: "http://10.0.0.3:5858/taskservice/tasks/",
            dataType: "jsonp",
            success: function(data){
                parseData(data, successCallback);
               },
            error : failureCallback
        });
    }
    function fetchDetailedTask(task, successCallback, failureCallback) {

        var request = $.ajax({
            url: "http://10.0.0.3:5858/taskservice/tasks/" + task.taskId(),
            dataType: "jsonp",
            success: function (data) {
                parseDetailedData(data, successCallback);
            },
            error: failureCallback
        });
    }
    function updateTask(task, successCallback, failureCallback) {

        var request = $.ajax({
            url: "http://10.0.0.3:5858/taskservice/tasks/" + task.taskId(),
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            data: convertToJSON(task),
            success: function () {
                successCallback();
            },
            error: failureCallback
        });
    }

    function convertToJSON(task) {

        var todoList = [];
        ko.utils.arrayForEach(task.toDoList(), function (item) {
            var todo = ko.toJSON(item);
            todoList.push({ name: item.name(), status: item.status() });
        })
        
        var json = { taskinfo: { taskId: task.taskId(), note: task.note(), status: task.status() }, todos: todoList };
        return JSON.stringify(json);
    }

    function parseData(data, successCallback) {
        var information = new Information();
        information.totalTasks(data.totalTasks);
        information.numberOfExpressTasks(data.expressTasks)
        information.numberOfVIPTasks(data.vipTasks);
        information.numberOfOrdinaryTasks(data.ordinaryTasks);

        var tasks = data.tasks;
        for (var i = 0; i < tasks.length; i++) {
            var task = new Task();
            task.taskId(tasks[i].taskId);
            task.percentage(tasks[i].percentage);
            task.taskPriority(tasks[i].taskPriority);
            task.createdDate(tasks[i].createdDate);
            task.productInfo(tasks[i].productInfo);
            task.taskNumber(tasks[i].taskNumber);
            task.status(tasks[i].status);
            var customer = new Customer();
            customer.customerName(tasks[i].customer.name);
            customer.customerNumber(tasks[i].customer.customerNumber);
            task.customer(customer);
            
            if (task.taskPriority() == 0) {
                information.addExpressTask(task);
            }
            else if (task.taskPriority() == 1) {
                information.addVIPTask(task);
            }
            else {
                information.addNormalTask(task);
            }
        }

        successCallback(information);
    }


    function parseDetailedData(data, successCallback) {
        var task = new Task();
      
        task.note(data.taskinfo.note);
        task.productInfo(data.taskinfo.productInfo);
        task.taskId(data.taskinfo.taskId);
        task.status(data.taskinfo.status);
        var customer = new Customer();
        customer.customerName(data.taskinfo.customer.name);
        customer.customerNumber(data.taskinfo.customer.customerNumber);
        customer.customerEmail(data.taskinfo.customer.email);
        customer.customerPhone(data.taskinfo.customer.phone);
        task.customer(customer);

        var todos = data.todos;

        for(var i = 0; i <todos.length; i++) {
            var todo = new ToDo();
            todo.name(todos[i].name);
            todo.finished(todos[i].finished);
            todo.taskId(todos[i].taskId);
            todo.status(todos[i].status);
            task.addToDo(todo);
        }

        successCallback(task);
    }
    

    
    return {
        fetchTasks: fetchTasks,
        fetchDetailedTask: fetchDetailedTask,
        updateTask: updateTask
    };
});