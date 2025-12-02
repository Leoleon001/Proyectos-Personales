//En el siguinete programa se mostrara como declarar funciones en JavaScript
//Existen varias formas de declarar funciones en JavaScript: declaracion de funcion, expresion de funcion 
//y funciones flecha
//1. Declaracion de funcion
function saludar(nombre) {
    return "Hola, " + nombre + "!";
}
console.log(saludar("Juan"));
//Las funciones declaradas de esta manera se pueden invocar antes de su definicion debido al proceso de elevacion


//2. Expresion de funcion
const despedir = function(nombre) {
    return "Adios, " + nombre + "!";
}
console.log(despedir("Juan"));
//Las funciones declaradas de esta manera no se pueden invocar antes de su definicion
//console.log(despedir("Pedro")); //Esto generaria un error


//3. Funcion flecha
const multiplicar = (a, b) => {
    return a * b;
}
console.log(multiplicar(2, 3));
//Las funciones flecha tienen una sintaxis mas corta y no tienen su propio contexto de "this"
//Si la funcion flecha tiene una sola expresion, se puede omitir las llaves y el return
const dividir = (a, b) => a / b;
console.log(dividir(6, 2));
//Tambien si la funcion flecha tiene un solo parametro, se pueden omitir los parentesis
const elevarAlCuadrado = x => x * x;
console.log(elevarAlCuadrado(4));

//Fin del programa