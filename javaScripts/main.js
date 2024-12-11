const resultados = document.getElementById("aside");
const error = document.getElementById("aside");

async function realizarFetch(url) {
    return fetch(url)

        .then(response =>{
            if(!response.ok){
                throw new Error('Error en la solicitud' + response.statusText)
            }
            return response.json()
        })

        .catch( error => {
            throw new Error('Error de red: ' + error)
        })
}

realizarFetch('../assets/json/suplementacion.json') // Llamo a la función realizarFetch con la URL del archivo JSON
        .then(data => {
            const suplementos = data.suplementos; // Extraigo la propiedad "suplementos" del objeto JSON recibido

                // Creo una cadena HTML iterando sobre cada suplemento en el array
                const noticiasHTML = suplementos.map(suplemento => `
                    <div class="tarjeta">
                        <h3>${suplemento.nombre}</h3>
                        <p>${suplemento.descripcion}</p>
                        <ul>
                            ${suplemento.beneficios.map(beneficio => `<li>${beneficio}</li>`).join('')}
                        </ul>
                        <p><strong>Dosis recomendada:</strong> ${suplemento.dosis_recomendada}</p>
                        <p><strong>Contraindicaciones:</strong> ${suplemento.contraindicaciones}</p>
                    </div>
                `).join('');// Voy uniendo todos los elementos HTML generados en una sola cadena
                
                // Inserto el HTML generado dentro del elemento "resultados"...
                resultados.innerHTML = noticiasHTML;
        })

        
        .catch(error => {
            // Maneja cualquier error que ocurra durante la solicitud o el procesamiento de los datos
            console.error("Error al cargar los datos:", error);
            // Muestra un mensaje de error en el contenedor de resultados
            resultados.innerHTML = `<p>Error al cargar los datos.</p>`;
        });

        // Hago un el evento para cuando cargue la página cargue el titulo
        window.addEventListener("load", () => {
            const tituloH1 = document.querySelector(".titulo");
            let subTexto = document.querySelector(".txt-cabecera");

           
            setTimeout(() => {
                tituloH1.classList.add('visible');
                subTexto.classList.add('muestra')
 
            }, 300);
        })





// Le doy dinamismo al titulo H3 de la barra Nav.
window.addEventListener('scroll', function(){
        let tituloH3 = document.querySelector(".h3-barra");
        let imagenL = document.querySelector(".logo");
        

        let alturaVentana = window.innerHeight/8.5;

        // Este método devuelve un objeto con información sobre las dimensiones y la posición del elemento en el viewport.
        let distanciaLogo = imagenL.getBoundingClientRect().top;
        let distanciaH3 = tituloH3.getBoundingClientRect().top;

        tituloH3.classList.add('transform-left');
        imagenL.classList.add('transform-right');
    
        if(distanciaH3 <= alturaVentana || distanciaLogo <= alturaVentana){

            tituloH3.classList.add('muestra');
            imagenL.classList.add('muestra');
            

        }else{

            tituloH3.classList.remove('muestra');
            imagenL.classList.remove('muestra');

            
        }
        

})

        

