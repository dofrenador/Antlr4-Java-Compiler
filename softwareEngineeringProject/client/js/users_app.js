/* register the modules the application depends upon here*/
angular.module('users', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('UsersApp', ['users']);
console.log("users_app.js running");
