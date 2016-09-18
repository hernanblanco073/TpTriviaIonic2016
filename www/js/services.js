angular.module('starter.services', [])

.factory('Preguntas', function($http) {
  
  var preguntas = [{
  "id": 1,
  "pregunta": "¿Quien es el actual campeon del peso pesado de UFC?",
  "respuesta1": "Stipe Miočić",
  "respuesta2": "Fabricio Werdum",
  "respuesta3": "Cain Velazquez",
  "correcta": 1
}, {
  "id": 2,
  "pregunta": "¿Quien fue el cantante de Hermetica?",
  "respuesta1": "Ricardo Iorio",
  "respuesta2": "El tano Romano",
  "respuesta3": "Claudio OConnor",
  "correcta": 3
}, {
  "id": 3,
  "pregunta": "¿En que años tocaron juntos en Argentina Ozzy Osbourne y Korn?",
  "respuesta1": "2008",
  "respuesta2": "2007",
  "respuesta3": "2011",
  "correcta": 1
}, {
  "id": 4,
  "pregunta": "¿Quien gano la lucha entre Anderson Silva y Chris Weidman en el UFC 162?",
  "respuesta1": "Anderson Silva",
  "respuesta2": "Chris Weidman",
  "respuesta3": "Empate",
  "correcta": 2
}, {
  "id": 5,
  "pregunta": "¿Que equipo gano la Libertadores 2008?",
  "respuesta1": "Fluminense",
  "respuesta2": "Liga de Quito",
  "respuesta3": "Boca",
  "correcta": 2
}];

  return {
    all: function() {
         return preguntas;
    },
    get: function(preungtaId) {
      for (var i = 0; i < preguntas.length; i++) {
        if (preguntas[i].id === parseInt(preungtaId)) {
          return preguntas[i];
        }
      }
      return null;
    }
  };
});
