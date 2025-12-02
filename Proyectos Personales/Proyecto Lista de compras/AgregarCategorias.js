/*
Documento que sirve para agregar las nuevas categorias de productos al
select de categorias en el archivo ejemplo.html
*/

const listCategorias = ['Frutas y Verduras', 'Lácteos', 'Carnes y Pescados', 'Despensa', 'Limpieza', 'Otros'];
const categorias = document.querySelector('#categoryInput');

listCategorias.forEach(categoria => {
    categorias.insertAdjacentHTML('beforeend', `<option value="${categoria}">${categoria}</option>`);
})