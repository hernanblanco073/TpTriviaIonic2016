angular.module('starter.controllers', ['ngCordova'])


.controller('controlTrivia', function($scope, $state, $stateParams, $cordovaVibration, Preguntas) {


  $scope.Preguntas = Preguntas.all();
  $scope.actual = Preguntas.get(1);
  $scope.usuario = $stateParams.name;
  $scope.correctas = 0;
  var i = 1;

  console.log($scope.actual);

  $scope.Contestar = function(idResp){

    if($scope.actual.correcta === idResp)
    {
      $scope.correctas++;
      //$cordovaVibration.vibrate(1000);
      alert("Respuesta correta !! :)");
    }
    else
    {
      //$cordovaVibration.vibrate([500,100,500]);
      alert("Respuesta Incorrecta :(");
    }

    i++;

    if(i !== 6)
    {
      $scope.actual = Preguntas.get(i);
    }
    else
    {
      i = 1;
      $scope.actual = Preguntas.get(i);
      var resultado = "Usted acerto ".concat($scope.correctas," de 5 preguntas, presione aceptar para volver a jugar");
      alert(resultado);
      $scope.correctas = 0;
    }
  }
  })


.controller('controlAbout', function($scope, $window) {
  
  console.log($window.name);
})


.controller('controlLogin', function($scope, $state) {

  $scope.Logear = function(){
    {
      var Nombre = document.getElementById("txtNombre").value;

      $state.go('tab.trivia'/*, {nombre: Nombre}*/);
    }
  };
  
 });
