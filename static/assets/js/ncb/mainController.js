var ncbApp = angular.module('ncbApp', ['snap']);

// disable right drawer
ncbApp.config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
    // or
    snapRemoteProvider.globalOptions = {
      disable: 'right',
      hyperextensible: false,
      touchToDrag: false
      // ... others options
    }
});


ncbApp.controller("DrawerController", function($scope){
	this.tab = 0;
	this.localModels = ["Cell 1", "Cell 2", "Cell 3"];
	this.dbModels = ["Cell 4", "Cell 5", "Cell 6"];

	this.selectTab = function(setTab){
		this.tab = setTab;
	}

	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	}
});