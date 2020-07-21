var contains = function(needle) {
						    // Per spec, the way to identify NaN is that it is not equal to itself
						    var findNaN = needle !== needle;
						    var indexOf;

						    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
						        indexOf = Array.prototype.indexOf;
						    } else {
						        indexOf = function(needle) {
						            var i = -1, index = -1;

						            for(i = 0; i < this.length; i++) {
						                var item = this[i];

						                if((findNaN && item !== item) || item === needle) {
						                    index = i;
						                    break;
						                }
						            }

						            return index;
						        };
						    }

						    return indexOf.call(this, needle) > -1;
						};

DerivativeApp.controller('sidemenuController', function($state, $scope, $rootScope, userService, commonService){
	var splittedCookie = document.cookie.split(";", 5);
	splittedCookie.forEach(function(element){
		var splittedElement = element.split("=", 2);
		commonService.userCookies[splittedElement[0].trim()] = splittedElement[1];
		
	});	
	$scope.userMenu={};
	userService.getUserDetails()
	.then(function(response){
		$rootScope.logged_in_user = response.data.serviceResponse;
		$scope.initUserMenu ();
		
		
	});
	
	$scope.getUserDetails = function(){
		$rootScope.viewingProfile = true;
		userService.currentlyUserInView = $rootScope.logged_in_user;
		$state.go("userdetailsview");
			
	}
	
	$scope.initUserMenu = function(){
		var allRoles = $rootScope.logged_in_user.roles;
		var parentMenus = [];
		var midMenus = [];
		var subMenus = [];
		
		var parentNames = [];
		var midMenuNames = [];
		var subMenuNames = [];
		
		for(var roleMens = 0; roleMens < allRoles.length; roleMens++){
			var allMenus = allRoles[roleMens].menuRoles;
			for(var x = 0; x < allMenus.length; x++){
				if(allMenus[x].menu.type == 0){
					if(!contains.call(parentNames, allMenus[x].menu.name)){
						parentMenus.push(allMenus[x].menu);
						parentNames.push(allMenus[x].menu.name);
					}
				}else if(allMenus[x].menu.type == 1){
					if(!contains.call(midMenuNames, allMenus[x].menu.name)){
						midMenus.push(allMenus[x].menu);
						midMenuNames.push(allMenus[x].menu.name);
					}
				}else if(allMenus[x].menu.type == 2){
					if(!contains.call(subMenuNames, allMenus[x].menu.name)){
						subMenus.push(allMenus[x].menu);
						subMenuNames.push(allMenus[x].menu.name);
					}
				}
			}
		}
		for(var a = 0; a < parentMenus.length; a++){
			parentMenus[a].midMenus = [];
			for(var b = 0; b < midMenus.length; b++){
				if(midMenus[b].parent.id == parentMenus[a].id){
					parentMenus[a].midMenus.push(midMenus[b]);
				}
				parentMenus[a].midMenus[b].subMenus=[];
				for(var c = 0; c < subMenus.length; c++){
					if(subMenus[c].parent.id == midMenus[b].id){
						parentMenus[a].midMenus[b].subMenus.push(subMenus[c]);
					}
				}
			}
		}
		
		$rootScope.allUserMenu = parentMenus;
		userService.isAuthorized();
	}
	
	//localStorage.removeItem("loggedId");
});


DerivativeApp.controller('userController', function ($rootScope, $timeout, $scope,$state, $http,userService, roleService, growl) {
	 
		    $scope.names = [];
	    $scope.list = [];


		$scope.search=function(data){

			for(var i=0;i<$scope.list.length;i++)
			{
				if(data == $scope.list[i].id)
				{
					$scope.fname = $scope.list[i].name;
					$scope.emailId=$scope.list[i].emailId;

				}
			}

		}
		
		$scope.currentEditingRoleUserId;
		$scope.currentEditingUserRole = function(userId){
			$scope.currentEditingRoleUserId = userId;
		}	

		$scope.user_roles = [];
		$scope.getAllRoles = function(){
			roleService.getAllRoles()
				.then(function(response){
					/*$scope.user_roles = response.data.serviceResponse;*/
					for(var x =0; x < response.data.serviceResponse.length; x++){
						$scope.user_roles.push({
							id: response.data.serviceResponse[x].id,
							label: response.data.serviceResponse[x].name,
						});
					}
				});
		}
		$scope.getAllRoles();

		$scope.itemSelected = function(item){
			$scope.change.added.push(item.id)
			$scope.change.removed.pop(item.id)

			/*var requestData = {
				userId: $scope.currentEditingRoleUserId,
				roleId: item.id
			}

			roleService.addUserRole(requestData)
				.then(function(response){
					if(response.data.serviceStatus=='Success'){
						growl.success('role successfully added',{title: 'Success!', ttl:5000});
					}else{
						growl.error('operation failed',{title: 'Error!', ttl:5000});
					}
				});*/
		} 


		$scope.change = {}
		$scope.change.removed = []
		$scope.change.added = []

		$scope.itemUnSelected = function(item){
			$scope.change.removed.push(item.id)
			$scope.change.added.pop(item.id)
			/*var requestData = {
				userId: $scope.currentEditingRoleUserId,
				roleId: item.id
			}

			roleService.removeUserRole(requestData)
			.then(function(response){
				if(response.data.serviceStatus=='Success'){
					growl.success('role successfully removed' + item.label,{title: 'Success!', ttl:5000});
				}else{
					growl.error('operation failed',{title: 'Error!', ttl:5000});
				}
			});*/
		}

		$scope.userRolesEvents = {
			onItemSelect: $scope.itemSelected,
			onItemDeselect: $scope.itemUnSelected,
		};
		$scope.example13settings = { 
			idProperty: 'id',
			smartButtonMaxItems: 3, 
			showUncheckAll: false,
			showCheckAll: false,
			smartButtonTextConverter: function(itemText, originalItem) { 
			/*if (itemText === 'Jhon') {
				return 'Jhonny!'; 
											} */
				return itemText; 
			} 
		};


		$scope.applyRoleChanges = ()=>{
			for(let a =0; a < $scope.change.added.length; a++){
				$scope.change.added[a] = {
					userId: $scope.viewingUser.id,
					roleId: $scope.change.added[a]
				}
			}

			for(let a =0; a < $scope.change.removed.length; a++){
				$scope.change.removed[a] = {
					userId: $scope.viewingUser.id,
					roleId: $scope.change.removed[a]
				}
			}

			packet = {
				checker: $scope.user.checker,
				payload: [$scope.change]
			}			

			userService.applyRoleChanges(packet).then(function(response){
				if(response.data.serviceStatus=='Success'){
					growl.success('add/remove role request successful',{title: 'Success!', ttl:5000});
				}else{
					growl.error('operation failed',{title: 'Error!', ttl:5000});
				}
			});
		}
		
		
		$scope.searchs=function(data){
		
				var response=userService.searchUserServ(data).then(function(result){
					
					if(result.data.serviceStatus == "Success"){
						$scope.list = result.data.serviceResponse;						
						
						// $state.go('usermanagement');
						for(var i=0;i<$scope.list.length;i++)
						{
						 if(!contains.call($scope.names, $scope.list[i].cn)){
							 $scope.names.push($scope.list[i].cn);
						 }
						}
//					$scope.names.reduce((x, y) => x.findIndex(e => e==y)<0 ? [...x, y]: x, [])
					   for(var i=0;i<$scope.list.length;i++)
						{ 
							if(data == $scope.list[i].cn)
							{
								$scope.user = {
										username:$scope.list[i].username,
										name:$scope.list[i].givenName,
										email:$scope.list[i].mail
								}
			
			  
							}
			
						}
			
									return result.data;
			
						  }
						  else if(result.data.serviceStatus == "Fail"){
							  $scope.error=result.data.serviceError;
			
							  return result.data;
						  }
						 });
			}


$scope.saveUser=function(){

	packet = {
		checker: $scope.user.checker,
		payload: [$scope.user]
	}
var response=userService.saveUserServ(packet).then(function(result){
	if(result.data.serviceStatus == "Success"){
				growl.success('user added successfully' ,{title: 'Success!', ttl:5000});
	        	  $state.go('usermanagement');
	          }	      
	          else if(result.data.serviceStatus == "Fail"){
	        	  growl.error('operation failed',{title: 'Error!', ttl:5000});
	          }
});

	$timeout(function(){$scope.userAddResponse='';},5000);
}
  $scope.userDetails={};
  //$scope.userDetails.customRoles=[];  
$scope.getAllUsers = function(){
	var response=userService.findAllUsersServ(false).then(function(result){
		if(result.data.serviceStatus == "Success"){
				   $scope.userDetails = result.data.serviceResponse;
	        	   //$state.go('dash');	        	  	        	  
	       	         return result.data;

	          }	      
	          else if(result.data.serviceStatus == "Fail"){
	        	  $scope.error=result.data.serviceError;

	        	  return result.data;
	          }
			 });

}
		$scope.user = {}
		$scope.toggleEnableOrDisableUser = (user, option)=>{

			packet = {
				checker: $scope.user.checker,
				payload: [user.id]
			}


	    	userService.toggleEnableOrDisableUser(packet)
	    			.then(function(response){
	    				if(response.data.serviceStatus == 'Success' ){
	    					var op = (option=='enable')?'enabled':'disabled';
	    					growl.success('user ' +  op + ' request successful' ,{title: 'Success!', ttl:5000, enableHtml: false});
	    				}else{
	    					growl.error('operation failed',{title: 'Error!'});
	    				}
	    				$scope.getAllUsers();
					});
					
			
		}

		$scope.pageChange=function(){
			$state.go('usercreation');
		}
		
		$scope.getUserReports = function(data){
			$state.go('userReports');
		}

		$scope.viewingUser = {};
		$scope.getUserDetails = function(userId){
			$rootScope.viewingProfile = false;
			userService.getUserDetails()
				.then(function(response){
					userService.currentlyUserInView = response.data.serviceResponse;
					$state.go("userdetailsview");
				});
		}
		
		$scope.viewUser = function(userId){
			$rootScope.viewingProfile = false;
			userService.findUserById(userId)
				.then(function(response){
					userService.currentlyUserInView = response.data.serviceResponse;
					$state.go("userdetailsview");
				});
		}
		
		$scope.initUserDetails = function(){
			$scope.viewingUser = userService.currentlyUserInView;
		}


		$scope.loadCheckers = function(){
			userService.getCheckers()
				.then((response)=>{
					$scope.checkers = response.data.serviceResponse
				})
		}
});