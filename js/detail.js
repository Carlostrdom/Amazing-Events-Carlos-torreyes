import { mostrarDetalles } from '../module/module-detail.js';

// Obtener los parámetros de la URL
let url = 'https://aulamindhub.github.io/amazing-api/events.json';
let params = new URLSearchParams(window.location.search);
let texto = params.get('id');

// Función para obtener los datos de la API
function obtenerDatos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarDetalles(data.events, texto);
        })

        .catch(error => {
            console.log('Error:', error);
        });
}
obtenerDatos();