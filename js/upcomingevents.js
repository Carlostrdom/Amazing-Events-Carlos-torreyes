
import { obtenerCategorias, crearCheckboxes, filtrarEventos, mostrarEventos } from '../module/module.js';


function Myupcoming() {
    fetch('https://aulamindhub.github.io/amazing-api/events.json')
        .then(response => response.json())
        .then(data => {
            // Filtra eventos futuros
            let currentDate = new Date(data.currentDate);
            let eventosFuturos = data.events.filter(evento => new Date(evento.date) > currentDate);
            data.events = eventosFuturos;

            // Procesa los eventos futuros
            let categoriasUnicas = obtenerCategorias(data.events);
            crearCheckboxes(categoriasUnicas, () => filtrarEventos(data, mostrarEventos));
            mostrarEventos(data.events);

            // Configura los manejadores de eventos
            document.getElementById('button-addon1').addEventListener('click', () => filtrarEventos(data, mostrarEventos));
            document.getElementById('filterText').addEventListener('input', () => {
                filtrarEventos(data, mostrarEventos);
            });
        });
}

Myupcoming();
