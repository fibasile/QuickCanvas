'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('quickcanvas.services', []).
  value('version', '0.1').
  service('canvasService', [ 'localStorageService', function(localStorageService){
	  var data = {
		  'problems' :  [],
		  'solutions' : [],
		  'key_metrics' : [],
		  'unique_value' : [],
		  'unfair_advantage' : [],
		  'channels' : [],
		  'customer_segments' : [],
		  'cost_structure' : [],
		  'revenue_streams' : []
	  }
	
	  if (localStorageService.isSupported){
		  var dataModel = localStorageService.get('dataModel');
		  if (dataModel != null && typeof(dataModel) == 'string') {
			  var tmpData = null;
			  try {
			   tmpData = JSON.parse(dataModel);
			  } catch (exception){
				  tmpData = data;
			  }
			  data = tmpData;
		  } 
		  
		
	  }
	  
	  return {
		  setJson : function(dataJson){
			  data = JSON.parse(dataJson);
		  },
		  getJson : function() {
			  return JSON.stringify(data);
		  },
		  persistModel : function(){
			  if (localStorageService.isSupported){
				  localStorageService.add('dataModel', JSON.stringify(data));
			  }
		  },
		  
 		 getLines : function(key) {
 			 var retLine = '';
 			 var items = this.getItems(key);
 			 for (var i=0; i<items.length; i++){
 				 retLine += '- ' + items[i] + '\n';
 			 }
			 console.log('retLine ' + retLine);
 			 return retLine;
		 	
 		 },
		  
   	 	 getItems : function(cat){
			 return data[cat];
   	 	 },
		 
 	 	 addItem : function(cat, text){
			 if (text.length > 1)
 			 data[cat].push(text);
			 this.persistModel();
 			 // $scope.text = '';
		 },
		 
 	 	deleteItem : function(cat, idx){
	 		 data[cat].splice(idx,1);
			 this.persistModel();
 	 	}
	};
	
  }])
  
  
  
  ;
  
  

