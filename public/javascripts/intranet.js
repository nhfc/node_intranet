(function(){
	var app = angular.module('Intranet', []);
	
	app.controller('CallController', function($scope,$http){
		$scope.calls = {
			users: [],
			updateGroup: function(group) {
				users = groups['group'];
			}
		};
	});
})();