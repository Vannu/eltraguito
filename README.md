# Proyecto Final - El Traguito

Este proyecto consiste en la creación de un sistema de venta online para bebidas, implementando funcionalidades de carrito de compras, formularios de contacto y un diseño responsivo que se adapta a diferentes dispositivos. A través de este proyecto se han utilizado HTML, CSS, JavaScript y tecnologías web modernas para crear una experiencia interactiva.

## Requisitos Cumplidos
- **Estructura HTML** funcional.
- **Formulario de contacto** operativo con validación.
- **Sistema de carrito de compras** que permite añadir, editar y eliminar productos.
- **Almacenamiento en el navegador**: uso de `localStorage` y `sessionStorage` para persistir el carrito de compras.
- **Diseño responsivo** utilizando Flexbox y Grid.
- **Fetch API** para cargar productos dinámicamente desde un archivo JSON.

## Funcionalidades Implementadas
### Carrito de Compras
- Los usuarios pueden **añadir productos** al carrito desde las tarjetas de productos.
- El **carrito de compras** se guarda en `localStorage` o `sessionStorage` para mantener la información incluso después de cerrar el navegador.
- Se pueden **visualizar los productos** en el carrito, **editar la cantidad** y **eliminar productos**.
- Al **agregar un producto al carrito**, se muestra un **mensaje de confirmación**.

### Formulario de Contacto
- Formulario de contacto funcional, con validación de campos (nombre, correo electrónico y mensaje).
- Los datos se envían a través de **Formspree** para manejar los envíos de manera sencilla.

### Uso de Fetch para Cargar Productos
- Los productos se cargan de manera dinámica desde un archivo JSON mediante la **API Fetch**.
- Los productos están organizados por categorías (Vinos, Cervezas, Espumantes, etc.).

## Tecnologías Utilizadas
- **HTML5**
- **CSS3** (Flexbox y Grid)
- **JavaScript** (DOM, Fetch API, LocalStorage, SessionStorage)
- **Formspree** (para envío de formularios)
- **GitHub Pages** (despliegue)

## Enlace al Proyecto
Puedes ver el proyecto desplegado en GitHub Pages aquí:  
[Ver Proyecto](https://vannu.github.io/eltraguito/)

