define(['jquery', 'knockout', 'ViewModels/TasksMobileViewModel','ViewModels/TaskDetailMobileViewModel','Mediator','handlebars', 'hammer','modernizer','jquery-mobile'], function ($, ko, TasksMobileViewModel,TaskDetailMobileViewModel,Mediator) {
	function init() {

       
        var mediator = new Mediator();
        var viewModel = new TasksMobileViewModel(mediator);
        var viewModelDetail = new TaskDetailMobileViewModel(mediator);


        var source = $("#mobile").html();
        var template = Handlebars.compile(source);
        $("#main").html(template);
        ko.applyBindings(viewModel, document.getElementById("mainPage"));
        ko.applyBindings(viewModelDetail, document.getElementById("details"));
        addBindings();
       
        $( '#mainPage' ).live( 'pageinit',function(event){
            viewModel.fetchTasks();
        });

        $('#mainPage').live("swiperight", function(){
            alert('right');
        });
     

        $('#mainPage').live("swipeleft", function(){
            alert('left');
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

