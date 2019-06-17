'use strict';

describe('Controller: InstrunctionCtrl', function () {

  // load the controller's module
  beforeEach(module('routingQuizApp'));

  var InstrunctionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstrunctionCtrl = $controller('InstrunctionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InstrunctionCtrl.awesomeThings.length).toBe(3);
  });
});
