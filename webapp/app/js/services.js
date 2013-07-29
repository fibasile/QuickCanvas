'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('quickcanvas.services', []).
  value('version', '0.1').
  service('canvasService', function(){
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
	
	  
	  
	  return {
		  getJson : function() {
			  return JSON.stringify(data);
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
 			 // $scope.text = '';
		 },
		 
 	 	deleteItem : function(cat, idx){
 		 data[cat].splice(idx,1);
 	 	}
	};
	
  })
  
  
  
  ;
  
  

