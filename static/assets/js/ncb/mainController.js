var ncbApp = angular.module('ncbApp', ['snap', 'colorpicker.module', 'mgcrea.ngStrap', 'mgcrea.ngStrap.tooltip', 'angularModalService']);

// TEMPORARY TEST VARIABLES //////////////////////////////////////////////////////////
//test models
var testChannel1 = new voltageGatedIonChannel();
var testChannel2 = new calciumDependantChannel();
var testParam = new izhikevichParam();
var test2Param = new ncsParam();
var test3Param = new hodgkinHuxleyParam();
var a1 = new particleVariableConstants();
var b1 = new particleVariableConstants();
var testParticle = new voltageGatedParticle(a1, b1);
var testChannel3 = new voltageGatedChannel(testParticle);
var test4Param = new hodgkinHuxleyParam();
var flatS = new flatSynapse();
var ncsS = new ncsSynapse();

// hard code modals for testing purposes
var newNcs = new ncsParam();
var newhh = new hodgkinHuxleyParam();
var newIzhi = new izhikevichParam();
var param = new cell("Param", "HodgkinHuxley", newhh);
var param2 = new cell("Param2", "NCS", newNcs);
myModels = [
	new cell("Cell 1", "NCS", newNcs),
	new cell("Cell 2", "HodgkinHuxley", newhh),
    new cellGroup('Cell Group 1', 1, cloneParam(param), 'box'),
    new cellGroup('Cell Group 2', 2, cloneParam(param2), 'box'),
];
myDBModels  = [
	new cell("Cell 3", "Izhikevich", newIzhi),
    new cellGroup('Cell Group 3', 3, cloneParam(param), 'box'),
    new cellGroup('Cell Group 4', 4, cloneParam(param2), 'box'),
];

myModels[2].cellGroups.push(new cell("Cell 4", "NCS", newNcs));
myModels[2].cellGroups.push(new cell("Cell 5", "Izhikevich", newIzhi));
myModels[2].cellGroups.push(new cellGroup('Cell Group 5', 5, cloneParam(param), 'box'));
myModels[2].cellGroups.push(new cell("Cell 6", "NCS", newNcs));
myModels[2].cellGroups.push(new cell("Cell 7", "Izhikevich", newIzhi));
myModels[2].cellGroups.push(new cellGroup('Cell Group 7', 5, cloneParam(param), 'box'));
myModels[2].cellGroups[2].cellGroups.push(new cell("Cell 8", "Izhikevich", newIzhi));
myModels[2].cellGroups[2].cellGroups.push(new cellGroup('Cell Group 8', 6, cloneParam(param2), 'box'));

/////////////////////////////////////////////////////////////////////////////////////////

// disable right drawer
ncbApp.config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
    // or
    snapRemoteProvider.globalOptions = {
      disable: 'right',
      hyperextensible: false,
      touchToDrag: false,
      tapToClose: false
      // ... others options
    }
});

// create side panel service 
ncbApp.factory('SidePanelService', function($rootScope) {
	var sidePanelService = {};

	sidePanelService.breadCrumbs = [{name: "Home", index: 0}];
	sidePanelService.visible = false;
	sidePanelService.data = {};
	sidePanelService.component = {};

	sidePanelService.setVisible = function(isVisible) {
		this.visible = isVisible;
	};

	sidePanelService.setData = function(newData){
		// set the base data to new data
		this.data = newData;
		// set the current component to new data
		this.component = newData;

		// rest breadcrumbs to home
		this.breadCrumbs = [{name: "Home", index: 0}];
	};

	sidePanelService.setComponent = function(component, index){
		// set current component and create breadcrumb for it
		this.component = component;
		this.breadCrumbs.push({name: component.name, index: index});
	};

	sidePanelService.goHome = function(){
		this.breadCrumbs = [{name: "Home", index: 0}];
		this.component = this.data;
	};

	sidePanelService.goToBreadCrumb = function(index){
		// go home if bread crumb index is 0
		if(index == 0)
			this.goHome();
		else if(index < this.breadCrumbs.length){
			// if not home loop through breadcumbs to reach selected index
			this.component = this.data;
			var setIndex;
			for(var i=1; i<=index; i++){
				setIndex = this.breadCrumbs[i].index;
				this.component = this.component.cellGroups[setIndex];
			}

			// shorten breadcrumbs to selected index
			this.breadCrumbs.splice(index+1);
		}
	};

	// get bread crumbs
	sidePanelService.getBreadCrumbs = function(){
		return this.breadCrumbs;
	}

	sidePanelService.getData = function(){
		return this.component;
	};

	return sidePanelService;
});

// service that provides set website colors
ncbApp.factory('ColorService', function($rootScope){
	var colorService = {};

	colorService.colors = {cell: '#8781BD' , cellGroup: '#00568C', model:'#5D6B74'};

	colorService.getColors = function(){
		return this.colors;
	};

	colorService.setColors = function(newColors){
		this.colors = newColors;
	};

	colorService.styleElement = function(model){
		// style element based off type (cell, cell group, model)
		if (model.classification === 'cell'){
			return {
                'background-image': 'linear-gradient(left, '+this.colors.cell+', '+this.colors.cell+' 5%, transparent 5%, transparent 100%)',
                'background-image': '-webkit-linear-gradient(left, '+this.colors.cell+', '+this.colors.cell+' 5%, transparent 5%, transparent 100%)',
            };
		}
		else if (model.classification === 'cellGroup'){
			return {
                'background-image': 'linear-gradient(left, '+this.colors.cellGroup+', '+this.colors.cellGroup+' 5%, transparent 5%, transparent 100%)',
                'background-image': '-webkit-linear-gradient(left, '+this.colors.cellGroup+', '+this.colors.cellGroup+' 5%, transparent 5%, transparent 100%)',
            };
		}
		else if (model.classification === 'model'){
			return {
                'background-image': 'linear-gradient(left, '+this.colors.model+', '+this.colors.model+' 5%, transparent 5%, transparent 100%)',
                'background-image': '-webkit-linear-gradient(left, '+this.colors.model+', '+this.colors.model+' 5%, transparent 5%, transparent 100%)',
            };
		}
	}

	return colorService;
});


// service that allows the current model to be modified and accessed
ncbApp.factory('CurrentModelService', function($rootScope){
	var currentModelService = {};

	// store current model in service so it can be accessed anywhere
	currentModelService.currentModel = new model();

	currentModelService.setName = function(name){
		this.currentModel.name = name;
	};

	currentModelService.addToModel = function(model){
		// add componenet if not already in the current model
		var index = getIndex(this.currentModel.neurons, "name", model.name);
		if(this.currentModel.neurons.length === 0 || index === -1){
			this.currentModel.neurons.push(model);
		}	

	};

	currentModelService.removeModel = function(model){
		// remove model if found
		var myIndex = getIndex(this.currentModel.neurons, "name", model.name)
		if(myIndex != -1){
			this.currentModel.neurons.splice(myIndex, 1);
		}
	};

	currentModelService.getCurrentModel = function(){
		return this.currentModel;
	};

	return currentModelService;
});

// controller for the model import/export drawer
ncbApp.controller("DrawerController", ['$scope', 'SidePanelService', 'ColorService', 'CurrentModelService', 
	function($scope, sidePanelService, colorService, currentModelService){

	$scope.viewed = sidePanelService.getData();
	$scope.colors = colorService.getColors();
	this.tab = 0;

	this.localModels = myModels;
	this.dbModels = myDBModels;

	this.colorPickerPopover = {
  		"title": "Title",
  		"content": "Content"
	};

	this.selectTab = function(setTab){
		this.tab = setTab;
	}

	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	}

	this.styleElement = function(model){
		// get styled component from color service
		return colorService.styleElement(model);
	}

	this.addToModel = function(model){
		currentModelService.addToModel(model);
	};

	this.quickView = function(element){
		// activate the side panel
		sidePanelService.setVisible(true);

		// pass in the data to be viewed
		$scope.viewed = element;
	};

	$scope.$watch('viewed', function (newValue) {
        if (newValue) sidePanelService.setData(newValue);
    });
	
}]);


// controller for the side panel preview
ncbApp.controller("SidePanelController", ['$scope', "CurrentModelService", 'SidePanelService', 'ColorService', function($scope, currentModelService, sidePanelService, colorService){
	$scope.data = sidePanelService.getData();
	$scope.colors = colorService.getColors();

	// get visibility from side panel service
	this.isSidePanelVisible = function(){
		return sidePanelService.visible;
	};

	// call this to close side panel
	this.close = function(){
		sidePanelService.setVisible(false);
	};

	this.addToModel = function(model){
		currentModelService.addToModel(model);
	};

	this.styleHeader = function(){

		// style element based off type (cell, cell group, model)
		if ($scope.data.classification === 'cell'){
			return {
				'background-color': $scope.colors.cell
            };
		}
		else if ($scope.data.classification === 'cellGroup'){
			return {
				'background-color': $scope.colors.cellGroup
            };
		}
		else if ($scope.data.classification === 'model'){
			return {
                'background-color': $scope.colors.model
            };
		}
	};

	this.styleElement = function(model){
		// get styled component from color service
		return colorService.styleElement(model);
	};

	this.selectComponent = function(component, index){
		sidePanelService.setComponent(component, index);
	};

	// go to model home
	this.goToBreadCrumb = function(index){
		sidePanelService.goToBreadCrumb(index);
	};

	// get bread crumbs
	this.getBreadCrumbs = function(){
		return sidePanelService.breadCrumbs;
	};

    $scope.$watch(function () { return sidePanelService.getData(); }, function (newValue) {
        if (newValue){
        	// update the data
        	$scope.data = newValue;
        } 
    });
}]);

// controller for the nav bar
ncbApp.controller("NavigationController", ['$scope', 'SidePanelService', function($scope, sidePanelService){
	// get visibility from side panel service
	this.isSidePanelVisible = function(){
		return sidePanelService.visible;
	};

	// call this to close side panel
	this.hideSidePanel = function(){
		sidePanelService.setVisible(false);
	};
}]);
