(function (window) {
	'use strict';

	function Controller(model, view) {
		let self = this;
		self.model = model;
		self.view = view;

		self.view.bind('newTodo', function (title) {
			self.addItem(title);
		});

		self.view.bind('itemRemove', function (item) {
			self.removeItem(item.id,item.checked);
			self.setView();
		});


		self.view.bind('itemToggle', function (item) {
			self.toggleComplete(item.id, item.checked);
		});
	}

	Controller.prototype.setView = function () {
		this._updateFilterState();
	};

	Controller.prototype.addItem = function (title) {
		let self = this;

		if (title.trim() === '') {
			return;
		}
		self.model.create(title, function () {});
		self.view.render('clearNewTodo');
		self.setView();
	};

	Controller.prototype.removeItem = function (id,checked) {
		let self = this;
		self.model.remove(id, checked,function () {
			self.view.render('removeItem', id,checked);
		});
	};

	Controller.prototype.toggleComplete = function (id, checked, silent) {
		let self = this;
		self.model.update(id,checked, function () {
			self.view.render('elementComplete', {
				id: id,
				checked: checked
			});
		});
		self.setView();
	};

	Controller.prototype._updateFilterState = function () {
		this.view.render('showEntries',this.model);
	};

	window.app = window.app || {};
	window.app.Controller = Controller;
})(window);
