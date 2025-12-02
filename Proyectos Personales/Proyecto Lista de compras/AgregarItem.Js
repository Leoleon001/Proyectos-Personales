/*
En el siguiente codigo se va a agregar los items inresados por el usuario
*/
//Primero definimos las variables globales que vamos a utilizar
let shoppingList = []; // Arreglo para almacenar los items de la lista de compras
const itemInput = document.querySelector('#itemInput');
const quantityInput = document.querySelector('#quantityInput');
const categoryInput = document.querySelector('#categoryInput');
const addButton = document.querySelector('#addButton');
const clearCompletedButton = document.getElementById('clearCompleted');
const clearAllButton = document.getElementById('clearAll');
const shoppingListContainer = document.getElementById('shoppingList');
const totalItemsElement = document.getElementById('totalItems');
const pendingItemsElement = document.getElementById('pendingItems');
const completedItemsElement = document.getElementById('completedItems');

function saveShoppingList() {
    //localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function renderShoppingList() {
    // Limpiar el contenedor
    shoppingListContainer.innerHTML = '';
    
    // Si la lista está vacía, mostrar mensaje
    if (shoppingList.length === 0) {
        shoppingListContainer.innerHTML = `
            <div class="empty-list">
                <i class="fas fa-clipboard-list"></i>
                <h3>Tu lista de compras está vacía</h3>
                <p>Agrega productos usando el formulario de arriba</p>
            </div>
        `;
        return;
    }
    
    // Crear elementos para cada item
    shoppingList.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = `list-item ${item.completed ? 'item-completed' : ''}`;
        itemElement.innerHTML = `
            <div>
                <button class="icon-btn complete-btn" data-id="${item.id}">
                    <i class="fas fa-${item.completed ? 'check-circle' : 'circle'}"></i>
                </button>
            </div>
            <div class="item-name">${item.name}</div>
            <div class="item-category category">${item.category}</div>
            <div class="item-quantity">${item.quantity}</div>
            <div class="item-actions">
                <button class="icon-btn delete-btn" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        shoppingListContainer.appendChild(itemElement);
    });
    
    // Agregar event listeners a los botones
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', toggleItemCompletion);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteItem);
    });
}

function addItem() {
    const itemName = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value);
    const category = categoryInput.value || "Otros";
    
    if (itemName === '') {
        alert('Por favor, ingresa el nombre del producto');
        itemInput.focus();
        return;
    }
    
    if (isNaN(quantity) || quantity < 1) {
        alert('Por favor, ingresa una cantidad válida');
        quantityInput.focus();
        return;
    }
    
    // Crear nuevo item
    const newItem = {
        id: Date.now(), // ID único basado en timestamp
        name: itemName,
        quantity: quantity,
        category: category,
        completed: false
    };
    
    // Agregar a la lista
    shoppingList.push(newItem);
    
    // Guardar en localStorage
    saveShoppingList();
    
    // Actualizar la interfaz
    renderShoppingList();
    updateStats();
    
    // Limpiar campos de entrada
    itemInput.value = '';
    quantityInput.value = '1';
    categoryInput.value = '';
    itemInput.focus();
}

// Función para alternar el estado de completado de un item
function toggleItemCompletion(event) {
    const itemId = parseInt(event.currentTarget.getAttribute('data-id'));
    const itemIndex = shoppingList.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        shoppingList[itemIndex].completed = !shoppingList[itemIndex].completed;
        saveShoppingList();
        renderShoppingList();
        updateStats();
    }
}

// Función para eliminar un item
function deleteItem(event) {
    const itemId = parseInt(event.currentTarget.getAttribute('data-id'));
    shoppingList = shoppingList.filter(item => item.id !== itemId);
    saveShoppingList();
    renderShoppingList();
    updateStats();
}

// Función para limpiar items completados
function clearCompletedItems() {
    shoppingList = shoppingList.filter(item => !item.completed);
    saveShoppingList();
    renderShoppingList();
    updateStats();
}

// Función para limpiar toda la lista
function clearAllItems() {
    if (shoppingList.length === 0) return;
    
    if (confirm('¿Estás seguro de que quieres eliminar todos los items de la lista?')) {
        shoppingList = [];
        saveShoppingList();
        renderShoppingList();
        updateStats();
    }
}

// Función para actualizar estadísticas
function updateStats() {
    const totalItems = shoppingList.length;
    const completedItems = shoppingList.filter(item => item.completed).length;
    const pendingItems = totalItems - completedItems;
    
    totalItemsElement.textContent = totalItems;
    pendingItemsElement.textContent = pendingItems;
    completedItemsElement.textContent = completedItems;
}

// Event Listeners
addButton.addEventListener('click', addItem);

// Permitir agregar items con Enter
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

clearCompletedButton.addEventListener('click', clearCompletedItems);
clearAllButton.addEventListener('click', clearAllItems);

// Datos de ejemplo para probar la aplicación
function addSampleData() {
    if (shoppingList.length === 0) {
        const sampleItems = [
            { id: 1, name: 'Leche', quantity: 2, category: 'Lácteos', completed: false },
            { id: 2, name: 'Pan', quantity: 1, category: 'Despensa', completed: true },
            { id: 3, name: 'Manzanas', quantity: 6, category: 'Frutas y Verduras', completed: false },
            { id: 4, name: 'Pollo', quantity: 1, category: 'Carnes y Pescados', completed: false },
            { id: 5, name: 'Jabón', quantity: 3, category: 'Limpieza', completed: false }
        ];
        
        shoppingList = sampleItems;
        saveShoppingList();
        renderShoppingList();
        updateStats();
    }
}