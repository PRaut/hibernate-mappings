
DerivativeApp.controller('fileUploadController', function ($scope,$state, $http, uploadFileService) {		
	

	
	$scope.fileupload={};
	
	
	$scope.uploadFile = function(){
		alert("hi")
		var file = $scope.myFile;
		console.log(file);
		
		var requestInput=$scope.fileupload;
        var formData = new FormData();
		
		
        formData.append('file', file);
		formData.append('requestInput',JSON.stringify(requestInput));
		
		//console.log(formData);
        var response=uploadFileService.uploadFile(formData)
        .then(function(result){
			if(result.data.serviceStatus == "Success"){
				
							}
			else if(result.data.serviceStatus == "Fail"){
				console.log(result.data);
							}
		 },
		 function(error){
			console.error('Error while fetching pdf records' + JSON.stringify(error));
         });
  }	
	
});