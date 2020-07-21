
DerivativeApp.controller('reportsController', function ($timeout, $scope,$rootScope,$state, $http, reportServices, growl,
$stateParams) {		
	var date = new Date();
		date.setDate(date.getDate() - 1);
		var yesterDay = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
	
	$scope.dtpSearch;
	
	$scope.error = false;
	$scope.isLoading = true;
	$scope.disable=false;
	
	$scope.reportList=["CP VAL","CP VAL to DMD","Post New Deal Documentation","Post Termination Deal Documentation","Trade Day MTM exceeding LIMIT as per Derivative Policy",
	"MTM Auto mailer","NPI data","Recovery Report","Contingent Liability","Contract Derivatives Benchmark","DSB Real Estate Corporate",
	"DSB XI","Overdue Report","Standard Asset Provisioning","Banking Group Return","FSI","IBS","ICDS","RBI MTM Return","RBI MTM Product wise Details",
	"RBI FSU Network Analysis","RBS(Tranche i & IA)","Sharing of Information","Note to Account","Annual Certificate"];
	
	$scope.viewReportList;
	$scope.headers;
	
	
	$scope.viewReport1=function(reportName){		
		//var date = new Date();
		//date.setDate(date.getDate() - 1);
		//var yesterDay = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();		
		var result = { fileName:reportName, date:$scope.dtpSearch };
		sessionStorage.setItem('fileName',"");
		if(reportName=="Post New Deal Documentation"){
			$state.go('postnewdealreport', {obj:result});
		}
		else if(reportName=="Post Termination Deal Documentation"){
				$state.go('postterminatiodealreport', {obj:result});
		}
		else{
		
		$state.go('viewReport', {obj:result});
		}
	}
	
	
	$scope.list = $stateParams.obj;
	//$scope.postnewdealdata=$scope.list.newdealdata;
	// function report view
	$scope.viewReport=function(){		
	$scope.error='';
	$scope.isLoading = false;
	$scope.disable=true;	
	
	$scope.filename = sessionStorage.getItem('fileName');
	
	if($scope.filename ==null || $scope.filename=="")
	{
		$scope.filename=$scope.list.fileName;
		sessionStorage.setItem('fileName',$scope.list.fileName);		
	}
	if($stateParams.backdate){
		alert($stateParams.backdate);
		$scope.date=$stateParams.backdate;
		$scope.dtpSearch=$stateParams.backdate;
		//$scope.viewReport();
	}
	else{
		$scope.dtpSearch=$stateParams.obj.date;
		$scope.date=$scope.dtpSearch;	
	}
//console.log($scope.date);	
		

		var response=reportServices.viewCpval($scope.filename,$scope.date).then(function(result){
			//console.log(JSON.stringify(result.data.serviceResponse))
			if(result.data.serviceStatus == "Success"){
	        	$scope.isLoading = false; 	
				//console.log(JSON.stringify(result.data.serviceResponse))
			$scope.headers=	result.data.serviceResponse.header;
			$scope.viewReportList= result.data.serviceResponse.report;
				$scope.disable=false;        	
			//console.log('function(success) ' +$scope.disable);
	          }	  
				else if(result.data.serviceStatus == "Fail"){
					
	        	// console.log(result.data);
				 $scope.isLoading = false; 
				 $scope.viewReportList=[];
				 $scope.disable=false;
				   //$scope.isStatus='Data not exist';
	        	  $scope.error=result.data.serviceError;
				 // console.log('function(fail) ' +$scope.disable);
	        	  return result.data;
					} 
				  
		},
		function(response) {
			$scope.error='Data not exist';
			$scope.disable=false;
			//console.log('function(response) ' +$scope.disable);
		}
	)};
	
	$scope.dateDiff=function(postnewdealdata){
		
		if($scope.postnewdealdata.term_SHEET_RECEIVE_DATE !=null && $scope.postnewdealdata.term_SHEET_RECEIVE_DATE != "")
		$scope.postnewdealdata.termsheet_AGING=$scope.daysDiff(postnewdealdata.term_SHEET_RECEIVE_DATE,postnewdealdata.deal_DATE);
	
	if($scope.postnewdealdata.back_OFFICE_RECEIVE_DATE !=null && $scope.postnewdealdata.back_OFFICE_RECEIVE_DATE !="")
	$scope.postnewdealdata.back_OFFICE_AGING=$scope.daysDiff(postnewdealdata.back_OFFICE_RECEIVE_DATE,postnewdealdata.deal_DATE);
	if($scope.postnewdealdata.under_DECLARATION_RECEIVE_DATE !=null && $scope.postnewdealdata.under_DECLARATION_RECEIVE_DATE !="")
	$scope.postnewdealdata.under_DECLARATION_AGING=$scope.daysDiff(postnewdealdata.under_DECLARATION_RECEIVE_DATE,postnewdealdata.deal_DATE);
	if($scope.postnewdealdata.under_DOCUMENT_RECEIVE_DATE !=null && $scope.postnewdealdata.under_DOCUMENT_RECEIVE_DATE !="")
	$scope.postnewdealdata.underlying_DOCUMENT_AGING=$scope.daysDiff(postnewdealdata.under_DOCUMENT_RECEIVE_DATE,postnewdealdata.deal_DATE);
};
	
	
	$scope.daysDiff=function(selectedDate,dealDate){
		//console.log(selectedDate);
			//console.log(dealDate);
		var date2 = new Date(dealDate);
		var date1 = new Date(selectedDate);
		var timeDiff = Math.abs(date2.getTime() - date1.getTime());   
		var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
		
		return diffDays;
	};
	
	$scope.editgetdataPostNewDeal=function(){
		
		//console.log($scope.filename);
		$scope.filename = sessionStorage.getItem('fileName');
		if($scope.filename ==null || $scope.filename=="")
	{
		$scope.filename=$scope.list.fileName;
		sessionStorage.setItem('fileName',$scope.list.fileName);		
	}
		$scope.postnewdealdata=$scope.list.newdealdata;
		$scope.dtpSearch=$stateParams.date
		//console.log($stateParams.date);
		//var result = { newdealdata:postnewdeal};		
		//$state.go('editpostnewdeal',{obj:result});
	};
		
		$scope.editPostNewDeal=function(postnewdeal){
		
		//console.log($scope.filename);
		var result = { newdealdata:postnewdeal,fileName:$scope.filename};		
		$state.go('editpostnewdeal',{obj:result,date:$scope.dtpSearch});
	}
	
	
		$scope.editPostTerminationDeal=function(postnewdeal){
		
		//console.log($scope.filename);
		var result = { newdealdata:postnewdeal,fileName:$scope.filename};		
		$state.go('editpostterminationdeal',{obj:result,date:$scope.dtpSearch});
	}
	
	//updatePostNewDeal
	
	$scope.updatePostNewDealDocumentation=function(){
		//console.log($scope.postnewdealdata);
		var response=reportServices.updatePostNewDel($scope.postnewdealdata).then(function(result){
			//sconsole.log(JSON.stringify(result));
			if(result.data.serviceStatus == "Success"){
			var objc={ fileName:sessionStorage.getItem('fileName'), date:$scope.dtpSearch };	
			//console.log(objc);
				$state.go('postnewdealreport',{obj:objc,backdate:$scope.dtpSearch});
			}else if(result.data.serviceStatus == "Fail"){
				$scope.error=result.data.serviceError; 
			}
		},
		function(response) {
			$scope.error='Data not exist';
			$scope.disable=false;
		}	
	)};
	
	$scope.downloadicon='fa fa-download';
		$scope.downloadReport=function(fileN){
			
			$scope.downloadicon='fa fa-circle-o-notch fa-spin fa-3x fa-fw';	 
			//$scope.filename = sessionStorage.getItem('fileName');
	
	//if($scope.filename ==null || $scope.filename=="")
	//{
	//	$scope.filename=$scope.list.fileName;
	//	sessionStorage.setItem('fileName',$scope.list.fileName);		
	//}
	if($stateParams.backdate){
		//alert($stateParams.backdate);
		$scope.date=$stateParams.backdate;
		$scope.dtpSearch=$stateParams.backdate;
	}
	else{
		$scope.date=$scope.dtpSearch;	
	}
	if($scope.filename==null || $scope.filename=="")
	$scope.filename=fileN;
		var response=reportServices.exportToExcelServ($scope.filename,$scope.date).then(function(result){
			 var file = new Blob([result.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"});
						//console.log(file);
						
					
				         var fileURL = (window.URL || window.webkitURL).createObjectURL(file);
						 
						 var link = angular.element('<a/>');
                link.attr({
                    href : fileURL,
                    download : $scope.filename+$scope.date+".xlsx"
                })[0].click();
						 
			 $scope.downloadicon='fa fa-download';      
				        // window.open(fileURL);
		},

		)};
		
	
		
	$scope.updatePostTerminationDealDocumentation=function(){
		//console.log($scope.postnewdealdata);
		var response=reportServices.updatePostTerminationDel($scope.postnewdealdata).then(function(result){
			//sconsole.log(JSON.stringify(result));
			if(result.data.serviceStatus == "Success"){
			var objc={ fileName:sessionStorage.getItem('fileName'), date:$scope.dtpSearch };	
			
				$state.go('postterminatiodealreport',{obj:objc,backdate:$scope.dtpSearch});
			}else if(result.data.serviceStatus == "Fail"){
				$scope.error=result.data.serviceError; 
			}
		},
		function(response) {
			$scope.error='Data not exist';
			$scope.disable=false;
		}	
	)};
	
	$scope.getReportList=function(fetchOnlyActive){
	//console.log(JSON.stringify(result));		
			reportServices.getReportList(fetchOnlyActive).then(function(result){
			
			$scope.reportlist=result.data;
			/*if(result.data.serviceStatus == "Success"){
			$scope.reportlist=result.data;
			console.log(JSON.stringify($scope.reportlist));
			}else if(result.data.serviceStatus == "Fail"){
				$scope.error=result.data.serviceError; 
			}*/
		},
		function(response) {
			$scope.error='Data not exist';
			$scope.disable=false;
		}	
	)};
	
	 $scope.getPreviousDate=function(){
		var response=reportServices.getBackDate().then(function(result){
		
		
		var timestamp = result.data.serviceResponse;
		var date = new Date(timestamp);		
		var datevalues = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
		   datevalues=datevalues.replace('-','/')  ;
		    datevalues=datevalues.replace('-','/')  ;
			$scope.dtpSearch=datevalues;
		//console.log(JSON.stringify(datevalues));
	}
	)}; 
	//init();

	$scope.createReport = function(){
		var requestData = {
			reportName: $scope.reportData.name
		}
		reportServices.createNewReport(requestData)
			.then(function(response){
				if(response.data.serviceResponse == true){
					growl.success( 'report successfully created',{title: 'Success!', ttl:5000});
					$state.go("reportmanagement");
				}else{
					$scope.reportAddResponse = 'fail';
					$scope.reportAddServiceError = response.data.serviceError;
				}

				$timeout(function(){
					$scope.reportAddResponse = '';
				}, 5000);
			});
	}

	$scope.toggleEnableOrDisableReport = function(report, option){
		
		$('#'+option+'_'+report.id).confirmation({
    		popout:true,
    		onConfirm: function() {
    			var requestData = {
    					id: report.id
    				}
    				reportServices.toggleEnableOrDisableReport(requestData)
    					.then(function(response){
    						if(response.data.serviceStatus=='Success'){
    	    					var op = (option=='enable')?'enabled':'disabled';
    	    					growl.success('report successfully ' +  op,{title: 'Success!', ttl:5000});
    						}else{
    							growl.error('operation failed',{title: 'Error!', ttl:5000});
    						}
    						$scope.getReportList(false);
    					});
    		  },
    		  onCancel: function() {
    		  },
    	});
		
	}
	
	
	
	
});