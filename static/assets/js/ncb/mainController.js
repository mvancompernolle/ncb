var ncbApp = angular.module('ncbApp', ['snap', 'colorpicker.module', 'mgcrea.ngStrap', 'mgcrea.ngStrap.tooltip']);

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
ncbApp.factory('sidePanelService', function($rootScope) {
  var sidePanelService = {};

  sidePanelService.visible = false;

  sidePanelService.setVisible = function(isVisible) {
    this.visible = isVisible;
  };

  return sidePanelService;
});


ncbApp.controller("DrawerController", ['sidePanelService', function(sidePanelService){
	this.tab = 0;
	this.localModels = [{name: 'Cell 1', classification:'cell'} ,{name: 'Cell Group 2', classification:'cellGroup'}, {name: 'Model 1', classification:'model'}, {name: 'Cell 3', classification:'cell'}];
	this.dbModels = [{name: 'Cell 4', classification:'cell'} ,{name: 'Cell Group 5', classification:'cellGroup'}, {name: 'Model 3', classification:'model'}, {name: 'Cell 6', classification:'cell'}];
	this.colors = {cell: '#8781BD' , cellGroup: '#00568C', model:'#5D6B74'};

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

		// style element based off type (cell, cell group, model)
		if (model.classification === 'cell'){
			return {


                    'background-image': 'linear-gradient(left, '+this.colors.cell+', '+this.colors.cell+' 5%, transparent 5%, transparent 100%)',
                    'background-image': '-webkit-linear-gradient(left, '+this.colors.cell+', '+this.colors.cell+' 5%, transparent 5%, transparent 100%)',
                    'color': this.colors.cell

            };
		}
		else if (model.classification === 'cellGroup'){
			return {

                    'background-image': 'linear-gradient(left, '+this.colors.cellGroup+', '+this.colors.cellGroup+' 5%, transparent 5%, transparent 100%)',
                    'background-image': '-webkit-linear-gradient(left, '+this.colors.cellGroup+', '+this.colors.cellGroup+' 5%, transparent 5%, transparent 100%)',
                    'color': this.colors.cellGroup

            };
		}
		else if (model.classification === 'model'){
			return {

                    'background-image': 'linear-gradient(left, '+this.colors.model+', '+this.colors.model+' 5%, transparent 5%, transparent 100%)',
                    'background-image': '-webkit-linear-gradient(left, '+this.colors.model+', '+this.colors.model+' 5%, transparent 5%, transparent 100%)',
                    'color': this.colors.model

            };
		}
	}

	this.quickView = function(){
		sidePanelService.setVisible(true);
	}
	
}]);


ncbApp.controller("SidePanelController", ['$scope', 'sidePanelService', function($scope, sidePanelService){
	// get visibility from side panel service
	this.isSidePanelVisible = function(){
		return sidePanelService.visible;
	};

	// call this to close side panel
	this.close = function(){
		sidePanelService.setVisible(false);
	};
}]);

ncbApp.controller("NavigationController", ['$scope', 'sidePanelService', function($scope, sidePanelService){
	// get visibility from side panel service
	this.isSidePanelVisible = function(){
		return sidePanelService.visible;
	};

	// call this to close side panel
	this.hideSidePanel = function(){
		sidePanelService.setVisible(false);
	};
}]);