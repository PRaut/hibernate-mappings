DerivativeApp.controller('counterPartyController', function ($scope,$state, $http,counterPartyService) {
	  $scope.showEmail = false;
	  var ids = 1;
	//$scope.choices = [{id: 'choice1'}];
	$scope.emails = [
                { id: 0, 'email': 'bob@gmail.com','escalation':'level-1' }
				
            ];
			
	   $scope.employees = [
                { id: 0, 'name': 'Anubhav', 'address': 'Ghaziabad', 'dept': 'Developer'}
            ];		
	$scope.saveRecord = {};
	  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
  $scope.counterParty = {};
  $scope.findEmails = {};
  $scope.addCounterParty=function(){	  
	 console.log(JSON.stringify($scope.counterParty));
	 var response=counterPartyService.saveCounterPartyServ($scope.counterParty).then(function(result){
		 if(result.data.serviceStatus == "Success"){
			 $scope.showEmail = true;
			 
			 return result.data; 
		 }     else if(result.data.serviceStatus == "Fail"){
			  $scope.showEmail = false;
	        	  console.log(result.data);
	        	  $scope.error=result.data.serviceError;
				  alert($scope.error);
	        	  return result.data;
	          }
		 
	 });
	  
  };
  $scope.findEmails = function(){
	console.log($scope.emailMaster.parentId);
	var response=counterPartyService.searchEmailIds($scope.emailMaster.parentId).then(function(result){
			 if(result.data.serviceStatus == "Success"){
			 $scope.emails = result.data.serviceResponse;
			 
			 return result.data; 
		 }     else if(result.data.serviceStatus == "Fail"){
			  $scope.showEmail = false;
	        	  console.log(result.data);
	        	  $scope.error=result.data.serviceError;
	        	  return result.data;
	          }
	});
	
  };
      $scope.saveRecord = function () {
		  
		 console.log(JSON.stringify($scope.emailMaster)+"-------"+JSON.stringify($scope.emailMaster));
		  var response = counterPartyService.saveEmailServ($scope.emailMaster).then(function(result){
			if(result.data.serviceStatus == "Success"){
			 
			 $scope.emails = result.data.serviceResponse;
			 
			 return result.data; 
		 }     else if(result.data.serviceStatus == "Fail"){
			  $scope.showEmail = false;
	        	  console.log(result.data);
	        	  $scope.error=result.data.serviceError;
	        	  return result.data;
	          } 
			  
		  });
            };
			$scope.deletes = function (data) {
        var response = counterPartyService.DeleteEmailServ(data).then(function(result){
			if(result.data.serviceStatus == "Success"){			 
			 $scope.emails = result.data.serviceResponse;			 
			 return result.data; 
		    }     
		    else if(result.data.serviceStatus == "Fail"){
			      $scope.showEmail = false;
	        	  console.log(result.data);
	        	  $scope.error=result.data.serviceError;
	        	  return result.data;
	          }  
			
			
		});
 
            }
			
			
            $scope.edit = function (id) {
				console.log(id);
                for (i in $scope.emails) {
                    if ($scope.emails[i].id == id) {
                        $scope.emailMaster = angular.copy($scope.emails[i]);
                    }
                }
            }
			
			

  
	
	
});