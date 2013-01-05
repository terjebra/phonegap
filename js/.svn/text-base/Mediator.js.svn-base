define(['knockout'], function (ko) {
	var Mediator = function () {
		var self = this;
		self.event = new ko.subscribable();


		self.notify = function(value, event){
			self.event.notifySubscribers(value, event);
		}

		self.subscribe = function(callback, vm, value){
			self.event.subscribe(callback, vm, value);
		}
    }

    return Mediator;
});