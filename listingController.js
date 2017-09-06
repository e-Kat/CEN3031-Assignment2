angular.module('listings').controller('ListingsController', ['$filter','$scope', 'Listings', 
  function($filter, $scope, Listings) {
    $scope.listings = Listings;
    $scope.detailedInfo = undefined;
    $scope.code = undefined;
    $scope.name = undefined;
    $scope.address = undefined;
    $scope.latitude = undefined;
    $scope.longitude = undefined;

    $scope.buildingCode = undefined;
    $scope.buildingName = undefined;
    $scope.buildingAddress = undefined;
    $scope.buildingLatitude = undefined;
    $scope.buildingLongitude = undefined;

    $scope.selected = 0;
    /* 
      Implement these functions in the controller to make your application function 
      as described in the assignment spec. 
     */
    $scope.addListing = function() {
      if($scope.buildingCode != undefined || $scope.buildingName != undefined){
        $scope.buildingCode = $filter('uppercase')($scope.buildingCode);
        $scope.buildingName = $filter('capitalize')($scope.buildingName);
        if($scope.buildingAddress != undefined){

          if($scope.buildingLatitude != undefined && $scope.buildingLongitude != undefined){
            var obj = {
              code: $scope.buildingCode,
              name: $scope.buildingName,
              address: $scope.buildingAddress,
              coordinates: {
                latitude: $scope.buildingLatitude,
                longitude: $scope.buildingLongitude
              }
            };
            $scope.listings.push(obj);
          }else{
            $scope.listings.push({ code: $scope.buildingCode, name: $scope.buildingName, address: $scope.buildingAddress});
          }
        }else{
          $scope.listings.push({ code: $scope.buildingCode, name: $scope.buildingName});
        }
      }
    };
    $scope.deleteListing = function(index) {
      $scope.listings.splice($scope.selected, 1);
    };
    $scope.showDetails = function(index) {
      $scope.selected = index;
      if(index == undefined){
        $scope.selected = 0;
        $scope.code = $scope.listings[0].code;
        $scope.name = $scope.listings[0].name;
        $scope.address = $scope.listings[0].address;
        $scope.latitude  = $scope.listings[0].coordinates.latitude;
        $scope.longitude = $scope.listings[0].coordinates.longitude;
      }else{
        $scope.code = $scope.listings[index].code;
        $scope.name = $scope.listings[index].name;

        if("address" in $scope.listings[index]){
          $scope.address = $scope.listings[index].address;
        }else{
          $scope.address = undefined;
        }

        if("coordinates" in $scope.listings[index]){
          $scope.latitude  = $scope.listings[index].coordinates.latitude;
          $scope.longitude = $scope.listings[index].coordinates.longitude;
        }else{
          $scope.latitude  = undefined;
          $scope.longitude = undefined;
        }
      }
    };

    $scope.showDetails();
  }
]);

angular.module('listings').filter('capitalize', function() {
  return function(input){
    if(input.indexOf(' ') !== -1){
      var inputPieces,
          i;
      input = input.toLowerCase();
      inputPieces = input.split(' ');
      for(i = 0; i < inputPieces.length; i++){
        inputPieces[i] = capitalizeString(inputPieces[i]);
      }
      return inputPieces.toString().replace(/,/g, ' ');
    }
    else {
      input = input.toLowerCase();
      return capitalizeString(input);
    }
    function capitalizeString(inputString){
      return inputString.substring(0,1).toUpperCase() + inputString.substring(1);
    }
  };
});