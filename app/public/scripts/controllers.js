'use strict';

angular.module('websiteApp')
	// basic controller is used in the items view
	.controller('BasicController', ['$scope', 'dataofflineFactory', function($scope, dataofflineFactory) {
		// get items offline
		dataofflineFactory.success(function(data) {
			$scope.website = data.websites[0];
			$scope.variables = data.variables;
		});			
	}])
	// forms controller is used to reload forms
	.controller('FormsController', ['$scope', function($scope) {
		$scope.update= function() {
			$scope.account.name = name;
		}  
	}])
	// items controller is used in the items view
	.controller('ItemsController', ['$scope', '$stateParams', 'dataofflineFactory', 'datapassingService', function($scope, $stateParams, dataofflineFactory, datapassingService) {
		// init vars
		$scope.filtText = "";
		$scope.showDetails = false;
		$scope.showItems = false;
		$scope.message = "Loading...";
		$scope.tab = 1;
		
		// get correct tab
		$scope.mydata = {};
		$scope.mydata = datapassingService.get();
		if ($scope.mydata.tab !== undefined || $scope.mydata.tab !== null || $scope.mydata.tab !== "" || $scope.mydata.tab !== 0) {
			$scope.tab = $scope.mydata.tab;
		} else {
			$scope.tab = 1;
		}
		
		// override if stateParam
		//if ($stateParams.tab !== undefined || $stateParams.tab !== null || $stateParams.tab !== "" || $stateParams.tab !== 0) {
		//	$scope.tab = parseInt($stateParams.tab, 10);
		//}
		
		// get items offline
		dataofflineFactory.success(function(data) {
			$scope.items = data.items;
			$scope.showItems = true;
			$scope.categories = data.categories;
			$scope.variables = data.variables;
			if ($scope.tab === undefined || $scope.tab === null || $scope.tab === "" || $scope.tab === 0) {
				$scope.tab = 1;
				$scope.filtText = $scope.categories[$scope.tab-1].name;
			} else {
				$scope.filtText = $scope.categories[$scope.tab-1].name;
			}
		});
		
		// categorize items
		$scope.select = function(setTab) {
			$scope.tab = setTab;
			$scope.filtText = "";
                        for (let i=0; i < $scope.categories.length; i++) {
                          if (setTab === (i+1)) {
                          	$scope.filtText = $scope.categories[i].name;
                          }
                        }
			$scope.mydata.tab = setTab;
			datapassingService.set($scope.mydata);
		};
		$scope.isSelected = function(checkTab) {
			return ($scope.tab === checkTab);
		};
		// toggle details on or off
		$scope.toggleDetails = function() {
			$scope.showDetails = ! $scope.showDetails;
		};
	}])
	// contact controller is used to get address data
	.controller('ContactController', ['$scope', 'dataofflineFactory', function($scope, dataofflineFactory) {
		// don't ask
		$scope.showingmenu = false;
		$scope.closedmenu = false;
		// get contacts offline
		$scope.showContacts = false;
		dataofflineFactory.success(function(data) {
			// don't ask why they're under contacts...
			$scope.titles = data.titles[0];
			// controller quits when line fails to find contact info! So moved titles to top in controller.
			$scope.contacts = data.contacts;
			$scope.contact = data.contacts[0];
			if ($scope.contact.id > -1) {
				$scope.showContacts = true;
			}
		});
	}])
	// item detail controller returns item details and is for item detail view
	.controller('ItemDetailController', ['$scope', '$stateParams', 'dataofflineFactory', function($scope, $stateParams, dataofflineFactory) {
		// init variables
		$scope.item = {};
		$scope.showItem = false;
		$scope.message = "Loading...";
		// get it offline
		dataofflineFactory.success(function(data) {
			$scope.items = data.items;
			$scope.item = data.items[parseInt($stateParams.id, 10)];
			$scope.showItem = true;
		});
	}])
	// index controller gets first item and About Controller here
	.controller('IndexController', ['$scope', 'dataofflineFactory', 'datapassingService', function($scope, dataofflineFactory, datapassingService) {
		$scope.message = "Loading...";
		$scope.carousel = 0;
		$scope.mydata = {};
		
		// get carousel, get first item, get promotion/sale/special, get first about us, get first avatar and whatever offline
		//$scope.showItem = false;
		$scope.showPromotion = false;
		$scope.showAvatar = false;
		$scope.showStory = false;
		dataofflineFactory.success(function(data) {
			$scope.website = data.websites[0];
			$scope.titles = data.titles[0];
			$scope.story = data.stories[0];
			if ($scope.story.id > -1) {
				$scope.showStory = true;
			}
			$scope.categories = data.categories;
			//$scope.items = data.items;
			//$scope.item = data.items[0];
			//if ($scope.items[0].id > -1) {
			//	$scope.showItem = true;
			//}
			$scope.avatar = data.avatars[0];
			if ($scope.avatars[0].id > -1) {
				$scope.showAvatar = true;
			}
			$scope.promotion = data.promotions[0];
			$scope.promotion.name = data.items[data.promotions[0].id].name;
			$scope.promotion.image = data.items[data.promotions[0].id].image;
			$scope.promotion.label = data.items[data.promotions[0].id].label;
			$scope.promotion.price = data.items[data.promotions[0].id].price;
			$scope.promotion.description = "This month we have a promotion for " + data.items[data.promotions[0].id].name + "! " + data.items[data.promotions[0].id].description;
			if (data.promotions[0].id > -1) {
				$scope.showPromotion = true;
			}
		});
		$scope.selectCategory = function(selectedCategory) {
			$scope.mydata.tab = selectedCategory;
			datapassingService.set($scope.mydata);
		};
	}])

	.controller('AboutController', ['$scope', 'dataofflineFactory', function($scope, dataofflineFactory) {

		// get about us, quotes, facts, avatars, and whatever offline
		$scope.showAvatars = false;
		$scope.showStories = false;
		dataofflineFactory.success(function(data) {
			$scope.titles = data.titles[0];
			$scope.item = data.items[0];
			$scope.stories = data.stories;
			if ($scope.stories[0].id > -1) {
				$scope.showStories = true;
			}
			$scope.avatars = data.avatars;
			if ($scope.avatars[0].id > -1) {
				$scope.showAvatars = true;
			}
		});
	}])
;