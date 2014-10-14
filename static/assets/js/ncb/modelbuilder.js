
ncbApp.controller("ModelBuilderController", ['$scope', '$modal', 'sidePanelService', function($scope, $modal, sidePanelService){
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
}]);