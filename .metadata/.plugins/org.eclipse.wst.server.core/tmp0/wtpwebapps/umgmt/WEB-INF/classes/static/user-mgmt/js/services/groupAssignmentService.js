
DerivativeApp.factory('groupAssignmentService', function($http, $q, commonService) {
    var groupsServerURL=commonService.baseUrl+"/api/groups/"
    var usersServerURL=commonService.baseUrl+"/api/users/"
    
    return {
        assocUserToGroup:function(assocReq){
            var deferred = $q.defer();
            var addUserToGroupURL=usersServerURL+"addUserToGroup";
              var req={
                method:'POST',
                url:addUserToGroupURL,
                data:assocReq
              }
            return $http(req).then(
                function successCallback(response){
                    deferred.resolve(response);			                
                    return deferred.promise;
                },
                function errorCallback(response){
                deferred.reject(response);
                return deferred.promise;
            });
            return deferred.promise;
        }
    }
});