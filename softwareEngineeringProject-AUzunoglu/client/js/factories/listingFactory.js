/*Alihan Uzunoglu*/


angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('');
    },
	
	create: function(listing) {
	  return $http.post('', listing);
    }, 

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
       return $http.delete(''+id);
    }
  };

  return methods;
});
