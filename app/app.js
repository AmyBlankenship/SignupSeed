(
    function(){
		'use strict';
	
		angular.module('myApp', [
			'ngRoute',
			'ui.bootstrap',
			'shared',
			'signOn'
		]).
		config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
			$locationProvider.hashPrefix('!');
		
			$routeProvider
				.when('/signOn',
					{
						controller:'signOnController',
						controllerAs:'vm',
						templateUrl:'signOn/signOnView.html'
					}
				)
				.otherwise({redirectTo: '/signOn'});
		}]);
		
	}
)();
