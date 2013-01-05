define(['jquery', 'knockout', 'ViewModels/TasksViewModel','handlebars'], function ($, ko, TasksViewModel) {
	function init() {
		var source = $("#pc").html();
        var template = Handlebars.compile(source);
        $("#main").html(template);

        var viewModel = new TasksViewModel();
        ko.applyBindings(viewModel);
        addBindings();

        viewModel.fetchTasks();
        viewModel.fetchToDoStatuses();
        viewModel.fetchTaskStatuses();
    }

    function addBindings() {
        ko.bindingHandlers.sortableList = {
	     init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
	         var startIndex = -1;
	         $(element).sortable({

	             start: function (event, ui) {
	                 startIndex = ui.item.index();
	             },

	             update: function (event, ui) {

	                 var index = ui.item.index();

	                 if (startIndex > -1) {

	                     var todo = viewModel.getToDoByIndex(startIndex);
	                     viewModel.removeToDo(todo);
	                     viewModel.addToDoAtIndex(todo, index);
	                     ui.item.remove();
	                 }
	             }
	         });
	     }
	 };
	  }
    return {
   	     init: init
    };
});

 


 