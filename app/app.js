var app = angular.module('ParksApp', ['ui.router', 'uiGmapgoogle-maps'])

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // if no routes are matched, redirect to this route (root)
  $urlRouterProvider.otherwise('/');

}]) // end config

///////////////////////////////////////////////////////////////////////

app.controller('ParksCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.title = "Seattle Pick-a-Park";
  $scope.select = '';
  $scope.windowShow = false;

  $scope.click = function() {
   // console.log("Select:", $scope.select);  
   queryParks();
  }

  $scope.getParkFeatures = function(id) {
    $http.get('https://data.seattle.gov/resource/ye65-jqxk.json?pmaid=' + id)
    .then(function success(res) {
      console.log(res.data)
      $scope.pfArray = res.data;
      console.log("Get PF", $scope.pfArray);
    }, function error(res) {
      console.log("getParkFeatures error");
    })
  }


  // Parks Query
    function queryParks() {
      $http.get('https://data.seattle.gov/resource/ye65-jqxk.json?feature_desc=' + $scope.select)
      .then(function success(res) {
        $scope.parks = res.data;
        // console.log("Parks:", $scope.parks);
      }, function error(res) {
        console.log("parks error");
      })
    }

    // Features Query
  function queryFeatures() {
    $http.get('https://data.seattle.gov/resource/ye65-jqxk.json')
    .then(function success(res) {
      var features = res.data;
      // console.log("F", features);

      var array = [];
      for(var i = 0; i < features.length; i++){
        // console.log("made it in");
        array.push(features[i].feature_desc);
      }
      // console.log("FArray", array.sort());

      var featuresArraySort = array.sort();

      $scope.featureResults = [];

      for (var i = 0; i < featuresArraySort.length; i++) {
        if (featuresArraySort[i] !== featuresArraySort[i + 1]) {
          $scope.featureResults.push(featuresArraySort[i]);
        }
      }
      // console.log("Final", $scope.featureResults);

    }, function error (res) {
      console.log("queryParks error");

    }) //end get
  } // end queryFeatures

  queryFeatures();

}]) // end ParksCtrl

///////////////////////////////////////////////////////////////////////

app.controller('MapCtrl', ['$scope', '$http', function($scope, $http){

$scope.works = "Works!!!!!"
//-----------------------------map-----------------------------
  $scope.map = { center: { latitude: 47.606, longitude: -122.332 }, zoom: 12 };
//-------------------------------------------------------------

    // $http.get('https://data.seattle.gov/resource/pe9t-raai.json', {})
    // .then(function success(res){
    //     console.log(res);
    //     $scope.results = res.data.data;

    // }, function error(res){

    //   console.log(res);
    // });

}]);