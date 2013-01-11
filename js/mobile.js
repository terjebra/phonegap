define(['jquery', 'knockout', 'ViewModels/TasksMobileViewModel','ViewModels/TaskDetailMobileViewModel', 'Mediator','hammer','jquery-mobile'], function ($, ko, TasksMobileViewModel,TaskDetailMobileViewModel,Mediator) {
	function init() {
	  
        var mediator = new Mediator();
        var viewModel = new TasksMobileViewModel(mediator);
        var viewModelDetail = new TaskDetailMobileViewModel(mediator);     

        ko.applyBindings(viewModel, document.getElementById("mainPage"));
        ko.applyBindings(viewModelDetail, document.getElementById("details"));
        addBindings();

        $(document).bind('pageinit', function (event) {
            viewModel.fetchTasks();
        });
      

    }

    function addBindings(){

        ko.bindingHandlers.tap =  {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var hammer = new Hammer(element);
                hammer.ontap = function (event){
                    var value = valueAccessor();
                    var callback= ko.utils.unwrapObservable(value); 
                    var task = bindingContext.$data;
                    callback(task);
                }
            }
        };
    }

    return {
   	     init: init
    };
});

