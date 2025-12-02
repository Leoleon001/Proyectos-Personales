/*
En React, nunca modificamos el "estado" directamente; creamos copias nuevas con cambios. 
Este ejercicio entrena esa habilidad.

Tu Tarea:

    Tienes un objeto usuario.

    Crea un nuevo objeto llamado usuarioActualizado usando el Spread Operator (...). 
    Este nuevo objeto debe tener todas las propiedades del original, pero el rol debe cambiar a 'admin'.

    Después, usando Desestructuración, extrae el nombre y el rol del nuevo objeto en variables individuales e 
    imprímelas.
*/


const usuario = {
  nombre: 'Carlos',
  edad: 28,
  rol: 'invitado',
  email: 'carlos@mail.com'
};

const usuarioActualizado = {...usuario, rol: 'admin'};

const {nombre, rol} = usuarioActualizado;

console.log(usuarioActualizado); // { nombre: 'Carlos', ... rol: 'admin' ... }
console.log(nombre, rol); // Carlos admin