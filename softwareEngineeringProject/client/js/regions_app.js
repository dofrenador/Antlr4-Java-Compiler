/* register the modules the application depends upon here*/
angular.module('regions', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('RegionsApp', ['regions']);
console.log("regions_app.js running");
