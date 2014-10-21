
ncbApp.controller("ModelBuilderController", ['$scope', '$modal', 'currentModelService', 'sidePanelService', 'colorService',  
	function($scope, $modal, currentModelService, sidePanelService, colorService){
	this.currentModel = currentModelService.getCurrentModel();

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
	};

	this.styleElement = function(model){
		// style element based off type (cell, cell group, model)
		if (model.classification === 'cell'){
			return {
                'background-image': 'linear-gradient(left, '+$scope.colors.cell+', '+$scope.colors.cell+' 5%, transparent 5%, transparent 100%)',
                'background-image': '-webkit-linear-gradient(left, '+$scope.colors.cell+', '+$scope.colors.cell+' 5%, transparent 5%, transparent 100%)',
            };
		}
		else if (model.classification === 'cellGroup'){
			return {
                'background-image': 'linear-gradient(left, '+$scope.colors.cellGroup+', '+$scope.colors.cellGroup+' 5%, transparent 5%, transparent 100%)',
                'background-image': '-webkit-linear-gradient(left, '+$scope.colors.cellGroup+', '+$scope.colors.cellGroup+' 5%, transparent 5%, transparent 100%)',
            };
		}
		else if (model.classification === 'model'){
			return {
                'background-image': 'linear-gradient(left, '+$scope.colors.model+', '+$scope.colors.model+' 5%, transparent 5%, transparent 100%)',
                'background-image': '-webkit-linear-gradient(left, '+$scope.colors.model+', '+$scope.colors.model+' 5%, transparent 5%, transparent 100%)',
            };
		}
	}
}]);