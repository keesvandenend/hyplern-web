'use strict';

angular.module('websiteApp')
	// get all data offline from file
	.factory('dataofflineFactory', function($http) {
		return $http.get('site.json');
		// for latest version this is changed into MongoDB data retrieval
	})
	.factory('datapassingService', function() {
		var savedData = {};
		function set(data) {
			savedData = data;
		}
		function get() {
			return savedData;
		}
		return {
			set: set,
			get: get
		}
	});
;