var ncbApp = angular.module('ncbApp', ['snap', 'colorpicker.module', 'mgcrea.ngStrap', 'mgcrea.ngStrap.tooltip', 'angularModalService']);

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

	sidePanelService.breadCrumbs = ["Home"];
	sidePanelService.visible = false;
	sidePanelService.data = {};

	sidePanelService.setVisible = function(isVisible) {
		this.visible = isVisible;
	};

	sidePanelService.setData = function(newData){
		this.data = newData;

		// rest breadcrumbs to home
		this.breadCrumbs = ["Home"];
	};

	// get 
	this.getBreadCrumbs = function(){
		return this.breadCrumbs;
	}

	sidePanelService.getData = function(){
		return this.data;
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
	currentModelService.currentModel = new currentWorkingModel();

	currentModelService.setName = function(name){
		this.currentModel.name = name;
	};

	currentModelService.addToModel = function(model){
		// add model componenet if not already in the current model
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
ncbApp.controller("DrawerController", ['$scope', 'SidePanelService', 'ColorService', function($scope, sidePanelService, colorService){
	$scope.viewed = sidePanelService.getData();
	$scope.colors = colorService.getColors();
	this.tab = 0;

	// temporary models
	this.localModels = [{name: 'Cell 1', classification:'cell', type: 'Izhikevich'} ,
	 	{name: 'Cell Group 2', classification:'cellGroup'},
	  	{name: 'Model 1', classification:'model'},
	  	{name: 'Cell 3', classification:'cell', type: 'Izhikevich'}];
	this.dbModels = [{name: 'Cell 4', classification:'cell', type: 'Hodgkin Huxley'},
	 	{name: 'Cell Group 5', classification:'cellGroup', 
	 		groups:[{name: 'Cell 7', classification:'cell', type: 'NCS'}, 
	 				{name: 'Cell 8', classification:'cell', type: 'Izhikevich'}, 
	 				{name: 'Cell 9', classification:'cell', type: 'Hodgkin Huxley'},
					{name: 'Cell 10', classification:'cell', type: 'Hodgkin Huxley'},

					{name: 'Cell Group Inner', classification:'cellGroup',
	 				groups:[{name: 'Cell 11', classification:'cell', type: 'NCS'}]},

					{name: 'Cell Group Inner 2', classification:'cellGroup',
	 				groups:[{name: 'Cell 12', classification:'cell', type: 'Izhikevich'}]},

	 				]},
	  	{name: 'Model 3', classification:'model'},
	   	{name: 'Cell 6', classification:'cell',
		type: 'NCS'}];

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

	this.selectComponent = function(component){
		sidePanelService.setData(component);
	};

	// go to model home
	this.goHome = function(){

	};

	// get 
	this.getBreadCrumbs = function(){
		return sidePanelService.breadCrumbs;
	}

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
