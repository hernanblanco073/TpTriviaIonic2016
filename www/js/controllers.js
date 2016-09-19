angular.module('starter.controllers', ['ngCordova'])


.controller('controlTrivia', function($scope, $state, $stateParams, $cordovaVibration, $cordovaNativeAudio, $ionicPlatform, $ionicPopup, $cordovaFile, Preguntas) {

  try
  {
  //var VariableFirebase = new Firebase('https://chathernan.firebaseio.com/Trivia/');
  $scope.usuario = $stateParams.nombre;
  $scope.Juego = Preguntas.all();
  $scope.Juego.usuario = $scope.usuario;
  $scope.actual = Preguntas.get(1);
  $scope.correctas = 0;
  var i = 1;
  var resultado = "";


  $scope.AlertResultado = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Resultado',
     template: resultado
   });
  }

  $scope.AlertCorrecta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'BIEN!!!',
     template: "Respuesta correta !! :)"
   });
  }

  $scope.AlertIncorrecta = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'MAL!!!',
     template: "Respuesta Incorrecta :("
   });
  }

  $ionicPlatform.ready(function() {

  $cordovaNativeAudio
     .preloadSimple('Correcto', 'sounds/correcto.mp3')
     .then(function (msg) 
         {
           console.log(msg);
         }, function (error) 
           {

           }
           );

  $cordovaNativeAudio
     .preloadSimple('Incorrecto', 'sounds/incorrecto.mp3')
     .then(function (msg) 
         {
           console.log(msg);
         }, function (error) 
           {

           }
           );

   });

  $scope.Contestar = function(idResp){

    $scope.Juego[i-1].eligio = idResp;
    if($scope.actual.correcta === idResp)
    {
      $scope.correctas++;
      $cordovaVibration.vibrate(1000);
      $cordovaNativeAudio.play('Correcto');
      $scope.AlertCorrecta();

    }
    else
    {
      $cordovaNativeAudio.play('Incorrecto');
      $cordovaVibration.vibrate([500,100,500]);
      $scope.AlertIncorrecta();
    }

    i++;

    if(i !== 6)
    {
      $scope.actual = Preguntas.get(i);
    }
    else
    {
      resultado = "Usted acerto ".concat($scope.correctas," de 5 preguntas, para ver sus resultados pulse en el Boton Resultados del menu");
      $scope.Juego.Puntaje = $scope.correctas;
      $scope.Juego.Fecha = Date.now();
      //VariableFirebase.push($scope.Juego);
      $scope.AlertResultado();


      $cordovaFile.checkDir(cordova.file.externalApplicationStorageDirectory, "trivia")
      .then(function (success) {
          $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, "trivia/respuestas.txt", $scope.Juego, true)
               .then(function (success) {
           
                 }, function (error) {
                        alert(error.toString());
                  });

      }, function (error) {
        $cordovaFile.createDir(cordova.file.externalApplicationStorageDirectory, "trivia", false)
            .then(function (success) {
              $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, "trivia/respuestas.txt", $scope.Juego, true)
               .then(function (success) {
           
                 }, function (error) {
                        alert("fallo escribir 2");
                        alert(error.toString());
                  });
        
              }, function (error) {
                  alert("fallo dir");
              });
      });



      i = 1;
      $scope.actual = Preguntas.get(i);
      $scope.correctas = 0;

      //$state.go('tab.resultados');
    }
  }

  }
  
  catch(error)
  {
    alert("catch");
    alert(error.toString());
  }

})


.controller('controlAbout', function($scope, $state) {

})


.controller('controlResultados', function($scope, $cordovaFile, $state, $stateParams) {


   $cordovaFile.readAsText(cordova.file.externalApplicationStorageDirectory, "trivia/respuestas.txt")
         .then(function (success) {
             try
             {
               $scope.listado = JSON.parse(success);
             }
             catch(error)
             {
               alert(error);
             }

             }, function (error) {
                 alert("Aun no ha jugado", error);
               }
            );
  
})


.controller('controlLogin', function($scope, $state) {

  $scope.Logear = function(){
    {
      var Nombre = document.getElementById("txtNombre").value;

      $state.go('tab.trivia', {nombre: Nombre});
    }
  };
  
 });
