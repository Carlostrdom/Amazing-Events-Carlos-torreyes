// eventsModule.js

export function mostrarDetalles(eventos, id) {
    let contenedor = document.getElementById('container-detail');
    contenedor.innerHTML = '';

    for (let i = 0; i < eventos.length; i++) {
        if (id == eventos[i]._id) {
            let tarjeta = document.createElement('div');
            tarjeta.innerHTML = `         
             <div class="container-fluid d-flex justify-content-center">
    <div class="card m-4" style="width: 800px;">
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
                <div class="card-body bg-success-subtle">
                    <h5 class="card-title fs-3 mb-3">${eventos[i].name}</h5>
                    <p><strong>Name:</strong> ${eventos[i].name}</p>
                    <p><strong>Category:</strong> ${eventos[i].category}</p>
                    <p><strong>Date:</strong> ${eventos[i].date}</p>
                    <p><strong>Description:</strong> ${eventos[i].description}</p>
                    <p><strong>Place:</strong> ${eventos[i].place}</p>
                    <p><strong>Price:</strong> $${eventos[i].price}</p>
                    <p><strong>Capacity:</strong> ${eventos[i].capacity}</p>
                    <p><strong>Assistance:</strong> ${eventos[i].assistance}</p>
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
