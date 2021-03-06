angular.module('jwtApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {
  $urlRouterProvider.otherwise('/');

  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/views/main.html'
  }).state('jobs', {
    url: '/jobs',
    templateUrl: '/views/jobs.html',
    controller: 'JobsCtrl'
  }).state('register', {
    url: '/register',
    templateUrl: '/views/register.html',
    controller: 'RegisterCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: '/views/login.html',
    controller: 'LoginCtrl'
  }).state('logout', {
    url: '/register',
    controller: 'LogoutCtrl'
  });

  $authProvider.loginUrl = API_URL + 'auth/login';
  $authProvider.signupUrl = API_URL + 'auth/register';

  $authProvider.google({
    clientId: '1028235431595-5sadnj969clrtvh9doio7eab8sk9i9c2.apps.googleusercontent.com',
    url: API_URL + 'auth/google'
  });

  $authProvider.facebook({
    clientId: '1762039484026174',
    url: API_URL + 'auth/facebook'
  });

  $httpProvider.interceptors.push('authInterceptor');
}).constant('API_URL', 'http://localhost:1337/').run(function($window) {
  var params = $window.location.search.substring(1);
  var pair;
  var code;

  if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
    pair = params.split('=');
    code = decodeURIComponent(pair[1]);

    $window.opener.postMessage(code, $window.location.origin);
  }
});
