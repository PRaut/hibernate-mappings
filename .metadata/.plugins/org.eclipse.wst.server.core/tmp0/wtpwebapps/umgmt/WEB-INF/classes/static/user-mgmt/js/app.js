var DerivativeApp = angular.module('DerivativeApp', ['angular-growl', 'ui.router', 'angularjs-dropdown-multiselect']);
DerivativeApp.run(function() {
	
   
	
});	

DerivativeApp.config(function($stateProvider, $httpProvider, $urlRouterProvider,$locationProvider)
{
	//$httpProvider.defaults.headers.common["Authorization"] = "Token " + newJson["access-token"];
	 
	$httpProvider.interceptors.push('APIInterceptor');
$stateProvider		
	
      .state("usercreation", {
        url: "/usercreation",
        templateUrl: "usercreation.html",
        controller:'userController',
		service:'userService',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'usercreation')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}
    })
    .state("userdetailsview", {
        url: "/userdetailsview",
        templateUrl: "userdetailsview.html",
        controller:'userController',
		service:'userService',
    })
	
	      .state("summaryReports", {
        url: "/summaryReports",
        templateUrl: "summaryReports.html",
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'usercreation')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}		
    })
	
	      .state("trackEmail", {
        url: "/trackEmail",
        templateUrl: "trackEmail.html",
		controller:'userController',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'trackEmail')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}	
       		
    })
	
	.state("userReports", {
        url: "/userReports",
        templateUrl: "usermanagement.html",
        controller:'userController',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'userReports')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}		
    })
	.state("usermanagement", {
        url: "/usermanagement",
        templateUrl: "usermanagement.html",
        controller:'userController',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'usermanagement')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}		
    })
	.state("fileupload", {
        url: "/fileupload",
        templateUrl: "fileupload.html",
        controller:'fileUploadController',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'fileupload')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}		
    })
	    
		.state("reports", {
        url: "/reports",
        templateUrl: "reports.html",
        controller:'reportsController',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'reports')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}		
    })
	
		.state("viewReport", {
        url: "/viewReport",
        templateUrl: "viewReport.html",
        controller:'reportsController',
		params: {
			obj: null
		}
    })
	
	.state("postnewdealreport", {
        url: "/postnewdealreport",
        templateUrl: "postNewDealView.html",
        controller:'reportsController',
		params: {
			obj: null,
			backdate: null
		}
    })
	
	.state("postterminatiodealreport", {
        url: "/postterminatiodealreport",
        templateUrl: "postTerminationDealView.html",
        controller:'reportsController',
		params: {
			obj: null,
			backdate: null
		}	
    })
	
	.state("reportMaster", {
        url: "/reportMaster",
        templateUrl: "reportMaster.html",
        controller:'reportsController'
    })
    .state("reportCreation", {
        url: "/reportCreation",
        templateUrl: "reportCreation.html",
        controller:'reportsController'	,
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'reportCreation')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}	
    })
    .state("reportmanagement", {
        url: "/reportmanagement",
        templateUrl: "reportmanagement.html",
        controller:'reportsController'	,
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'reportmanagement')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}	
    })
	
	.state("editpostnewdeal", {
        url: "/editpostnewdeal",
        templateUrl: "editPostNewDeal.html",
        controller:'reportsController',
		params: {
			obj: null,
			date: null
		}		
    })
	
	.state("editpostterminationdeal", {
        url: "/editpostterminationdeal",
        templateUrl: "editPostTerminationDealView.html",
        controller:'reportsController',
		params: {
			obj: null,
			date: null
		}	
    })
	
		.state("groupcreations", {
        url: "/groupcreations",
        templateUrl: "groupCreations.html",
		controller:'groupController',
		service:'groupService',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'groupcreations')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}
		
    })
	
	.state("groupmanagement", {
        url: "/groupmanagement",
        templateUrl: "groupmanagement.html",
		controller:'groupController',
		service:'groupService',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'groupmanagement')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}
    })
	
	.state("groupUpdate", {
        url: "/groupUpdate",
        templateUrl: "groupUpdate.html",
		controller:'groupController',
		service:'groupService'
    })
	
	
	     .state("groupUserAssignment", {
        url: "/groupUserAssignment",
        templateUrl: "groupUserAssignment.html",
        controller:'groupAssignmentController'
    })
	
	.state("holidayMaster", {
        url: "/holidayMaster",
        templateUrl: "holidayMaster.html"
       	
    })	
	
		.state("counterPartyMaster", {
        url: "/counterPartyMaster",
        templateUrl: "counterPartyMaster.html",
        controller:'counterPartyController'
       	
    })
	
	.state("underConstruction", {
        url: "/underConstruction",
        templateUrl: "underConstruction.html"
        	
    }).state("editAssoc", {
        url: "/editAssoc",
        templateUrl: "AssocPanel.html"
		
    }).state("editUsersInGroup", {
        url: "/editUsersInGroup",
        templateUrl: "UsersInGroupManagement.html",
		controller:'groupController',
		service:'groupService'
    })
    .state("editReportsInGroup", {
        url: "/editReportsInGroup",
        templateUrl: "ReportsInGroupManagement.html",
		controller:'groupController',
		service:'groupService'
    })
    .state("login", {
        url: "/login",
        templateUrl: "templates/login.html"
    })
	.state("dash", {
        url: "/dash",
        templateUrl: "dashboard.html"
		
    })
    .state("roleManagement", {
        url: "/roleManagement",
        templateUrl: "roleManagement.html",
		controller:'rolesController',
		service:'roleService',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'roleManagement')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}
    })
    .state("roleCreation", {
        url: "/roleCreation",
        templateUrl: "roleCreation.html",
		controller:'rolesController',
		service:'roleService',
		resolve:{
			security: ['$q', 'userService', function($q, userService){
	               if(!contains.call(userService.usermenujson, 'roleCreation')){
	                  return $q.reject("Not Authorized");
	               }
	           }]
		}
    })
    .state("menuAssignment", {
        url: "/menuAssignment",
        templateUrl: "menuAssignment.html",
		controller:'rolesController',
		service:'roleService'
    }).state("makerDash", {
        url: "/makerdash",
        templateUrl: "makerdash.html",
		controller:'makerdashController',
		service:'requestService'
    }).state("checkerDash", {
        url: "/checkerdash",
        templateUrl: "checkerdash.html",
		controller:'makerdashController',
		service:'requestService'
    });

	$urlRouterProvider.otherwise("/dash");
	// $locationProvider.html5Mode(true);
});

DerivativeApp.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) { 
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});

DerivativeApp.directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
//          console.log('file model directive');
          element.bind('change', function(){
             scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
             });
          });
       }
    };
 }]);


