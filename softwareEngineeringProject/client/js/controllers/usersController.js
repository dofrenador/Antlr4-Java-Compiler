angular.module('users').controller('UsersController', ['$scope', 'Users',
	function($scope, Users) {
		$scope.users = Users;

		$scope.search_user = function() {
			var query = $("#userSearchBar").val();

			$.ajax({
				url: "/search_user",
				type: "POST",
				data: {
					query: query
				},
				success: function(data){
					$scope.users = data;
					$scope.$apply();
				}
			});
		}
	}
]);
