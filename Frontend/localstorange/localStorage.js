//variables globales 

let nombrePro = document.querySelector("#nombre-pro");
let precioPro = document.querySelector("#precio-pro");
let imagenPro = document.querySelector("#imagen-pro");
let descripcionPro = document.querySelector("#descripcion-pro");
let btnGuardar = document.querySelector(".btn-guardar");
let btnBorrar = document.querySelector(".btn-borrar");
let listadoTabla = document.querySelector(".listado tbody");

let buscarPro = document.querySelector("#buscar-pro");


localStorage.removeItem("nombre"); // Elimina el item "nombre" del localStorage */
 btnBorrar.addEventListener("click", () => {
    localStorage.clear();
    alert("localStorage borrado exitosamente");
}); 


btnGuardar.addEventListener("click", () => {
    let infoPro=validForm()
    if (infoPro) {
        saveLocalStorage(infoPro);
        clearTable();
        getData();
    }else{
        return;
    }
});
//evento para recargar la pagina y mostrar los datos guardados
document.addEventListener("DOMContentLoaded", () => {
    getData();
});

function validForm() {
    let producto;
    if(nombrePro.value && precioPro.value && imagenPro.value && descripcionPro.value){ 
        producto = {
            nombre: nombrePro.value,
            precio: precioPro.value,
            imagen: imagenPro.value,
            descripcion: descripcionPro.value
        }
        nombrePro.value = "";
        precioPro.value = "";
        imagenPro.value = "";
        descripcionPro.value = "";
    }else{
        alert("por favor complete todos los campos");
    }
    console.log(producto);

    return producto;
}


//funcion para guaradar los datos en localStorage
function saveLocalStorage(pro) {
    let productosGuardados = JSON.parse(localStorage.getItem("listado-pro"))|| [];
    productosGuardados.push(pro);
    localStorage.setItem("listado-pro", JSON.stringify(productosGuardados));
    alert("Producto guardado exitosamente");
}

function searchProduct() {
    let searchTerm = buscarPro.value.toLowerCase();
    let productosGuardados = JSON.parse(localStorage.getItem("listado-pro")) || [];
    clearTable();
    
    productosGuardados.forEach((producto, i) => {
        if (producto.nombre.toLowerCase().includes(searchTerm)) {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${i + 1}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.descripcion}</td>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="120"></td>
                <td>
                    <button class="btn btn-warning" type="button">💥</button>
                    <button class="btn btn-danger" type="button">❌</button>
                </td>
            `;
        }
    });
}
//funcion para mosytrar datos de localStorage
function getData() {
    let productosGuardados = JSON.parse(localStorage.getItem("listado-pro"))|| [];
    productosGuardados.forEach((producto , i)=> {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" width="120"></td>
            <td>
                <button class="btn btn-warning" type="button">💥</button>
                <button class="btn btn-danger" type="button">❌</button>
            </td>
        `;
        listadoTabla.appendChild(fila);
    });
}

function clearTable() {
    listadoTabla.innerHTML = "";
}