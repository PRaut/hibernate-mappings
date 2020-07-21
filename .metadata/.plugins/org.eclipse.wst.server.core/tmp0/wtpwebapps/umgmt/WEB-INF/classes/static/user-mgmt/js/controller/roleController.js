DerivativeApp.controller('rolesController', function($scope,$state, $http, roleService,menuService, growl, userService){
	$scope.editingMenuRole = roleService.menuAssignRole;
	$scope.roleDetails = {};
	$scope.getAllRoles = function(){
		roleService.getAllRoles()
			.then(function(response){
				$scope.roleDetails = response.data.serviceResponse;
			});
	}
	$scope.user = {}
	$scope.toggleEnableOrDisableRole = function(role, option){


		packet = {
			checker: $scope.user.checker,
			payload: [role.id]
		}

    			roleService.toggleEnableOrDisableRole(packet)
    			.then(function(response){
    				if(response.data.serviceStatus == 'Success' ){
    					var op = (option=='enable')?'enabled':'disabled';
    					growl.success('role ' +  op + ' request successful' ,{title: 'Success!', ttl:5000});
    				}else{
    					growl.error('operation failed',{title: 'Error!'});
    				}
    				$scope.getAllRoles();
    			});
    		  
	}
	
	$scope.saveNewRole = function(){

		var requestData = {
			name: $scope.newRole.name,
		}

		packet = {
			checker: $scope.user.checker,
			payload: [$scope.newRole]
		}


		
		roleService.saveOrUpdateRole(packet)
			.then(function(response){
				if(response.data.serviceStatus == 'Success' ){
					growl.success('role create request successfully added',{title: 'Success!', ttl:5000});
					$state.go("roleManagement");
				}else{
					growl.error('operation failed',{title: 'Error!', ttl:5000});
					
				}
			});
	}
	
	
	
	$scope.example13settings = { 
			idProperty: 'id',
			smartButtonMaxItems: 3, 
			smartButtonTextConverter: function(itemText, originalItem) { 
			/*if (itemText === 'Jhon') {
				return 'Jhonny!'; 
											} */
				return itemText; 
			} 
		};
	
	$scope.getMenuAssignPage = function(role){
		roleService.menuAssignRole = role;
		$state.go("menuAssignment");
	}
	$scope.parentSelector=[];
	$scope.parentList = {};
	$scope.parentMenuDisplayList=[];
	$scope.getMenuList = function(){
		menuService.getAllMenus()
			.then(function(response){
				for(var x =0; x < response.data.serviceResponse.data.length; x++){
					var inData = response.data.serviceResponse.data[x];
					$scope.parentMenuDisplayList.push({
						id: inData.id,
						label: inData.name,
					});
					$scope.parentList = response.data.serviceResponse.data;
					
				}
				$scope.initializeSelected();
			});
	}
	
	
	$scope.menuList = [];
	$scope.menuDisplayList=[];
	$scope.selectedMenu=[]; 
	
	$scope.parentItemSelected = function(item){
		for(var x = 0; x < $scope.parentList.length; x++){
			if($scope.parentList[x].name == item.label){
				$scope.menuList = $scope.parentList[x].childrens;
				for(var y =0; y < $scope.menuList.length; y++){
					$scope.menuDisplayList.push({
						id: $scope.menuList[y].id,
						label:$scope.parentList[x].name + " --> " +$scope.menuList[y].name,
					});
				}
				break;
			}
		}
	}
	$scope.parentItemUnSelected = function(item){
		
		for(var x = 0; x < $scope.parentList.length; x++){
			if($scope.parentList[x].name == item.label){
				$scope.menuList = $scope.parentList[x].childrens;
				for(var y =0; y < $scope.menuList.length; y++){
					$scope.menuDisplayList.pop({
						id: $scope.menuList[y].id,
						label:$scope.parentList[x].name + " --> " +$scope.menuList[y].name,
					});
				}
				break;
			}
		}
	}
	$scope.parentMenuEvents = {
		onItemSelect: $scope.parentItemSelected,
		onItemDeselect: $scope.parentItemUnSelected
	};
	
	$scope.subMenuList = {};
	$scope.subMenuDisplayList=[];
	$scope.selectedSubMenu=[]; 
	$scope.menuItemSelected = function(item){
		for(var x = 0; x < $scope.menuList.length; x++){
			if($scope.menuList[x].name == item.label.split(" --> ")[1]){
				$scope.subMenuList = $scope.menuList[x].childrens;
				for(var y =0; y < $scope.subMenuList.length; y++){
					$scope.subMenuDisplayList.push({
						id: $scope.subMenuList[y].id,
						label: item.label.split(" --> ")[1] +" --> "+$scope.subMenuList[y].name,
					});
				}
				break;
			}
		}
	}
	$scope.menuItemUnSelected = function(item){
		for(var x = 0; x < $scope.menuList.length; x++){
			if($scope.menuList[x].name == item.label.split(" --> ")[1]){
				$scope.subMenuList = $scope.menuList[x].childrens;
				for(var y =0; y < $scope.subMenuList.length; y++){
					$scope.subMenuDisplayList.pop({
						id: $scope.subMenuList[y].id,
						label: item.label.split(" --> ")[1] +" --> "+$scope.subMenuList[y].name,
					});
				}
				break;
			}
		}
	}
	$scope.menuEvents = {
		onItemSelect: $scope.menuItemSelected,
		onItemDeselect: $scope.menuItemUnSelected
	};
		
	$scope.initializeSelected = function(){
		$scope.selectedSubMenu=[]; 
		$scope.selectedMenu=[]; 
		$scope.parentSelector=[];
		for(var x = 0; x < $scope.editingMenuRole.menuRoles.length; x++){
			var currMenu = $scope.editingMenuRole.menuRoles[x].menu;
			if(currMenu.type == 0){
				var parItem = {
						id:currMenu.id,
						label:currMenu.name
					};
				$scope.parentItemSelected(parItem);
				$scope.parentSelector.push(parItem);
			}else if(currMenu.type == 1){
				var menuItem = {
						id:currMenu.id,
						label:currMenu.parent.name +" --> " +currMenu.name
					};
				$scope.menuItemSelected(menuItem);
				$scope.selectedMenu.push({
					id:currMenu.id,
					label:currMenu.parent.name +" --> " +currMenu.name
				});
			}else if(currMenu.type == 2){
				$scope.selectedSubMenu.push({
					id:currMenu.id,
					label:currMenu.parent.name +" --> " +currMenu.name
				});
			}
			
		}
		
	}
	
	$scope.saveMenuRole= function(){
		$scope.saveParents = [];
		$scope.saveMenu = [];
		$scope.saveSubMenu = [];
		for(var x = 0; x < $scope.parentSelector.length; x++){
			var addParent = $scope.parentSelector[x];
			$scope.saveParents.push({
				roleId:$scope.editingMenuRole.id,
				menuId:addParent.id,
			});
		}
		for(var y = 0; y < $scope.selectedMenu.length; y++){
			var addMenu = $scope.selectedMenu[y];
			$scope.saveMenu.push({
				roleId:$scope.editingMenuRole.id,
				menuId:addMenu.id,
			});
		}
		for(var z = 0; z < $scope.selectedSubMenu.length; z++){
			var addSubMenu = $scope.selectedSubMenu[z];
			$scope.saveSubMenu.push({
				roleId:$scope.editingMenuRole.id,
				menuId:addSubMenu.id,
			});
		}

		var requestData = {
			parent: $scope.saveParents,
			menu: $scope.saveMenu,
			subMenu: $scope.saveSubMenu
		}
		roleService.addRoleMenus(requestData)
			.then(function(response){
				if(response.data.serviceStatus == 'Success' ){
					growl.success('Menu successfully changed',{title: 'Success!', ttl:5000});
				}else{
					growl.error('operation failed',{title: 'Error!', ttl:5000});
					
				}
			});
	}


	$scope.loadCheckers = function(){
		userService.getCheckers()
			.then((response)=>{
				$scope.checkers = response.data.serviceResponse
			})
	}
});