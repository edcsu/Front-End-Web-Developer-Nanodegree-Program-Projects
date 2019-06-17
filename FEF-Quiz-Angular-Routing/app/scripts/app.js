'use strict';

/**
 * @ngdoc overview
 * @name routingQuizApp
 * @description
 * # routingQuizApp
 *
 * Main module of the application.
 */
angular
  .module('routingQuizApp', [ 'ui.router' ])
  .config([ '$stateProvider', '$urlRouterProvider', function ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state( 'home', {
        url: '/',
        templateUrl: 'views/instructions.html',
        controller: 'InstrunctionCtrl as instruction'
      })
      .state( 'red', {
        url: '/bricks/red',
        templateUrl: 'views/bricks.html',
        controller: 'RedBricksCtrl as brick'
      })
      .state( 'blue', {
        url: '/bricks/blue',
        templateUrl: 'views/bricks.html',
        controller: 'BlueBricksCtrl as brick'
      })
      .state( 'green', {
        url: '/bricks/green',
        templateUrl: 'views/bricks.html',
        controller: 'GreenBricksCtrl as brick'
      })
      .state( 'cart', {
        url: '/cart',
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl as cart'
      })
      .state( 'red.cart', {
        url: '/bricks/red/cart',
        templateUrl: 'views/cart.html'
      })
      .state( 'blue.cart', {
        url: '/bricks/blue/cart',
        templateUrl: 'views/cart.html'
      })
      .state( 'green.cart', {
        url: '/bricks/green/cart',
        templateUrl: 'views/cart.html'
      });
  }]);
