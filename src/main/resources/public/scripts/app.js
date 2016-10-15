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

function GetterService($http, $q) {
	this.$http = $http;
	this.$q = $q;
	this._region = 'CA';
	this._city = 'Alameda';
	
}

GetterService.prototype.getRegion = function() {
	return this._region; 
}

GetterService.prototype.getCity = function() {
	return this._city;
}

GetterService.prototype.getData = function() {
	return this._data;
}

GetterService.prototype.fetchData = function(region, city, api) {
	this._region = region;
	this._city = city;
	var self = this;
	var deferred = this.$q.defer();
	this.$http.get('api/v1/' + api + '/' + region + '/' + city).success(function(data) {
		deferred.resolve(data);
		self._data = data;
	}).error(function(data, status) {
		console.log('Error: [' + status + '] ' + data);
	});
	return deferred.promise;
}

GetterService.$inject = ['$http', '$q'];

function ConditionsServiceImpl($http, $q) {
	GetterService.call(this, $http, $q);
}

ConditionsServiceImpl.prototype = new GetterService();

ConditionsServiceImpl.$inject = ['$http', '$q'];

app.service('ConditionsService', ConditionsServiceImpl);

app.controller('ConditionsCtrl', function($scope, ConditionsService) {

	$scope.region = ConditionsService.getRegion();
	$scope.city = ConditionsService.getCity();
	$scope.conditions = ConditionsService.getData();

	$scope.fetchConditions = function() {
		ConditionsService.fetchData($scope.region, $scope.city, 'conditions').then(function(c) {
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




