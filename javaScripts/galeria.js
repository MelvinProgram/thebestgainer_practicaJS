// document.addEventListener("DOMContentLoaded", function(){

//     const proteinas = [
//         producto = {
//             imagen: "../assets/image/Dymatize Super Mass Gainer Rich Chocolate 2943g - Polvo Para Ganar Peso + Carbohidratos, Creapure Creatina, BCAA y Caseína/61PXejTYzzL._AC_SL1000.jpg",
//             informacion: "Dymatize Super Mass Gainer Rich Chocolate 2943g - Polvo Para Ganar Peso + Carbohidratos, Creapure Creatina, BCAA y Caseína",
//             precio:"39€"
//         }
//     ]

//     const imgProteina = document.querySelector(".imagen-producto")
//     const infoProducto = document.querySelector(".inf-producto p")
//     const precio1 = document.querySelector(".precio span")
    
//     imgProteina.src = producto.imagen;
//     infoProducto.textContent = producto.informacion;
//     precio1.textContent = producto.precio;
// })

document.addEventListener("DOMContentLoaded", function(){

    fetch("../assets/json/proteinas.json")
        .then(response => response.json())
        .then(data => {
            const contenedorProteina = document.querySelector(".set-proteinas");
                
            data.forEach(producto => {
                const productoHTML =
                `
                <div class="cont-proteina">

                    <div class="img-proteina">
                        <img class="imagen-producto" src="${producto.imagen}" alt="Imagen de producto">
                    </div>

                    <div class="inf-producto">
                        <h3>${producto.informacion}</h3>
                        <p class="p-info">${producto.detalles}</p>
                    </div>

                    <div class="precio-producto">
                        <button>Comprar</button>
                        <div class="precio">
                            <span>${producto.precio}€</span>
                            <small>/ precio unidad</small>
                        </div>
                    </div>
                </div>
        
                
                `;
                // Aquí ya estariamos recuperando todo el HTML que tenemos 
                contenedorProteina.insertAdjacentHTML("beforeend", productoHTML)


                // Efecto scroll en el contenedor de la proteina
                window.addEventListener("scroll", function () {
                    const tarjetas = document.querySelectorAll(".cont-proteina");
                    const logoProteina = document.querySelector('.logo-proteina');
                    const tituloH2 = document.querySelector('.h2-galeria'); 

                    const alturaVentana = window.innerHeight / 1.5;

                    const disLogoProte = logoProteina.getBoundingClientRect().top;
                    const distanciaH2 = tituloH2.getBoundingClientRect().top;

                    logoProteina.classList.add('transform-right');
                    tituloH2.classList.add('transform-left');
                
                    tarjetas.forEach((tarjeta) => {
                        const distanciaTarjeta = tarjeta.getBoundingClientRect().top;
                
                        if (distanciaTarjeta <= alturaVentana ) {
                            
                            tarjeta.classList.add("muestra");

                        } else {
                            tarjeta.classList.remove("muestra");
                        }
                    });

                    if(disLogoProte <= alturaVentana || distanciaH2 <= alturaVentana ){

                        logoProteina.classList.add('muestra-logo');
                        tituloH2.classList.add('muestra-h2');

                    }else{

                        logoProteina.classList.remove('muestra-logo');
                        tituloH2.classList.remove('muestra-h2');
                        
                    }
                });
            
        
        })
        })
        .catch(error => console.error("Error al obtener los datos: ", error))

        
        
})



