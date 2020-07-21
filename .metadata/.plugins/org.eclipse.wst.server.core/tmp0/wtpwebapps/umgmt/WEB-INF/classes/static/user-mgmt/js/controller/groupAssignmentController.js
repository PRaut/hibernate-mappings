
DerivativeApp.controller('groupAssignmentController', function ($timeout, $scope,$state, $http, userService, groupService, groupAssignmentService) {	
	$scope.names = [];
	$scope.groups = [];

	$scope.getAllUsers = function(){
		userService.findAllUsersServ(true)
		.then(function(response){
		
			if(response.data.serviceStatus == "Success"){
				
				/*$scope.names = response.data.serviceResponse;*/
				for(var x = 0; x < response.data.serviceResponse.length; x++){
					$scope.names.push(response.data.serviceResponse[x].id + " :: " + response.data.serviceResponse[x].username);
				}
				//$state.go('dash');  
				return response.data;	
			}else if(response.data.serviceStatus == "Fail"){
				$scope.error=response.data.serviceError;
				return response.data;
			}
		});
	}
	$scope.getAllUsers();
		
	$scope.getAllGroups = function(){
		var response=groupService.findAllGroupServ(true).then(function(response){
			if(response.data.serviceStatus == "Success"){
				for(var x = 0; x < response.data.serviceResponse.length; x++){
					$scope.groups.push(response.data.serviceResponse[x].id + " :: " + response.data.serviceResponse[x].name);
				}
				//$state.go('dash');	        	  	        	  
				return response.data;
			} else if(response.data.serviceStatus == "Fail"){
				$scope.error=response.data.serviceError;
				return response.data;
			}
		});
	}
	
	$scope.getAllGroups();

	$scope.associateGroupToUser = function(){
		var userId = $scope.groupToUser.user.split(" :: ")[0];
		var groupId = $scope.groupToUser.group.split(" :: ")[0];
		
		var selectedData = {
			userId: userId,
			groupId: groupId
		}
		groupAssignmentService.assocUserToGroup(selectedData)
		.then(function(response){
			if(response.data.serviceResponse == true){
				$scope.assocResponse = 'success';
			}else{
				$scope.assocResponse = 'fail';
				$scope.assocServiceError = response.data.serviceError;				
			}
			$timeout(function(){
				$scope.assocResponse = '';
			},
			2000)
		});
	}

});