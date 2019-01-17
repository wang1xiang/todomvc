(function (window) {
	'use strict';
	
	function Model(storage) {
		this.data = storage;
	}

	Model.prototype.create = function (title, callback) {
		title = title || '';
		callback = callback || function () {};

		let newItem =title.trim();

		this.data.save(newItem, callback);
	};

	Model.prototype.update = function (id, data, callback) {
		this.data.save(data, callback, id);
	};

	Model.prototype.remove = function (id, checked,callback) {
		this.data.remove(id, checked,callback);
	};

	window.app = window.app || {};
	window.app.Model = Model;
})(window);
