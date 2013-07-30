'use strict';


// Declare app level module which depends on filters, and services
angular.module('quickcanvas', ['LocalStorageModule','quickcanvas.filters', 'quickcanvas.services', 'quickcanvas.directives', 'quickcanvas.controllers']).
  config(['$routeProvider', function($routeProvider) {
  	$routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'CanvasCtrl'});
	  	$routeProvider.when('/canvas', {templateUrl: 'partials/canvas.html', controller: 'CanvasCtrl'});
		$routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
    	// $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'ContactCtrl'});
    	$routeProvider.otherwise({redirectTo: '/'});
  }]);
