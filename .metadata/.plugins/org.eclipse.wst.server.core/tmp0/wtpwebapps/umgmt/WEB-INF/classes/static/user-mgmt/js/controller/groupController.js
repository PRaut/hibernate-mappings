
DerivativeApp.controller('groupController', function ($timeout, $scope,$state, $http,groupService,reportServices, growl, userService, $rootScope) {	
	$scope.abc = "HR"
$rootScope.group={};
		$scope.groups = ["GRP1000", "GRP1001", "GRP1002", "GRP1003", "GRP1004", "GRP1005", "GRP1006"];
		$scope.group=[];
	    $scope.groupDetails=[   
			{
			"id": "GRP1000",
			"gName": "GROUP0",
			"gDesc":"Description...."
			}

]
$scope.name="";
$scope.email="";
$scope.description="";

$scope.groupData = {} ;

$scope.createGroup = function(){

	packet = {
		checker: $scope.user.checker,
		payload: [$scope.groupData]
	}

	var response=groupService.createGroupServ(packet).then(function(result){
		if(result.data.serviceStatus == "Success"){
			growl.success('group successfully created',{title: 'Success!', ttl:5000});    
			$state.go("groupmanagement");
	          }	      
	          else if(result.data.serviceStatus == "Fail"){
	        	  
				  $scope.error=result.data.serviceError;
				  $scope.groupAddResponse = 'fail';  
	          }
			 });

		$timeout(function(){
			$scope.groupAddResponse='';
		}, 5000);

},

$scope.findAllGroup = function(){
	var response=groupService.findAllGroupServ(false).then(function(result){
		if(result.data.serviceStatus == "Success"){
    
                   $scope.groupDetails = result.data.serviceResponse;				  
	        	   //$state.go('dash');	        	  	        	  
	       	         return result.data;

	          }	      
	          else if(result.data.serviceStatus == "Fail"){
	        	  $scope.error=result.data.serviceError;

	        	  return result.data;
	          }
			 });

}
//$scope.group = {};
$scope.updateGroup = function(){
  	var response=groupService.updateGroupServ($scope.datas).then(function(result){
		if(result.data.serviceStatus == "Success"){
   
                   $scope.groupDetails = result.data.serviceResponse;				  
	        	   $state.go('groupmanagement');	        	  	        	  
	       	         return result.data;

	          }	      
	          else if(result.data.serviceStatus == "Fail"){
	        	  $scope.error=result.data.serviceError;

	        	  return result.data;
	          }
			 });
 

}


$scope.datas = groupService.getGroupData();

$scope.editGroup = function(groupDetails){
     groupService.setGroupData(groupDetails);
		$state.go('groupUpdate');
};

	$scope.user = {}
	$scope.toggleEnableOrDisableGroup = function(group, option){

		packet = {
			checker: $scope.user.checker,
			payload: [group.id]
		}

    	groupService.toggleEnableOrDisableGroup(packet)
    			.then(function(response){
    				$scope.findAllGroup();
    				if(response.data.serviceStatus=='Success'){
    					var op = (option=='enable')?'enabled':'disabled';
    					growl.success('group ' +  op + ' request successful' ,{title: 'Success!', ttl:5000});
    				}else{
    					growl.error('operation failed',{title: 'Error!', ttl:5000});
    				}
    			});
    		  
		
	}

	
	$scope.initInGroupData=function(){
		groupService.getGroupById(groupService.inGroupId)
		.then(function(response){
			$scope.inGroupName = response.data.serviceResponse.name;
			$scope.userDataInGroup = response.data.serviceResponse.users;
			$scope.reportDataInGroup = response.data.serviceResponse.reports;
		});
		//$scope.userDataInGroup
	}


	$scope.getGroupUsers = function(groupId){
		groupService.inGroupId = groupId;
		$state.go("editUsersInGroup");
	}
	
	$scope.getGroupReports = function(groupId){
		groupService.inGroupId = groupId;
		$state.go("editReportsInGroup");
	}
	$scope.changepage=function(){
		$state.go('groupcreations');
	}

	$scope.names = [];
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
	//$scope.getAllUsers();
	
	$scope.confirmRemoveUserFromGroup = function(){
		
	}
	$scope.removeUserFromGroup = function(userId){
		$('#uig_'+userId).confirmation({
    		popout:true,
    		onConfirm: function() {
    			var requestData = {
    					userId: userId,
    					groupId: groupService.inGroupId
    				}
    				groupService.removeUserFromGroup(requestData)
    					.then(function(response){
    						if(response.data.serviceStatus=='Success'){
    							growl.success('User successfully removed',{title: 'Success!', ttl:5000});
    						}else{
    							growl.error('operation failed',{title: 'Error!', ttl:5000});
    						}
    						$scope.initInGroupData();
    					});
    		  },
    		  onCancel: function() {
    		  },
    	});
		
		
	}

	$scope.removeReportFromGroup = function(reportId){
		
		$('#rig_'+reportId).confirmation({
    		popout:true,
    		onConfirm: function() {
    			var requestData = {
    					reportId: reportId,
    					groupId: groupService.inGroupId
    				}
    				groupService.removeReportFromGroup(requestData)
    				.then(function(response){
    					if(response.data.serviceStatus=='Success'){
    						growl.success('report successfully removed',{title: 'Success!', ttl:5000});
    					}else{
    						growl.error('operation failed',{title: 'Error!', ttl:5000});
    					}
    					$scope.initInGroupData();
    				});
    		  },
    		  onCancel: function() {
    		  },
    	});
		
		
	}

	$scope.addUserToGroup = function(userData){
		var requestData = {
			userId: userData.split(" :: ")[0],
			groupId: groupService.inGroupId,
		}

		groupService.addUserToGroup(requestData)
			.then(function(response){
				if(response.data.serviceStatus=='Success'){
					growl.success('user successfully added',{title: 'Success!', ttl:5000});
				}else{
					growl.error('operation failed',{title: 'Error!', ttl:5000});
				}
				$scope.initInGroupData();
				$scope.groupToUser.user = "";
			});
	}

	// This has to be changed after service changes
	$scope.groups = [];
	$scope.getAllReports = function(){
		reportServices.getReportList(true)
		
		.then(function(response){		
			if(response.status == 200){
				
				for(var x = 0; x < response.data.serviceResponse.length; x++){
					$scope.groups.push(response.data.serviceResponse[x].id + " :: " + response.data.serviceResponse[x].reportName + " :: " + response.data.serviceResponse[x].country);
				}
				//$state.go('dash');  
				return response.data;	
			}else if(response.data.serviceStatus == "Fail"){
				$scope.error=response.data.serviceError;
				return response.data;
			}
			
		});
	}
	//$scope.getAllReports();

	$scope.addReportToGroup = function(userData){
		var requestData = {
			reportId: userData.split(" :: ")[0],
			groupId: groupService.inGroupId,
		}
		groupService.addReportToGroup(requestData)
		
			.then(function(response){
				if(response.data.serviceStatus=='Success'){
					growl.success('report successfully added',{title: 'Success!', ttl:5000});
				}else{
					growl.error( 'operation failed',{title: 'Error!', ttl:5000});
				}
				$scope.initInGroupData();
				$scope.groupToUser.group = "";
			});
	}


	
$scope.loadCheckers = function(){
	userService.getCheckers()
		.then((response)=>{
			$scope.checkers = response.data.serviceResponse
		})
}
});