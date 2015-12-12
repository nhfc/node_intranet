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
		/*$scope.$watch('selected.group', function(v){
			$scope.calls.members = ["a", "b", "c"]	
			});*/
	});
})();