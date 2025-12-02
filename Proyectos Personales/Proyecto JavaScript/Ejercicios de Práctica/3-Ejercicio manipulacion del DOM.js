/*

Ejercicio 3: DOM Dinámico (Crear una lista)

React se encarga de actualizar el DOM por ti, pero para entenderlo, primero debes saber hacerlo "a mano" (Vanilla JS).

Tu Tarea: Crea un pequeño script que interactúe con el HTML.

    Captura el clic del botón "Agregar".

    Lee el valor del input.

    Crea un nuevo elemento <li>.

    Asigna el valor del input al texto del <li>.

    Agrega ese <li> dentro del <ul> existente.

    (Bonus): Limpia el input después de agregar el elemento.

*/

const btnAgregar = document.querySelector('#btnAgregar');
btnAgregar.addEventListener('click',function(){
    const itemInput = document.querySelector('#itemInput')
    const listaTareas = document.querySelector('#listaTareas')
    const nuevoItem = document.createElement('li');
    nuevoItem.textContent = itemInput.value;
    listaTareas.appendChild(nuevoItem);
    itemInput.value = '';
} );
