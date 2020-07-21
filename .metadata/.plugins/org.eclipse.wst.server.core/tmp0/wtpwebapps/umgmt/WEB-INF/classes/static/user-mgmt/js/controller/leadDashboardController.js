
DerivativeApp.controller('leadDashboardController', function ($scope,$state, leadDashboardService, $http) {	
	$scope.error=false;
	$scope.email = "";
	
	$scope.leadrecordData={};
	$scope.leadRecord2= function(){
		
		console.log('LEAD DASH');
		 var response=leadRecordService.leadRecordServ($scope.leadrecordData).then(function(result){

	          if(result.data.serviceStatus == "Success"){
	        	  
	        	  console.log(JSON.stringify(result.data));	        	  
	        	  $state.go('leaddash');	        	  	        	  
	       	         return result.data;
	       	         
	          }
	          if(result.data.serviceResponse != null)
	        	  {
	        	  $state.go('verify&updatePassword');
	        	  }
	          else if(result.data.serviceStatus == "Fail"){
	        	  console.log(result.data);
	        	  $scope.error=result.data.serviceError;
		     	
	        	  return result.data;
	          }
			 },
		 function(response){	
			 $.Notify({
	         		
	     		    caption: 'Error',
	     		    content: response.data.serviceError,
	     		    	type: 'alert'	     		   			 
	     		});

            return response.data;
		 });
	
 }
	
});