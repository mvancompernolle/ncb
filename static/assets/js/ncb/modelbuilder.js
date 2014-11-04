
ncbApp.controller("ModelBuilderController", ['$scope', 'CurrentModelService', 'SidePanelService', 'ColorService', 
	function($scope, currentModelService, sidePanelService, colorService){
	$scope.colors = colorService.getColors();

	// get visibility from side panel service
	this.isSidePanelVisible = function(){
		return sidePanelService.visible;
	};

	this.hideSidePanel = function(){
		sidePanelService.setVisible(false);
	};

	this.removeModel = function(model){
		currentModelService.removeModel(model);
	};

	this.styleElement = function(model){
		// get styled component from color service
		return colorService.styleElement(model);
	}

	this.selectComponent = function(component, index){
		currentModelService.setComponent(component, index);
	};

	// get bread crumbs
	this.getBreadCrumbs = function(){
		return currentModelService.getBreadCrumbs();
	};

	// go to model home
	this.goToBreadCrumb = function(index){
		currentModelService.goToBreadCrumb(index);
	};

	this.getComponents = function(){
		return currentModelService.getData();
	};

    /*$scope.$watch(function () { return currentModelService.getData(); }, function (newValue) {
        if (newValue){
        	// update the data
        	$scope.data = newValue;
        } 
    });*/

}]);


