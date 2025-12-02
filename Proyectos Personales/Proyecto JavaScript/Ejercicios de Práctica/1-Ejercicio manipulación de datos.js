/*
Este ejercicio simula algo muy común en React: recibir una lista de datos del servidor, filtrarla 
y transformarla para mostrarla.

Tu Tarea: Tienes un array de objetos que representan productos. Debes crear un nuevo array que cumpla dos condiciones:

    Solo incluya productos que cuesten más de 50.

    El formato de los elementos resultantes debe ser un string: "Producto: [Nombre] - Precio: $[Precio]".

    Usa const, arrow functions, filter, map y template literals.
*/

const productos = [
  { id: 1, nombre: 'Teclado', precio: 120 },
  { id: 2, nombre: 'Mouse', precio: 40 },
  { id: 3, nombre: 'Monitor', precio: 300 },
  { id: 4, nombre: 'Cable USB', precio: 15 }
];

const productosCaros = productos.filter(productos => productos.precio > 50)

console.log(productosCaros.map(productosCaros => `Producto: ${productosCaros.nombre} - Precio: ${productosCaros.precio}`));
