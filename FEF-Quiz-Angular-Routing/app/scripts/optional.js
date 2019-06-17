/*
    .state('brick', {
      url: '/bricks/:color',
      templateUrl: 'views/bricks.html',
      controllerProvider: function($stateParams) {
        var color = $stateParams.color;
        color = color[0].toUpperCase() + color.slice(2);
        var CtrlName = color + 'BrickCtrl';
        return CtrlName;
      },
      controllerAs: 'brick'
    })


*/

/*
    <li> <a ui-sref="brick{{color: 'red'}}"> Red Bricks </a> </li>
*/
