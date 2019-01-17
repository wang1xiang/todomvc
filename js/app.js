(function () {
	'use strict';
	
	function Todo(name,name1) {
		this.storage = new app.Store(name,name1);
		this.model = new app.Model(this.storage);
		this.view = new app.View();
		this.controller = new app.Controller(this.model, this.view);
	}

	let todo = new Todo('temp','temp1');

	function setView() {
		todo.controller.setView();
	}

	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};
	$on(window, 'load', setView);
})();
