DerivativeApp.factory('APIInterceptor' ,['commonService' ,function (commonService, growl) {
	  return {
		  request: function(config) {
			  $(".se-pre-con").show();
			  config.headers['Authorization'] = 'Token ' + commonService.userCookies["access-token"];
		      config.headers['content-type'] = 'application/json';
		      return config;
		    },

		    requestError: function(config) {
		    	$(".se-pre-con").hide();
		      return config;
		    },

		    response: function(res) {
		    	$(".se-pre-con").hide();
		    	return res;
		    },

		    responseError: function(res) {
		    	$(".se-pre-con").hide();
		    	if(res.data.status == 401 || res.data.error == "Unauthorized"){
		    		commonService.userCookies={};
		    		document.cookie='access-token=;Path=/';
		    		document.cookie='loggedId=;Path=/';
			    	//growl.error(res.data.message, {title: "Error !", ttl:5000});
			    	setTimeout(function(){
				    	window.location.href = '../';
			    	}, 2000)
		    	}
		      return res;
		    }
		  }
		}]);
