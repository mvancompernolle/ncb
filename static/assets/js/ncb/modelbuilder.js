
ncbApp.controller("ModelBuilderController", ['$scope', 'CurrentModelService', 'SidePanelService', 'ColorService', 'ModalService', 
	function($scope, currentModelService, sidePanelService, colorService, modalService){
	$scope.currentModel = currentModelService.getCurrentModel();
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

	$scope.show = function(){

		modalService.showModal({
		    templateUrl: "static/assets/html/directives/new-cell-group-modal.html",
		    controller: "ModalController"
		  }).then(function(modal) {

		    //it's a bootstrap element, use 'modal' to show it
		    modal.element.modal();
		    modal.close.then(function(result) {
		      console.log(result);
		    });
		  });

	};

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

    $scope.$watch(function () { return currentModelService.getData(); }, function (newValue) {
        if (newValue){
        	// update the data
        	$scope.data = newValue;
        } 
    });

}]);

ncbApp.controller('ModalController', function($scope, close) {
  
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});

