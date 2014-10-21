
ncbApp.controller("ModelBuilderController", ['$scope', '$modal', 'CurrentModelService', 'SidePanelService', 'ColorService',  
	function($scope, $modal, currentModelService, sidePanelService, colorService){
	$scope.currentModel = currentModelService.getCurrentModel();
	$scope.colors = colorService.getColors();

	$scope.modal = {
	  "title": "Title",
	  "content": "Hello Modal<br />This is a multiline message!"
	};

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
}]);