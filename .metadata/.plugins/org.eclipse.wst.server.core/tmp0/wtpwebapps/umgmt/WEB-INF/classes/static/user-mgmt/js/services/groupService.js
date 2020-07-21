DerivativeApp.factory('groupService', function($http, $q, commonService) {
	var groupsServerURL=commonService.baseUrl+"/api/groups/"
	var usersServerURL=commonService.baseUrl+"/api/users/"
		 var dataValue="";
    return { 			  
    	createGroupServ:function(groupData)
		  {			
			  var deferred = $q.defer();
			  var createGroupUrl=groupsServerURL+"saveOrUpdateGroup";
				var req={
						method:'POST',
							url:createGroupUrl,
							headers: {
					               'content-type':'application/json'
					             },
					      data:groupData
				}
				$http(req).then(
			            function successCallback(response){
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
			                deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;
				
				 
	      },
		  //findAllGroupServ
		  findAllGroupServ:function(fetchOnlyActive)
		  {			
			  var deferred = $q.defer();
			  var findAllGroupUrl=groupsServerURL+"getAllGroups";
				var req={
						method:'GET',
							url:findAllGroupUrl,
							headers: {
					           'content-type':'application/json',
					        	
					        },
							params: {
								fetchOnlyActive: fetchOnlyActive,
							}
				}
				$http(req).then(
			            function successCallback(response){
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
			                deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;
				
				 
	      },
		  //update Group 
		  	  updateGroupServ:function(groupData)
		  {			
			  var deferred = $q.defer();
			  var updateGroupUrl=groupsServerURL+"saveOrUpdateGroup";
				var req={
						method:'POST',
							url:updateGroupUrl,
							headers: {
					               'content-type':'application/json'
					             },
					     data:groupData
				}
				$http(req).then(
			            function successCallback(response){
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
			                deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;
				
				 
	      },

			setGroupData:function(data){
            
			dataValue = data;
},
		getGroupData: function(){
         return dataValue;
		},

		toggleEnableOrDisableGroup: function(data){
			var deferred = $q.defer();
			var deleteUserURL=groupsServerURL+"toggleEnableOrDisableGroup";
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
		
		inGroupId:0,

		getGroupById: function(groupId){
			var deferred = $q.defer();
			var getGroupByIdURL =groupsServerURL+"getGroupById";
			var req={
				method:'GET',
				url:getGroupByIdURL,
				headers: {
					'content-type':'x-www-form-urlencoded'
				},
				params:{
					id:groupId,
				},
			}

			return $http(req);
		},

		removeUserFromGroup: function(requestData){
			var removeUserFromGroupURL =groupsServerURL+"removeUserFromGroup";
			  var req={
					  method:'POST',
						  url:removeUserFromGroupURL,
						  headers: {
								 'content-type':'application/json'
							   },
					   data:requestData
			  }
			  return $http(req);
		},

		removeReportFromGroup: function(requestData){
			var removeReportFromGroupURL = groupsServerURL+"removeGroupFromReports";
			  var req={
					  method:'POST',
						  url:removeReportFromGroupURL,
						  headers: {
								 'content-type':'application/json'
							   },
					   data:requestData
			  }
			  return $http(req);
		},

		addUserToGroup: function(requestData){
			var addUserToGroupURL =usersServerURL+"addUserToGroup";
			  var req={
					  method:'POST',
						  url:addUserToGroupURL,
						  headers: {
								 'content-type':'application/json'
							   },
					   data:requestData
			  }
			  return $http(req);
		},
		addReportToGroup: function(requestData){
			var addReportToGroupURL =groupsServerURL+"addReportToGroup";
			  var req={
					  method:'POST',
						  url:addReportToGroupURL,
						  headers: {
								 'content-type':'application/json'
							   },
					   data:requestData
			  }
			  return $http(req);
		},


	}
});