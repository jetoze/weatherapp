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
	
	this.getRegion = function() {
		return this._region;
	}
	
	this.getCity = function() {
		return this._city;
	}
	
	this.getData = function() {
		return this._data;
	}
	
	var self = this;
	this.fetchData = function(region, city, api) {
		self._region = region;
		self._city = city;
		var deferred = self.$q.defer();
		self.$http.get('api/v1/' + api + '/' + region + '/' + city).success(function(data) {
			deferred.resolve(data);
			self._data = data;
		}).error(function(data, status) {
			console.log('Error: [' + status + '] ' + data);
		});
		return deferred.promise;
	}
}

GetterService.$inject = ['$http', '$q'];

app.service('ConditionsService', GetterService);

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

app.service('AstronomyService', GetterService);

app.controller('AstronomyCtrl', function($scope, AstronomyService) {
	
	$scope.region = AstronomyService.getRegion();
	$scope.city = AstronomyService.getCity();
	$scope.astronomy = AstronomyService.getData();
	
	$scope.fetchAstronomicData = function() {
		AstronomyService.fetchData($scope.region, $scope.city, 'astronomy').then(function(a) {
			$scope.astronomy = a;
		});
	};
});
