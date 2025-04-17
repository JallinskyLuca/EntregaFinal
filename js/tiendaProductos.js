/*
 Clase que representa un producto individual en la tienda.
 Cada instancia de esta clase contendrá la información básica de un producto,
 como su ID, nombre, precio, la ruta de su imagen y su categoría.
 */
class Producto {
    constructor(id, nombre, precio, imagen, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.categoria = categoria;
    }
}
/* 
 Clase que gestiona la lógica del carrito de compras.
 Almacena los productos en el carrito, calcula el total,
 actualiza la visualización y guarda el estado en el localStorage.
  */
class Carrito {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
        this.productosContainer = document.getElementById("carrito-container");
        this.totalCarrito = document.getElementById("total-carrito");
    }
/* 
  Agrega un producto al carrito. Si el producto ya existe, incrementa su cantidad. Si no existe, lo añade al array de productos con una cantidad de 1. Muestra una notificación al usuario y actualiza la visualización del carrito.
 */
    agregar(producto) {
        const productoEnCarrito = this.productos.find(prod => prod.id === producto.id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
            this.mostrarNotificacion(`Se incrementó ${producto.nombre} al carrito`);
        } else {
            this.productos.push({ ...producto, cantidad: 1 });
            this.mostrarNotificacion(`${producto.nombre} agregado al carrito`);
        }
        this.actualizar();
    }
/*  
    Elimina un unidad del producto del carrito. si es 1 lo elimina por completo, muestra una notificacion y actualiza la visualizacion del carrito.
*/
    eliminar(id) {
        const productoEnCarrito = this.productos.find(prod => prod.id === id);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad--;
            if (productoEnCarrito.cantidad === 0) {
                this.productos = this.productos.filter(prod => prod.id !== id);
                this.mostrarNotificacion(`Se eliminó ${productoEnCarrito.nombre} del carrito`);
            } else {
                this.mostrarNotificacion(`Se redujo ${productoEnCarrito.nombre} del carrito`);
            }
        }
        this.actualizar();
    }

    /* 
    Vacía completamente el carrito de compras. Muestra una confirmación al usuario antes de realizar la acción. Si el usuario confirma, limpia el array de productos y actualiza la visualización. 
    */
    vaciar() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se vaciará tu carrito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.productos = [];
                this.actualizar();
                Swal.fire(
                    '¡Vaciado!',
                    'Tu carrito está vacío.',
                    'success'
                );
            }
        });
    }
    /*
      Calcula el total de todos los productos que haya en el carrito 
    */
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    }

    /*
      Actualiza la visualización del carrito en el DOM. Limpia el contenedor del carrito, itera sobre los productos, crea elementos HTML para cada uno y los añade al contenedor. También actualiza el precio total y guarda el carrito en el localStorage.
     */
    actualizar() {
        this.productosContainer.innerHTML = "";
        let total = this.calcularTotal();

        this.productos.forEach(producto => {
            const productoHTML = document.createElement("div");
            productoHTML.innerHTML = `
                <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                <button class="eliminar-item" data-id="${producto.id}">-</button>
            `;
            this.productosContainer.appendChild(productoHTML);
        });

        const botonesEliminar = this.productosContainer.querySelectorAll('.eliminar-item');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', () => this.eliminar(parseInt(boton.dataset.id)));
        });

        this.totalCarrito.textContent = `Total: $${total}`;
        localStorage.setItem("carrito", JSON.stringify(this.productos));
    }

    /* 
     Carga el carrito inicial al cargar la página, actualizando la visualización.
    */
    cargarCarritoInicial() {
        this.actualizar();
    }

    /*
    Muestra una breve notificación en la parte superior de la pantalla.
     */
    mostrarNotificacion(mensaje) {
        const notificacion = document.getElementById('notificacion-carrito');
        notificacion.textContent = mensaje;
        notificacion.style.opacity = '1';
        notificacion.style.display = 'block';
        setTimeout(() => {
            notificacion.style.opacity = '0';
            setTimeout(() => {
                notificacion.style.display = 'none';
            }, 300);
        }, 1500);
    }
}

// obtencion de referencias a elementos del DOM
const productosContainer = document.getElementById("productos-container");
const btnVaciarCarrito = document.getElementById("vaciar-carrito");
const btnFinalizarCompra = document.getElementById("finalizar-compra");
const modalPago = document.getElementById("modal-pago");
const btnCerrarModalPago = document.getElementById("cerrar-modal");
const formularioPago = document.getElementById("formularioPago");
const modalAutenticacion = document.getElementById("modal-autenticacion");
const btnCerrarAutenticacion = document.getElementById("cerrar-autenticacion");
const formularioLogin = document.getElementById("formularioLogin");
const formularioRegistro = document.getElementById("formularioRegistro");
const mostrarRegistroLink = document.getElementById("mostrar-registro");
const mostrarLoginLink = document.getElementById("mostrar-login");
const registroUsuarioInput = document.getElementById("registro-usuario");
const registroContrasenaInput = document.getElementById("registro-contrasena");
const registroEmailInput = document.getElementById("registro-email");
const loginUsuarioInput = document.getElementById("login-usuario");
const loginContrasenaInput = document.getElementById("login-contrasena");
const pagoNombreInput = document.getElementById("nombre");
const pagoTarjetaInput = document.getElementById("tarjeta");
const pagoVencimientoInput = document.getElementById("vencimiento");
const btnCerrarSesionTopLeft = document.getElementById("cerrar-sesion-top-left");

// Variables globales
let carritoTienda;
let productosData = [];
let usuarioAutenticado = localStorage.getItem('usuarioAutenticado'); // Para rastrear si el usuario ha iniciado sesión

// Simulación de usuarios registrados.
const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

// Guarda un nuevo usuario registrado en el almacenamiento local
function guardarUsuario(usuario, contrasena, email) {
    const nuevoUsuario = { usuario, contrasena, email };
    usuariosRegistrados.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
}

// Verifica si las credenciales de inicio de sesión proporcionadas coinciden con algún usuario registrado en el almacenamiento local.
function verificarCredenciales(usuario, contrasena) {
    return usuariosRegistrados.some(u => u.usuario === usuario && u.contrasena === contrasena);
}

// Obtiene la lista de productos desde el archivo JSON './productos.json'. Utiliza la API Fetch para realizar la petición y luego procesa la respuesta para crear instancias de la clase Producto y mostrarlas en la página.
async function obtenerProductos() {
    try {
        const response = await fetch('./productos.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        productosData = data.map(data => new Producto(data.id, data.nombre, data.precio, data.imagen, data.categoria));
        mostrarProductos();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        Swal.fire('Error', 'No se pudieron cargar los productos.', 'error');
    }
}
// Muestra los productos en la página web. Itera sobre el array `productosData`, crea el HTML para cada producto y lo añade al contenedor de productos en el DOM. También añade event listeners a los botones "Agregar" de cada producto.
function mostrarProductos() {
    productosContainer.innerHTML = "";
    productosData.forEach(producto => {
        const productoHTML = document.createElement("div");
        productoHTML.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre} - $${producto.precio}</p>
            <button class="agregar-item" data-id="${producto.id}">Agregar</button>
        `;
        productosContainer.appendChild(productoHTML);
    });

    // Añade event listeners a los botones "Agregar" de cada producto para agregarlos al carrito
    const botonesAgregar = productosContainer.querySelectorAll('.agregar-item');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const productoSeleccionado = productosData.find(p => p.id === id);
            carritoTienda.agregar(productoSeleccionado);
        });
    });
}
// Actualiza la visibilidad del botón de cerrar sesión basado en si hay un usuario autenticado.
function actualizarEstadoSesion() {
    if (usuarioAutenticado) {
        btnCerrarSesionTopLeft.style.display = "block";
    } else {
        btnCerrarSesionTopLeft.style.display = "none";
    }
}

// Event listener para el botón "Finalizar Compra"
btnFinalizarCompra.addEventListener("click", () => {
    if (usuarioAutenticado) {
        modalPago.style.display = "block";
    } else {
        modalAutenticacion.style.display = "block";
    }
});

// Event listener para cerrar el modal de pago
btnCerrarModalPago.addEventListener("click", () => {
    modalPago.style.display = "none";
});

// Event listener para cerrar el modal de autenticación
btnCerrarAutenticacion.addEventListener("click", () => {
    modalAutenticacion.style.display = "none";
});

// Event listener para mostrar el formulario de registro
mostrarRegistroLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-form").style.display = "none";
    document.getElementById("registro-form").style.display = "block";
});

// Event listener para mostrar el formulario de inicio de sesión
mostrarLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("registro-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});

// Event listener para el formulario de registro
formularioRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = registroUsuarioInput.value.trim();
    const contrasena = registroContrasenaInput.value;
    const email = registroEmailInput.value.trim();

    if (!usuario || !contrasena || !email) {
        Swal.fire('Error', 'Todos los campos son obligatorios.', 'error');
        return;
    }

    if (usuariosRegistrados.some(u => u.usuario === usuario)) {
        Swal.fire('Error', 'El usuario ya existe.', 'error');
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        Swal.fire('Error', 'Formato de correo electrónico inválido.', 'error');
        return;
    }

    guardarUsuario(usuario, contrasena, email);
    localStorage.setItem('usuarioAutenticado', usuario);
    usuarioAutenticado = usuario;
    modalAutenticacion.style.display = "none";
    actualizarEstadoSesion(); // Actualizar la visibilidad del botón de cerrar sesión
    Swal.fire('Registro Exitoso', `Bienvenido, ${usuario}!`, 'success');
    formularioRegistro.reset();
    document.getElementById("login-form").style.display = "block";
    document.getElementById("registro-form").style.display = "none";
});

// Event listener para el formulario de inicio de sesión
formularioLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = loginUsuarioInput.value.trim();
    const contrasena = loginContrasenaInput.value;

    if (!usuario || !contrasena) {
        Swal.fire('Error', 'Usuario y contraseña son obligatorios.', 'error');
        return;
    }

    if (verificarCredenciales(usuario, contrasena)) {
        localStorage.setItem('usuarioAutenticado', usuario);
        usuarioAutenticado = usuario;
        modalAutenticacion.style.display = "none";
        actualizarEstadoSesion(); // Actualizar la visibilidad del botón de cerrar sesión
        Swal.fire('Inicio de Sesión Exitoso', `Bienvenido, ${usuario}!`, 'success');
        formularioLogin.reset();
    } else {
        Swal.fire('Error', 'Credenciales incorrectas.', 'error');
    }
});

// Event listener para el botón "Cerrar Sesión"
btnCerrarSesionTopLeft.addEventListener("click", () => {
    localStorage.removeItem('usuarioAutenticado');
    usuarioAutenticado = null;
    actualizarEstadoSesion();
    modalAutenticacion.style.display = "block"; // Volver a mostrar el modal de autenticación
    Swal.fire('Sesión Cerrada', 'Has cerrado tu sesión.', 'success');
});

// Event listener para el formulario de pago simulado
formularioPago.addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = pagoNombreInput.value.trim();
    const numeroTarjeta = pagoTarjetaInput.value.trim();
    const vencimiento = pagoVencimientoInput.value;

    if (!nombre || !numeroTarjeta || !vencimiento) {
        Swal.fire('Error', 'Todos los campos de pago son obligatorios.', 'error');
        return;
    }

    if (isNaN(numeroTarjeta)) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingresa un número de tarjeta válido.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Simulación del procesamiento del pago con diferentes estados
    Swal.fire({
        title: 'Procesando Pago...',
        html: 'Por favor, espere...',
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
        }
    });

    // Simulación de una promesa para el procesamiento del pago
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simula 2 segundos de procesamiento

    const estadoPago = Math.random() < 0.8 ? 'exitoso' : 'fallido'; // 80% de éxito

    Swal.close();

    if (estadoPago === 'exitoso') {
        Swal.fire({
            title: '¡Pago Exitoso!',
            text: 'Tu compra ha sido procesada con éxito.',
            icon: 'success',
            confirmButtonText: 'Volver al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                carritoTienda.vaciar();
                modalPago.style.display = "none";
                window.location.reload(); // Recarga la página para simular volver al inicio
            }
        });
    } else {
        Swal.fire({
            title: '¡Pago Fallido!',
            text: 'Hubo un problema al procesar tu pago. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
});
// Event listener para el botón "Vaciar carrito"
btnVaciarCarrito.addEventListener("click", () => {
    carritoTienda.vaciar();
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    localStorage.removeItem('carrito'); // Reinicia el carrito al cargar la página
    carritoTienda = new Carrito();
    obtenerProductos();
    carritoTienda.cargarCarritoInicial();

    // Fuerza la aparición del modal de autenticación al cargar la página si no hay usuario autenticado
    if (!usuarioAutenticado) {
        modalAutenticacion.style.display = "block";
    } else {
        actualizarEstadoSesion(); // Mostrar el botón de cerrar sesión si ya está logueado
    }
});
