
//var serverURL="http://192.168.1.67:9191/SLRDerivative/api/viewreport";

DerivativeApp.factory('reportServices', function($http, $q, commonService) {
var pdfId;
	var reportServerUrl=commonService.baseUrl+"/api/reports/"
	return { 	

	viewCpval:function(fileName, date){
		
			  var deferred = $q.defer();
			  var serverurll=serverur+"viewreport";
			  //console.log(serverur);
				var req={
						method:'GET',
							url:serverurll,
							headers: {
					               'content-type':'application/json'
					             },
								 params:{'reportName':fileName,
								 'date': date}				
				}
		$http(req).then(
			            function successCallback(response){
			             //console.log(JSON.stringify(response));
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
							//console.log(JSON.stringify(response));
			                deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;

	},
	
	updatePostNewDel:function(postnewdealdata){
		
			  var deferred = $q.defer();
			  var postNewDealServerUrl=serverur+"updatePostNewDeal";
			  //console.log(serverur);
				var req={
						method:'POST',
							url:postNewDealServerUrl,
							headers: {
					               'content-type':'application/json'
					             },
							data: postnewdealdata				
				}
		$http(req).then(
			            function successCallback(response){
			             //console.log(JSON.stringify(response));
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
							//console.log(JSON.stringify(response));
			                deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;

	},
	
	updatePostTerminationDel:function(postnewdealdata){
		
			  var deferred = $q.defer();
			  var postTerminationDealServerUrl=serverur+"updatePostTerminationDeal";
			  //console.log(serverur);
				var req={
						method:'POST',
							url:postTerminationDealServerUrl,
							headers: {
					               'content-type':'application/json'
					             },
							data: postnewdealdata				
				}
		$http(req).then(
			            function successCallback(response){
			             //console.log(JSON.stringify(response));
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
							//console.log(JSON.stringify(response));
			                deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;

	},
	
	getBackDate:function(){
		
			  var deferred = $q.defer();
			  var backDateServerUrl=serverur+"previousDate";
			  //console.log(serverur);
				var req={
						method:'GET',
							url:backDateServerUrl,
							headers: {
					               'content-type':'application/json'
					             }											
					}
		$http(req).then(
			            function successCallback(response){
			             //console.log(JSON.stringify(response));
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
							deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;

	},
	
	getReportList:function(fetchActive){
		
			  var deferred = $q.defer();
			  var getAllReportsURL =reportServerUrl+"getAllReports?fetchOnlyActive=" + fetchActive;
			  //var getAllReportsURL ="http://localhost:9191/lhops/queries/getAllQueries?fetchWithQueries=true";
			  //console.log(serverur);
				var req={
						method:'GET',
							url:getAllReportsURL,
							headers: {
					               'content-type':'application/json'
								 }
					}
					return $http(req);

	},
	
	exportToExcelServ:function(filename,date){
		console.log(filename);
			  var deferred = $q.defer();
			  var excelExportServerUrl=serverur+"downloadReport";
			  //console.log(serverur);
				var req={
						method:'GET',
							url:excelExportServerUrl,
							headers: {
					               'content-type':'application/json'
					             },
							params:{'reportName':filename,
								 'date': date},
								responseType: 'arraybuffer'								 
				}
		$http(req).then(
			            function successCallback(response){
			            
			                    deferred.resolve(response);			                
			                return deferred.promise;
			            },
			            function errorCallback(response){
							//console.log(JSON.stringify(response));
			                deferred.reject(response);
			                return deferred.promise;
			            });
			        return deferred.promise;

	},
	
		setPdfId: function(data){
	    	  pdfId = data;
	      },
	      
	      getPdfId: function(){
	    	  return pdfId;
		  },
		  
		  createNewReport: function(requestData){
			var getAllReportsURL =reportServerUrl+"saveOrUpdateReport";
				var req={
					method:'POST',
					url:getAllReportsURL,
					headers: {
						   'content-type':'application/json'
					},
					data: requestData				
				}

				return $http(req);
		  },

		  toggleEnableOrDisableReport: function(requestData){
			var toggleReportURL = reportServerUrl+"toggleEnableOrDisableReport";
			var req={
				method:'POST',
				url:toggleReportURL,
				headers: {
					   'content-type':'x-www-form-urlencoded'
				},
				params: requestData				
			}

			return $http(req);
		  }
	};


	});