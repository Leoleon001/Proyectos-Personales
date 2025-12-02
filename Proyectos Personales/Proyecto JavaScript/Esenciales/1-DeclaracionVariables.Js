//En el siguinete programa se mostrara como declarar variables en JavaScript
//Existen tres formas de declarar variables en JavaScript: var, let y const

//1. Declaracion de variable con var
var nombre = "Juan";
console.log("Variable declarada con var: " + nombre);
//Las variables declaradas con var tienen un alcance de funcion o global y se pueden volver a declarar
var nombre = "Pedro";
console.log("Variable redeclarada con var: " + nombre);

//2. Declaracion de variable con let
let edad = 25;
console.log("Variable declarada con let: " + edad);
//Las variables declaradas con let tienen un alcance de bloque y no se pueden volver a declarar
//let edad = 30; //Esto generaria un error
edad = 30;
console.log("Variable modificada con let: " + edad);

//3. Declaracion de variable con const
const PI = 3.14;
console.log("Variable declarada con const: " + PI);
//Las variables declaradas con const tienen un alcance de bloque y no se pueden volver a declarar ni modificar
//PI = 3.1416; //Esto generaria un error


//Observaciones finales:
//- Es recomendable usar let y const en lugar de var para evitar problemas de alcance y redeclaracion
//- Usar const para variables que no cambian su valor y let para variables que pueden cambiar
//- Unicamente usar var si se necesita compatibilidad con codigo antiguo o alcance global

//Fin del programa