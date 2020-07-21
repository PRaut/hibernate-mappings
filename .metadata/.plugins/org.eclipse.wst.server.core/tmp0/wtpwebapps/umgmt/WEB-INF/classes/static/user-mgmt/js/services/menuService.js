

DerivativeApp.factory('menuService', function($http, commonService) {
	var menuServer=commonService.baseUrl+"/api/menus/"
	return {
		
        getAllMenus: function(){
            var getAllMenuURL=menuServer+"getAllMenus";
            var req={
                method:'GET',
                url:getAllMenuURL,
                headers: {
                    'content-type':'application/json'
                }
            }
            return $http(req);
        },
		
	}
});