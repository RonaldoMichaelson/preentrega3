const productosDiv = document.getElementById("productos");
const carritoTable = document.getElementById("carrito-body");
const totalElement = document.getElementById("total");

const productos = [
    { id: 1, nombre: "Hamburgesa", precio: 10 },
    { id: 2, nombre: "Queso", precio: 20 },
    { id: 3, nombre: "Lechuga", precio: 30 },
    { id: 4, nombre: "Pan", precio: 15 },
];

function mostrarProductos() {
    productosDiv.innerHTML = "";
    productos.forEach((producto) => {
        const productoDiv = document.createElement("div");
        productoDiv.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

function agregarAlCarrito(productoId) {
    const productoSeleccionado = productos.find((producto) => producto.id === productoId);

    if (!productoSeleccionado) return;

    const productoEnCarrito = carrito.find((item) => item.id === productoId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    carritoTable.innerHTML = "";
    let total = 0;

    carrito.forEach((item) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>${item.cantidad}</td>
        `;
        carritoTable.appendChild(fila);
        total += item.precio * item.cantidad;
    });

    totalElement.textContent = `$${total}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function reiniciarCompras() {
    carrito.length = 0;
    actualizarCarrito();
}

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

mostrarProductos();
actualizarCarrito();