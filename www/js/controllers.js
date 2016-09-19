angular.module('starter.controllers', ['ngCordova'])


.controller('controlTrivia', function($scope, $state, $stateParams, $cordovaVibration, $cordovaNativeAudio, $ionicPlatform, Preguntas) {

  console.log($stateParams.nombre);
  $scope.usuario = $stateParams.nombre;
  $scope.Preguntas = Preguntas.all();
  $scope.actual = Preguntas.get(1);
  $scope.correctas = 0;
  var i = 1;

  $cordovaNativeAudio
     .preloadSimple('Correcto', 'sounds/correcto.mp3')
     .then(function (msg) 
         {
           console.log(msg);
         }, function (error) 
           {
             //alert(error);
           }
           );

  $cordovaNativeAudio
     .preloadSimple('Incorrecto', 'sounds/incorrecto.mp3')
     .then(function (msg) 
         {
           console.log(msg);
         }, function (error) 
           {
             //alert(error);
           }
           );

  $scope.Contestar = function(idResp){

    if($scope.actual.correcta === idResp)
    {
      $scope.correctas++;
      $cordovaVibration.vibrate(1000);
      $cordovaNativeAudio.play('Correcto');
      alert("Respuesta correta !! :)");
    }
    else
    {
      $cordovaNativeAudio.play('Incorrecto');
      $cordovaVibration.vibrate([500,100,500]);
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

  $ionicPlatform.registerBackButtonAction(function(){
    alert("chau");
  },100);

  })


.controller('controlAbout', function($scope, $window) {
  
  
})


.controller('controlLogin', function($scope, $state) {

  $scope.Logear = function(){
    {
      var Nombre = document.getElementById("txtNombre").value;

      $state.go('tab.trivia', {nombre: Nombre});
    }
  };
  
 });
