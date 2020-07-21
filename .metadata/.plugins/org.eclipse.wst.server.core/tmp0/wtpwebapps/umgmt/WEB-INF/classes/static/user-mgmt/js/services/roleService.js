
//var serverURL="http://192.168.1.67:9191/SLRDerivative/api/viewreport";

DerivativeApp.factory('roleService', function($http, $q, commonService) {
	var roleServerUrl=commonService.baseUrl+"/api/roles/"

    return {
    	menuAssignRole:{},
        getAllRoles: function(){
            var getAllRolesURL=roleServerUrl+"getAllRoles";
            var req={
                method:'GET',
                url:getAllRolesURL,
                headers: {
                    'content-type':'application/json'
                }
            }
            return $http(req);
        },

        removeUserRole : function(requestData){
            var removeUserRoleURL=roleServerUrl+"removeRoleUser";
            var req={
                method:'POST',
                url:removeUserRoleURL,
                headers: {
                    'content-type':'application/json'
                },
                data: requestData
            }
            return $http(req);
        },

        addUserRole : function(requestData){
            var addUserRoleURL=roleServerUrl+"addRoleToUser";
            var req={
                method:'POST',
                url:addUserRoleURL,
                headers: {
                    'content-type':'application/json'
                },
                data: requestData
            }
            return $http(req);
        },
        
        toggleEnableOrDisableRole: function(data){
    		var deferred = $q.defer();
    		var deleteRoleURL=roleServerUrl+"toggleEnableOrDisableRole";
    		var req={
    			method:'POST',
    			url:deleteRoleURL,
    			headers: {
    				'content-type':'x-www-form-urlencoded'
    			},
    			data:data,
    		}
    		return $http(req);
    	},
		
    	saveOrUpdateRole: function(requestData){
			var saveRoleURL =roleServerUrl+"saveOrUpdateRole";
				var req={
					method:'POST',
					url:saveRoleURL,
					headers: {
						   'content-type':'application/json'
					},
					data: requestData				
				}

				return $http(req);
		  },
		  
		  addRoleMenus:   function(requestData){
			var addRoleMenus =roleServerUrl+"addMenuRole";
				var req={
					method:'POST',
					url:addRoleMenus,
					headers: {
						   'content-type':'application/json'
					},
					data: requestData				
				}
				return $http(req);
		  },
        
    }
    
   
});