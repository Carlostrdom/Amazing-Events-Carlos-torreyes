// eventsModule.js

export function mostrarDetalles(eventos, id) {
    let contenedor = document.getElementById('container-detail');
    contenedor.innerHTML = '';

    for (let i = 0; i < eventos.length; i++) {
        if (id == eventos[i]._id) {
            let tarjeta = document.createElement('div');
            tarjeta.innerHTML = `         
<div class="container-fluid d-flex justify-content-center">
    <div class="card my-card m-4" style="width: 800px;">
        <div class="row g-0">
            <div class="col-md-5">
                <img
                    src="${eventos[i].image}"
                    alt="${eventos[i].name}"
                    class="img-fluid"
                    style="height: 100%; object-fit: cover;"
                />
            </div>
            <div class="col-md-7 d-flex align-items-center">
                <div class="card-body ">
                    <h5 class="card-title fs-3 mb-3">${eventos[i].name}</h5>
                    ${eventos[i].name ? `<p><strong>Name:</strong> ${eventos[i].name}</p>` : 'Name: sin informacion'}
                    ${eventos[i].description ? `<p><strong>Description:</strong> ${eventos[i].description}</p>` : 'Description: sin informacion'}
                    ${eventos[i].category ? `<p><strong>Category:</strong> ${eventos[i].category}</p>` : 'Category: sin informacion'}
                    ${eventos[i].date ? `<p><strong>Date:</strong> ${eventos[i].date}</p>` : 'Date: sin informacion'}
                    ${eventos[i].place ? `<p><strong>Place:</strong> ${eventos[i].place}</p>` : 'Place: sin informacion'}
                    ${eventos[i].price ? `<p><strong>Price:</strong> $${eventos[i].price}</p>` : 'Price: sin informacion'}
                    ${eventos[i].capacity ? `<p><strong>Capacity:</strong> ${eventos[i].capacity}</p>` : 'Capacity: sin informacion'}
                    <p><strong>Asistencia:</strong> 
                        ${eventos[i].assistance ? eventos[i].assistance
                    : eventos[i].estimate ? `Estimación de asistencia ${eventos[i].estimate}`
                        : 'sin información'}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
`;
            contenedor.appendChild(tarjeta);
            break;
        }
    }
}


