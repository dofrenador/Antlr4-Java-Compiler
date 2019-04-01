angular.module('regions').controller('RegionsController', ['$scope', 'Regions',
  function($scope, Regions) {
    $scope.regions = Regions;
    $scope.filteredList = undefined;
    console.log("function in controller running");

	$scope.WOEID_clicked = function(woeid, name) {
		update_chart(woeid, name);
	}

	$scope.share = function() {

	    var d = new Date();
	    var month = d.getMonth() + 1;
	    var date = '' + month + '/' + d.getDate() + '/' + d.getFullYear();
	    //var query = document.getElementById('regionSearch').value;
	    var data = '';

	    for (var i = 0; i < $scope.regions.length; i++) data += $scope.regions[i].woeid + new Array(13 - $scope.regions[i].woeid.toString().length).join(' ') + $scope.regions[i].name + '\n';
	    data = encodeURIComponent(data);

	    //if (query === undefined || query === '') query = 'Worldwide';
	    var email = 'mailto:' + '?subject=' + 'Twitter Analytics Trending Data for ' + date + '&body=' + data;

	    // encode for URL
	    window.open(email,"_self");
	}
  }
]);

console.log("regionController.js running");
