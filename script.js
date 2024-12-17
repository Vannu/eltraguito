
// variables globales
// almacena todos los productos cargados
let carrito = [];
let productosCargados = []; 

// Cargar el carrito desde localstorage y si no hay carrito en ñocalstorage, buscar en sessionstorage
window.onload = function() {
    
    const carritoStorage = localStorage.getItem('carrito');
    if (carritoStorage) {
        carrito = JSON.parse(carritoStorage);
        actualizarCarrito();
    } else {
        
        const carritoStorageSession = sessionStorage.getItem('carrito');
        if (carritoStorageSession) {
            carrito = JSON.parse(carritoStorageSession);
            actualizarCarrito();
        }
    }

    // Cargar productos desde JSON
    fetch('productos.json')  
        .then(response => response.json())
        .then(data => {
            productosCargados = data.productos; 
            cargarProductos(productosCargados);  
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
};



// =====================
// Funciones Productos
// =====================

// cargar  productos en el contenedor

function cargarProductos(productos) {
    const productosContainer = document.getElementById('productos-container');
    productosContainer.innerHTML = ''; 

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('col-md-4', 'mb-4');
        productoDiv.setAttribute('data-categoria', producto.categoria); //  categoría para el filtro

        productoDiv.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito({
                        nombre: '${producto.nombre}', 
                        precio: '${producto.precio}', 
                        imagen: '${producto.imagen}'
                    })">Agregar al Carrito</button>
                </div>
            </div>
        `;

        // Agrega producto
        productosContainer.appendChild(productoDiv);
    });
}


//  filtrar los productos por categoría
function filtrarPorCategoria(categoria) {
   
    const productosFiltrados = productosCargados.filter(producto => producto.categoria === categoria);
    cargarProductos(productosFiltrados);  
}

//  ver todos los productos de la categoria
function verTodo() {
    cargarProductos(productosCargados); 
}

// =========================
// Funciones para el Carrito
// =========================

//  mostrar el mensaje de confirmación de agegar produto al carrito
function mostrarMensajeConfirmacionCarrito() {
    const mensajeCarrito = document.getElementById('mensaje-confirmacion-carrito');
    
    // Mostrar  mensaje
    mensajeCarrito.style.display = 'block';
    mensajeCarrito.classList.add('show');

    // Ocultar  mensaje 
    setTimeout(() => {
        mensajeCarrito.classList.remove('show');
        mensajeCarrito.style.display = 'none';
    }, 3000);
}
// Función  agregar productos
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(p => p.nombre === producto.nombre);

     // Si el producto  existe, aumentar la cantidad
     // y si no existe, agrgar el producto con cantidad 1
    if (productoExistente) {
       
        productoExistente.cantidad++;
    } else {
        
        producto.cantidad = 1;
        carrito.push(producto);
    }
    
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
    guardarCarritoEnSessionStorage();
   
      // Mostrar  mensaje de confirmación
      mostrarMensajeConfirmacionCarrito();
}

// Función  actualizar  carrito 
function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito-contenedor');
    if (carritoContainer) {
        carritoContainer.innerHTML = ""; 

        // Mostrar  productos 
        carrito.forEach((producto, index) => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-carrito');
            productoDiv.innerHTML = `
                <div class="producto d-flex align-items-center mb-3 p-3 border rounded">
                    <!-- Imagen del producto -->
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail" style="width: 100px; height: 100px; margin-right: 20px;">
                    
                    <!-- Información del producto -->
                    <div class="producto-info d-flex flex-column justify-content-between" style="flex: 1;">
                        <h5 class="producto-nombre">${producto.nombre}</h5>
                        <p class="producto-precio">${producto.precio}</p>
                    </div>

                    <!-- Campo de cantidad -->
                    <div class="producto-cantidad d-flex align-items-center">
                        <label for="cantidad-${index}" class="mr-2">Cant:</label>
                        <input type="number" id="cantidad-${index}" class="form-control" 
                               value="${producto.cantidad || 1}" min="1" 
                               style="width: 60px;" 
                               onchange="actualizarCantidad(${index}, this.value)">
                    </div>

                    <!-- Botón de eliminar -->
                    <button class="btn btn-danger" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
            carritoContainer.appendChild(productoDiv);
        });

        // Mostrar el total del carrito
        const totalCarrito = carrito.reduce((total, producto) => total + parseFloat(producto.precio.replace('$', '')) * producto.cantidad, 0);
        document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;

        // Si el carrito está vacío, mostrar un mensaje
        if (carrito.length === 0) {
            carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        }
    } else {
        console.error('El contenedor del carrito no se encuentra en el DOM.');
    }
}

// Función  eliminar  producto
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
    guardarCarritoEnSessionStorage();
}

// Función  actualizar  cantidad de producto
function actualizarCantidad(index) {
    const cantidadInput = document.getElementById(`cantidad-${index}`);
    const nuevaCantidad = parseInt(cantidadInput.value);

    if (nuevaCantidad > 0) {
        carrito[index].cantidad = nuevaCantidad;
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
        guardarCarritoEnSessionStorage();
    }
}

// Función  vaciar  carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
    guardarCarritoEnSessionStorage();
}

// Función  guardar  carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función  guardar  carrito en sessionStorage
function guardarCarritoEnSessionStorage() {
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
}



// =========================
// Funciones para el Pago
// =========================

//  mostrar el mensaje de confirmación de pago
function mostrarMensajeConfirmacionPago() {
    const mensajePago = document.getElementById('mensaje-confirmacion-pago');

    // Mostrar mensaje
    mensajePago.style.display = 'block';
    mensajePago.classList.add('show'); 

    // Resetear  formulario
    const formPago = document.getElementById('form-pago');
    formPago.reset();  // Esto limpiará todos los campos del formulario

    
    // Ocultar mensaje 
    setTimeout(() => {
        mensajePago.classList.remove('show');
        mensajePago.style.display = 'none';
    }, 3000);
}

const formPago = document.getElementById('form-pago');

formPago.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const tarjeta = document.getElementById('tarjeta').value;
    const fechaExpiracion = document.getElementById('fecha-expiracion').value;
    const cvv = document.getElementById('cvv').value;

// Si los campos están completos, mostrar el mensaje de confirmación de pago
        // y si faltan datos, alertar al usuario
    if (nombre && tarjeta && fechaExpiracion && cvv) {
        
        mostrarMensajeConfirmacionPago();
    } else {
        
        alert('Por favor, completa todos los campos antes de proceder con el pago.');
    }
});


// =========================
// Funciones de contacto
// =========================

// Validar formulario de contacto
function validarFormulario(event) {
    event.preventDefault();  

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    let mensajeError = '';

    // Validar  nombre
    if (nombre.trim() === '') {
        mensajeError += 'Por favor ingresa tu nombre.\n';
    }

    // Validar correo 
    if (email.trim() === '') {
        mensajeError += 'Por favor ingresa tu correo electrónico.\n';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        mensajeError += 'Por favor ingresa un correo electrónico válido.\n';
    }

    // Validar  mensaje
    if (mensaje.trim() === '') {
        mensajeError += 'Por favor ingresa un mensaje.\n';
    }

    // errores
    if (mensajeError !== '') {
        alert(mensajeError);
    } else {
        
        document.getElementById('form-contacto').submit();
    }
}

// validar formulario
document.getElementById('form-contacto').addEventListener('submit', validarFormulario);