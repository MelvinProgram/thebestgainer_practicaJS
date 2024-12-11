// Obtener elementos del DOM
const nombreInput = document.getElementById('nombre');
const telefonoInput = document.getElementById('telefono');
const emailInput = document.getElementById('email');
const apellidoInput = document.getElementById('apellido');
const formulario = document.getElementById('formulario');
const precioInput = document.getElementById("producto");
const resultado = document.getElementById("presupuesto-final");

// Función para validar el nombre
function valNombre(){
    const nombre = nombreInput.value
    const nombrePattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/
    if(nombre.length <= 15 && nombre.trim() && nombrePattern.test(nombre)){
        nombreInput.classList.add('valido')
        nombreInput.classList.remove('invalido')
        document.getElementById('nombreError').textContent = ''
    }else{
        nombreInput.classList.add('invalido')
        nombreInput.classList.remove('valido')
        document.getElementById('nombreError').textContent = 'El nombre de usuario debe contener como máximo 15 letras.'
    }
}

// Función para validar el Apellido
function valApellido(){
    const apellido = apellidoInput.value
    const apellidoPattern = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/

    if(apellido.length <= 40 && apellido.trim() && apellidoPattern.test(apellido)){
        apellidoInput.classList.add('valido')
        apellidoInput.classList.remove('invalido')
        document.getElementById('apellidoError').textContent = ''
    }else{
        apellidoInput.classList.add('invalido')
        apellidoInput.classList.remove('valido')
        document.getElementById('apellidoError').textContent = 'Sólo podrá contener letras y tendrá una longitud máxima de 40 caracteres.'
    }
}

// Función para validar el Telefóno 
function valTelefono(){
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{9}$/;

    if(telefonoPattern.test(telefono)){
        telefonoInput.classList.add('valido')
        telefonoInput.classList.remove('invalido')
        document.getElementById('telefonoError').textContent = ''
    }else{
        telefonoInput.classList.add('invalido')
        telefonoInput.classList.remove('valido')
        document.getElementById('telefonoError').textContent = 'Sólo podrá contener números y tendrá una longitud máxima de 9 dígitos.'
    }
}

// Función para validar Email
function valEmail(){
    const email = emailInput.value
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(emailPattern.test(email)){
        emailInput.classList.add('valido')
        emailInput.classList.remove('invalido')
        document.getElementById('emailError').textContent = ''
    }else{
        emailInput.classList.add('invalido')
        emailInput.classList.remove('valido')
        document.getElementById('emailError').textContent = 'Deberá cumplir con los estándares de un correo electrónico. Ejemplo: nnnnn_nnn@zzzzz.xxx'
    }
}

// Producto
function calcularPre() {
    const precioProducto = parseFloat(precioInput.value);

    if (precioProducto == 0) {
        precioInput.classList.add("invalido");
        precioInput.classList.remove("valido");
        document.getElementById("productoError").textContent =
            "Debe seleccionar un producto para poder continuar.";
    } else {
        precioInput.classList.add("valido");
        precioInput.classList.remove("invalido");
        document.getElementById("productoError").textContent = "";
    }    

    // Plazo
    const plazo = parseInt(document.getElementById("meses").value);
    let descuento = 0;
    if (plazo >= 12) {
      descuento = 0.10; // 10% de descuento si el plazo es mayor o igual a 12 meses
    }

    // Extras
    const extras = document.querySelectorAll("input[class='input-check']:checked");
    let costesExtras = 0;

    extras.forEach(extra => {
      costesExtras += parseFloat(extra.value);
    });

    // Cálculo final con un descuento del 10%
    let total = precioProducto + costesExtras;
    total = total - (total * descuento);

    // Mostrar resultado
    let mostrar = document.getElementById("presupuesto-final").innerText = total.toFixed(2) + "€";

}

calcularPre();

// Vaciar el formulario una vez se registre correcamente
function resetFormulario(){
    formulario.reset()
    nombreInput.classList.remove('valido');
    telefonoInput.classList.remove('valido');
    emailInput.classList.remove('valido');
    apellidoInput.classList.remove('valido');
    precioInput.classList.remove('valido');
    resultado.innerText = "0.00€";
}

// ====================== PRESUPUESTO ======================

const extras = document.querySelectorAll(".input-check");
const presupuesto = document.getElementById("presupuesto-final");

// Eventos para actualizar el presupuesto 
meses.addEventListener("input", calcularPre);
extras.forEach(extra => {
    extra.addEventListener("change", calcularPre);
})

// Hago el llamado al boton para ejecutar la función
// let btnCalcular = document.getElementById("btn-calcular");
// btnCalcular.addEventListener('click', calcularPre);

// Llamada a las funciones
nombreInput.addEventListener('input', valNombre);
telefonoInput.addEventListener('input', valTelefono);
emailInput.addEventListener('input', valEmail);
apellidoInput.addEventListener('input', valApellido);
precioInput.addEventListener('change', calcularPre);


formulario.addEventListener('submit', function(event){
    event.preventDefault()
    valNombre()
    valTelefono()
    valEmail()
    valApellido()
    calcularPre()


    if(nombreInput.classList.contains('valido') &&
        telefonoInput.classList.contains('valido') && 
        emailInput.classList.contains('valido') &&
        apellidoInput.classList.contains('valido') &&
        precioInput.classList.contains('valido')){
        // Mostrar envio
        alert("El formulario se ha enviado correctamente");
        resetFormulario();
        // Donde lo quieres enviar
    }else{
        alert("Por favor, corrija los errores en el formulario");
    }

    // Una vez enviado el formulario reseteamos este campo
    document.getElementById("presupuesto-final").innerText = "0.00€"; 
})

