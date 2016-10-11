'use strict';

angular.module('websiteApp',['ui.router','ngResource'])
    
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
    
	// route for the root page
	.state('app', {
		url: '/',
		views: {
			'header': {
				templateUrl: 'views/header.html'
			},
			'content': {
				templateUrl: 'views/main.html', 
				controller: 'IndexController'
			},
			'footer': {
				templateUrl: 'views/footer.html'
			}
		}
	})
	
	// another route for the main page
	.state('app.main', {
		url: 'main',
		views: {
			'content@': {
				templateUrl: 'views/home.html', 
				controller: 'IndexController'
			}
		}
	})
	
	// route for the login page
	.state('app.login', {
		url: 'login',
		cache: false,
		views: {
			'content@': {
				templateUrl: 'account/login', 
				controller: 'FormsController'
			}
		}
	})
	
	// route for the account page
	.state('app.account', {
		url: 'account',
		cache: false,
		views: {
			'content@': {
				templateUrl: 'account/home', 
				controller: 'FormsController'
			}
		}
	})
	
        // route for the aboutus page
        .state('app.aboutus', { 
            url: 'aboutus',
            views: {
                'content@': {
                    templateUrl: 'views/aboutus.html', 
                    controller: 'AboutController'
                }
            }
        })
        
        // route for the contactus page
        .state('app.contactus', {
            url:'contactus',
            views: {
                'content@': {
                    templateUrl: 'views/contactus.html',
                    controller: 'ContactController'
                }
            }
        })
        
        // route for the items page
        .state('app.items', {
            url: 'items',
            views: {
                'content@': {
                    templateUrl: 'views/items.html',
                    controller: 'ItemsController'
                }
            }
        }) 
        
        // router for the itemdetail page
        .state('app.itemdetails', {
            url: 'items/:id',
            views: {
                'content@': {
                    templateUrl: 'views/itemdetail.html',
                    controller: 'ItemDetailController'
                }
            }
        });
        
    $urlRouterProvider.otherwise('/');
});