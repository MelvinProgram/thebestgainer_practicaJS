// Inicializar el mapa

const map = L.map('map').setView([40.421256, -3.707184], 13); // Coordenadas de Madrid, Gran Vía

// Cargar los tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marcador de la empresa
const empresaMarker = L.marker([40.421256, -3.707184]).addTo(map)
  .bindPopup("Nuestra empresa está aquí: Calle Gran Vía, 45").openPopup();

// Función para calcular ruta
function calcularRuta() {
  // Solicitar ubicación del cliente (navegador)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const clienteCoords = [position.coords.latitude, position.coords.longitude];

      // Crear marcador para el cliente
      const clienteMarker = L.marker(clienteCoords).addTo(map)
        .bindPopup("Estas aquí").openPopup();

      // Trazar la ruta
      L.Routing.control({
        waypoints: [
          L.latLng(clienteCoords), // Punto de inicio: Cliente
          L.latLng(40.421256, -3.707184) // Punto final: Empresa
        ],
        language: 'es', // Idioma del control
        routeWhileDragging: true
      }).addTo(map);

      // Centrar el mapa entre los puntos
      map.fitBounds([clienteCoords, [40.421256, -3.707184]]);
    }, (error) => {
      alert("No se pudo obtener tu ubicación. Por favor, activa la geolocalización.");
    });
  } else {
    alert("Tu navegador no admite geolocalización.");
  }
}

// Llamar a la función para calcular la ruta
calcularRuta();