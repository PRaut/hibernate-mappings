

DerivativeApp.factory('userService', function($rootScope, $http, $q, commonService) {
	var usersServerURL= commonService.baseUrl+"/api/users/"
	return { 	
		
		usermenujson : [],
		isAuthorized: function(){
			var userMenu = $rootScope.allUserMenu;
			for(var x = 0; x < userMenu.length; x++){
				this.usermenujson.push(userMenu[x].action);
				for(var y = 0; y < userMenu[x].midMenus.length; y++){
					this.usermenujson.push(userMenu[x].midMenus[y].action);
					for(var z = 0; z < userMenu[x].midMenus[y].subMenus.length; z++){
						this.usermenujson.push(userMenu[x].midMenus[y].subMenus[z].action);
					}
				}
				
			}
		},
		
	searchUserServ:function(data){
			  var deferred = $q.defer();
			  var adSearchUrl="../api/adSearch/"+data;
				var req={
						method:'GET',
							url:adSearchUrl,
							headers: {
					               'content-type':'application/json'
					             },
				
				}
		return $http(req)
	},

saveUserServ:function(UserData){
			var deferred = $q.defer();
			  var saveUserUrl=usersServerURL+"saveOrUpdateUser";
	var req={
						method:'POST',
							url:saveUserUrl,
							headers: {
					               'content-type':'application/json'
					             },
							data:UserData
				}

				
		return $http(req);


},
findAllUsersServ : function(fetchOnlyActive){
			  var deferred = $q.defer();
			  var findAllGroupUrl=usersServerURL+"getAllUsers";
				var req={
						method:'GET',
							url:findAllGroupUrl,
							headers: {
					               'content-type':'application/json'
								 },
							params: {
								fetchOnlyActive: fetchOnlyActive,
							}
					     
				}
				return $http(req);

}, 
	toggleEnableOrDisableUser: function(data){
			var deferred = $q.defer();
			var deleteUserURL=usersServerURL+"toggleEnableOrDisableUser";
			var req={
				method:'POST',
				url:deleteUserURL,
				headers: {
					'content-type':'x-www-form-urlencoded'
				},
				data:data,
			}
			
			return $http(req);
			//return deferred.promise;
		},

		findUserById : function(userId){
			var findUserByIdURL=usersServerURL+"getUserById?id="+userId;
			var req={
					method:'GET',
					url:findUserByIdURL,
			}
			return $http(req);
		},
		
		getUserDetails: function(){
			console.log(userDetailsURL)
			var userDetailsURL = usersServerURL+"getUserDetails";
			var req={
					method:'GET',
					url:userDetailsURL,
			}
			return $http(req);
		},
		getCheckers: function(){
			console.log(userDetailsURL)
			var userDetailsURL = usersServerURL+"checker/get";
			var req={
					method:'GET',
					url:userDetailsURL,
			}
			return $http(req);
		},

		applyRoleChanges: function(data){
			console.log(data)
			var req={
					method:'POST',
					url:commonService.baseUrl+"/api/roles/addRemoveRole",
					headers: {
						'content-type':'application/json'
					  },
					data: data
			}
			return $http(req);
		},
		currentlyUserInView:[],

	}
});