
// Función para obtener categorías únicas
export function obtenerCategorias(eventos) {
    let categorias = [];
    for (let i = 0; i < eventos.length; i++) {
        if (!categorias.includes(eventos[i].category)) {
            categorias.push(eventos[i].category);
        }
    }
    return categorias;
}

// Función para crear checkboxes
export function crearCheckboxes(categorias, filtrarEventos) {
    let contenedorCategorias = document.getElementById('category-container');
    contenedorCategorias.innerHTML = '';

    for (let i = 0; i < categorias.length; i++) {
        let categoria = categorias[i];

        let container = document.createElement('div');
        container.classList.add('d-flex', 'align-items-center', 'mb-6'); // Añadir margen inferior

        let label = document.createElement('label');
        label.classList.add('d-flex', 'align-items-center', 'form-check', 'mb-0', 'ml-3'); // Agregar clases de estilo al label

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'category';
        input.value = categoria;
        input.classList.add('mr-2'); // Separación inicial del input

        // Agregar margen derecho más grande al input para mayor separación
        input.style.marginRight = '5px';

        label.appendChild(input);
        label.appendChild(document.createTextNode(categoria)); // Añadir el texto al label

        container.appendChild(label);
        contenedorCategorias.appendChild(container);
    }

    contenedorCategorias.addEventListener('change', filtrarEventos);
}


// Función para filtrar eventos
export function filtrarEventos(data, mostrarEventos) {
    let categoriasSeleccionadas = Array.from(document.querySelectorAll('input[name=category]:checked')).map(checkbox => checkbox.value);

    let textoBusqueda = document.getElementById('filterText').value.trim().toLowerCase();

    // Verificar si el campo de búsqueda está vacío
    let eventosFiltrados = data.events.filter(evento => {
        let nombreEvento = evento.name.toLowerCase().trim();
        let descripcionEvento = evento.description.toLowerCase().trim();

        let cumpleCategoria = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);

        // Si el texto de búsqueda está vacío, mostrar todos los eventos que cumplen con las categorías seleccionadas
        let cumpleBusqueda = textoBusqueda === '' || nombreEvento.includes(textoBusqueda) || descripcionEvento.includes(textoBusqueda);

        return cumpleCategoria && cumpleBusqueda;
    });

    mostrarEventos(eventosFiltrados);
}

// Función para mostrar eventos
export function mostrarEventos(eventos) {
    let contenedor = document.getElementById('contenedor-card');
    contenedor.innerHTML = '';

    for (let i = 0; i < eventos.length; i++) {
        let evento = eventos[i];
        let tarjeta = document.createElement('div');
        tarjeta.className = 'card my-card col-md-4 mb-4';
        tarjeta.innerHTML = `
            <img src="${evento.image}" class="card-img-top" alt="${evento.name}" style="object-fit: cover;"/>
            <div class="card-body" style="background-color: #e3f2fd;">
                <h5 class="card-title">${evento.name}</h5>
                <p class="card-text">Description: ${evento.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <p>Price: $${evento.price}</p>
                    <a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    }

    if (eventos.length === 0) {
        contenedor.innerHTML = '<p>No hay eventos que coincidan con los criterios de búsqueda.</p>';
    }
}


