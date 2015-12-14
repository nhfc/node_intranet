(function(){
	var app = angular.module('Intranet', []);
	
	app.controller('CallController', function($scope,$http){
		$scope.calls = {
			selected: {},
			users: [],
			updateGroup: function() {
				this.users = ["z", "y", "tr"];
			},
			
		};
		
		$scope.selectGroup = function(){
			$scope.members = [];
			for (i = 0; i < $scope.groups.length; i++) {
				if ($scope.selected.group === $scope.groups[i]._id ) {
					$scope.members = $scope.groups[i].members;
					break;
				}
			}
		}  
	});
})();