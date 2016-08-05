var app = angular.module('ParksApp', ['ui.router', 'uiGmapgoogle-maps'])

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // if no routes are matched, redirect to this route (root)
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/views/home.html'
  })
  .state('map', {
    url: '/map',
    templateUrl: 'app/views/map.html'
  })

}]) // end config

///////////////////////////////////////////////////////////////////////

app.controller('ParksCtrl', ['$scope', '$http', '$location', '$state', function($scope, $http, $location, $state) {
  $scope.title = "Seattle Pick-a-Park";
  $scope.select = '';
  $scope.hideIt = false;
  $scope.show = function (){
    $scope.hideIt = false;
    $state.go('home');

    // console.log("Clicker")
    // console.log("Scope", $scope.hideIt);
    // $scope.hideIt = true;
    // console.log("Scope", $scope.hideIt);
  }


  $scope.click = function() {
   console.log("Select:", $scope.select);  
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
    console.log("Scope", $scope.select);
    $http.get('https://data.seattle.gov/resource/ye65-jqxk.json?feature_desc=' + $scope.select)
    .then(function success(res) {
      $scope.parks = res.data;
      // console.log("Parks:", $scope.parks);
    }, function error(res) {
      console.log("parks error");
    })
  }

  $scope.search = function(event) {
    $scope.hideIt = true;

    field_sport = [
      "Baseball/Softball",
      "Cricket",
      "Flag Football",
      "Football",
      "Lacrosse",
      "Soccer",
      "Rugby",
      "T-Ball",
      "Ulitmate",
      "Track"
    ]
    family_fun = [
      "Play Area",
      "Picnic Sites",
      "Model Boat Pond",
      "Fire Pit",
      "Restrooms"
    ]
    nature = [
      "Woods",
      "Bike Trail",
      "Creek",
      "Garden",
      "Green Space",
      "Hiking Trails",
      "View"
    ]
    sports = [
      "Adult Fitness Equipment",
      "Basketball (Full)",
      "Bike Polo",
      "Disc Golf",
      "Golf",
      "Horseshoe Pits",
      "Lawn Bowling",
      "Pickleball Court",
      "Skatepark",
      "Skatespot",
      "Tennis Court"
    ]
    water_fun = [
      "Wading Pool or Water Feature",
      "Waterfront",
      "Fishing",
      "Guarded Beach",
      "Pool (Indoor)",
      "Pool (Outdoor)"
    ]
    
    console.log("Event", event.target.attributes.id.value);

    $scope.featuresArray = event.target.attributes.id.value;

    var whichArray = event.target.attributes.id.value;

    switch(whichArray) {
      case "water_fun":
        $scope.featuresArray = water_fun;
        break;
      case "field_sport":
        $scope.featuresArray = field_sport;
        break;
      case "sports":
        $scope.featuresArray = sports;
        break;
      case "family_fun":
        $scope.featuresArray = family_fun;
        break;
      case "nature":
        $scope.featuresArray = nature;
        break;
    } 
    console.log("FA", $scope.featuresArray)
  } //end search

    // Features Query
  // function queryFeatures() {
  //   $http.get('https://data.seattle.gov/resource/ye65-jqxk.json')
  //   .then(function success(res) {
  //     var features = res.data;
  //     // console.log("F", features);

  //     var array = [];
  //     for(var i = 0; i < features.length; i++){
  //       // console.log("made it in");
  //       array.push(features[i].feature_desc);
  //     }
  //     // console.log("FArray", array.sort());

  //     var featuresArraySort = array.sort();
  //     $scope.featureResults = [];

  //     for (var i = 0; i < featuresArraySort.length; i++) {
  //       if (featuresArraySort[i] !== featuresArraySort[i + 1]) {
  //         $scope.featureResults.push(featuresArraySort[i]);
  //       }
  //     }
  //     // console.log("Final", $scope.featureResults);

  //   }, function error (res) {
  //     console.log("queryParks error");

  //   }) //end get
  // } // end queryFeatures

  // queryFeatures();

}]) // end ParksCtrl

///////////////////////////////////////////////////////////////////////

app.controller('MapCtrl', ['$scope', '$http', function($scope, $http){

$scope.works = "Map is here"
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