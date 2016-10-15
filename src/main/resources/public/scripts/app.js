var app = angular.module('weatherapp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
]);

app.config(function($routeProvider) {
	$routeProvider.
	
	when('/conditions', {
		templateUrl: 'views/conditions.html',
		controller: 'ConditionsCtrl'
	}).
	
	when('/astronomy', {
		templateUrl: 'views/astronomy.html',
		controller: 'AstronomyCtrl'
	}).
	
	otherwise({
		redirectTo: '/conditions'
	})
});

app.service('ConditionsService', function($http, $q) {
	this._region = 'CA';
	this._city = 'Alameda';
	this._conditions;
	var self = this;
	
	this.fetchConditions = function(region, city) {
		self._region = region;
		self._city = city;
		var deferred = $q.defer();
		$http.get('api/v1/conditions/' + region + '/' + city).success(function(data) {
			deferred.resolve(data);
			self._conditions = data;
		}).error(function(data, status) {
			console.log('Error: [' + status + '] ' + data);
		});
		return deferred.promise;
	}
	
	this.getRegion = function() {
		return self._region;
	}
	
	this.getCity = function() {
		return self._city;
	}
	
	this.getConditions = function() {
		return self._conditions;
	}
});

app.controller('ConditionsCtrl', function($scope, ConditionsService) {

	$scope.region = ConditionsService.getRegion();
	$scope.city = ConditionsService.getCity();
	$scope.conditions = ConditionsService.getConditions();

	$scope.fetchConditions = function() {
		ConditionsService.fetchConditions($scope.region, $scope.city).then(function(c) {
			$scope.conditions = c
		});
	};
});

app.service('AstronomyService', function($http, $q) {
	this._region = 'CA';
	this._city = 'Alameda';
	this._astronomy;
	var self = this;
	
	this.fetchAstronomy = function(region, city) {
		self._region = region;
		self._city = city;
		var deferred = $q.defer();
		$http.get('api/v1/astronomy/' + region + '/' + city).success(function(data) {
			deferred.resolve(data);
			self._astronomy = data;
		}).error(function(data, status) {
			console.log('Error: [' + status + '] ' + data);
		});
		return deferred.promise;
	}
	
	this.getRegion = function() {
		return self._region;
	}
	
	this.getCity = function() {
		return self._city;
	}
	
	this.getAstronomy = function() {
		return self._astronomy;
	}
});

app.controller('AstronomyCtrl', function($scope, AstronomyService) {
	
	$scope.region = AstronomyService.getRegion();
	$scope.city = AstronomyService.getCity();
	$scope.astronomy = AstronomyService.getAstronomy();
	
	$scope.fetchAstronomicData = function() {
		AstronomyService.fetchAstronomy($scope.region, $scope.city).then(function(a) {
			$scope.astronomy = a;
		});
	};
});




