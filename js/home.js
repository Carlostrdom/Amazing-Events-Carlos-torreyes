import { obtenerCategorias, crearCheckboxes, filtrarEventos, mostrarEventos } from '../module/module.js';

function Myhome() {
    fetch('https://aulamindhub.github.io/amazing-api/events.json')
        .then(response => response.json())
        .then(data => {
            let categoriasUnicas = obtenerCategorias(data.events);
            crearCheckboxes(categoriasUnicas, () => filtrarEventos(data, mostrarEventos));
            mostrarEventos(data.events);

            document.getElementById('button-addon1').addEventListener('click', () => filtrarEventos(data, mostrarEventos));
            document.getElementById('filterText').addEventListener('input', () => {
                filtrarEventos(data, mostrarEventos);
            });
        });
}

Myhome();
