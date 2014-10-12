
ncbApp.controller("ModelBuilderController", ['$scope', 'sidePanelService', function($scope, sidePanelService){
	// get visibility from side panel service
	this.isSidePanelVisible = function(){
		return sidePanelService.visible;
	};

	this.hideSidePanel = function(){
		sidePanelService.setVisible(false);
	};
}]);
