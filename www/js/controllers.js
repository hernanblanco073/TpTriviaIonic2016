angular.module('starter.controllers', ['ngCordova'])


.controller('controlTrivia', function($scope, $state, $stateParams, $cordovaVibration, $cordovaNativeAudio, $ionicPlatform, $cordovaFile, Preguntas) {

  try
  {

  //var VariableFirebase = new Firebase('https://chathernan.firebaseio.com/Trivia/');
  $state.transitionTo($state.current, $stateParams, { 
  reload: true, inherit: false, notify: true
  });
  $scope.usuario = $stateParams.nombre;
  $scope.Juego = Preguntas.all();
  $scope.Juego.usuario = $scope.usuario;
  $scope.actual = Preguntas.get(1);
  $scope.correctas = 0;
  var i = 1;

  $ionicPlatform.ready(function() {

  $cordovaNativeAudio
     .preloadSimple('Correcto', 'sounds/correcto.mp3')
     .then(function (msg) 
         {
           console.log(msg);
         }, function (error) 
           {
             alert(error);
           }
           );

  $cordovaNativeAudio
     .preloadSimple('Incorrecto', 'sounds/incorrecto.mp3')
     .then(function (msg) 
         {
           console.log(msg);
         }, function (error) 
           {
             alert(error);
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
      var resultado = "Usted acerto ".concat($scope.correctas," de 5 preguntas");
      $scope.Juego.Puntaje = $scope.correctas;
      $scope.Juego.Fecha = Date.now();
      //VariableFirebase.push($scope.Juego);
      alert(resultado);
      alert($scope.Juego.toString());


      $cordovaFile.checkDir(cordova.file.externalApplicationStorageDirectory, "trivia")
      .then(function (success) {
          $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, "trivia/respuestas.txt", $scope.Juego, true)
               .then(function (success) {
                          alert("escribio");
           
                 }, function (error) {
                        alert("fallo escribir");
                        alert(error.toString());
                  });

      }, function (error) {
        $cordovaFile.createDir(cordova.file.externalApplicationStorageDirectory, "trivia", false)
            .then(function (success) {
              $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory, "trivia/respuestas.txt", $scope.Juego, true)
               .then(function (success) {
                          alert("escribio");
           
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

      $state.go('tab.resultados', {reload: true});
    }
  }

  }
  catch(error)
  {
    alert("catch");
    alert(error.toString());
  }

})


.controller('controlAbout', function($scope) {

})


.controller('controlResultados', function($scope, $cordovaFile, $state, $stateParams) {

  $state.transitionTo($state.current, $stateParams, { 
  reload: true, inherit: false, notify: true
  });
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
