
DerivativeApp.factory('requestService', function($http, $q, commonService) {
    var url =commonService.baseUrl+"/api/check/"
    
    return {
        loadCheckerRequests: ()=>{
			 chkReq = url+"checker/get";
			var req={
					method:'GET',
					url:chkReq,
			}
			return $http(req);
        },

        loadMakerRequests: ()=>{
            makReq = url+"maker/get";
           var req={
                   method:'GET',
                   url:makReq,
           }
           return $http(req);
       },

        acceptRequest: (packet)=>{
            acceptURL = url+"accept";
            var req={
                method:'POST',
                url:acceptURL,
                params: packet
            }
           return $http(req);
        },

        rejectRequest: (packet)=>{
            rejectURL = url+"reject";
            var req={
                method:'POST',
                url:rejectURL,
                params: packet
            }
            return $http(req);
        },
    }
});