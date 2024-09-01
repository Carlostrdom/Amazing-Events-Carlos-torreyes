// Obtener los datos de la API
fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {
        let eventos = data.events;

        // Variables para almacenar los resultados inicializadas con objetos vacíos
        let eventoMayorAsistencia = {};
        let mayorPorcentajeAsistencia = 0;
        let eventoMenorAsistencia = {};
        let menorPorcentajeAsistencia = 100;
        let eventoMayorCapacidad = {};
        let mayorCapacidad = 0;

        // Calcular los eventos con mayor/menor porcentaje de asistencia y mayor capacidad
        for (let evento of eventos) {
            // Verificar si el evento tiene los atributos de asistencia y capacidad (solo eventos ocurridos)
            if (evento.assistance && evento.capacity) {
                let porcentaje = (evento.assistance / evento.capacity) * 100;
                if (porcentaje > mayorPorcentajeAsistencia) {
                    mayorPorcentajeAsistencia = porcentaje;
                    eventoMayorAsistencia = evento;
                }
                if (porcentaje < menorPorcentajeAsistencia) {
                    menorPorcentajeAsistencia = porcentaje;
                    eventoMenorAsistencia = evento;
                }
            }

            // Calcular evento con mayor capacidad (puede incluir eventos futuros)
            if (evento.capacity > mayorCapacidad) {
                mayorCapacidad = evento.capacity;
                eventoMayorCapacidad = evento;
            }
        }

        // Mostrar los resultados en la tabla, comprobando si los objetos tienen datos
        document.querySelector("table tbody tr:nth-child(2) td:nth-child(1)").textContent = eventoMayorAsistencia.name ? `${eventoMayorAsistencia.name} - ${mayorPorcentajeAsistencia.toFixed(2)}%` : '';
        document.querySelector("table tbody tr:nth-child(2) td:nth-child(2)").textContent = eventoMenorAsistencia.name ? `${eventoMenorAsistencia.name} - ${menorPorcentajeAsistencia.toFixed(2)}%` : '';
        document.querySelector("table tbody tr:nth-child(2) td:nth-child(3)").textContent = eventoMayorCapacidad.name ? `${eventoMayorCapacidad.name} - ${eventoMayorCapacidad.capacity}` : '';

    })
    .catch(error => console.error(error));
// Obtener los datos de la API EVENTOS FUTUROS
fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {
        // Filtro para los eventos futuros
        let currentDate = new Date(data.currentDate);
        let eventosFuturos = data.events.filter(evento => new Date(evento.date) > currentDate);

        // Agrupar eventos por categoría y calcular Revenues y Percentage of attendance
        let categoriasUnicas = [...new Set(eventosFuturos.map(evento => evento.category))];
        let resultadosPorCategoria = {};

        categoriasUnicas.forEach(categoria => {
            resultadosPorCategoria[categoria] = {
                totalRevenues: 0,
                totalCapacity: 0,
                totalEstimate: 0,
                eventsCount: 0
            };

            eventosFuturos.forEach(evento => {
                if (evento.category === categoria) {
                    let revenue = Number(evento.price) * Number(evento.estimate);
                    resultadosPorCategoria[categoria].totalRevenues += revenue;
                    resultadosPorCategoria[categoria].totalCapacity += Number(evento.capacity);
                    resultadosPorCategoria[categoria].totalEstimate += Number(evento.estimate);
                    resultadosPorCategoria[categoria].eventsCount += 1;
                }
            });
        });

        // Mostrar los resultados en la tabla de eventos futuros
        categoriasUnicas.forEach((categoria, index) => {
            let resultados = resultadosPorCategoria[categoria];
            let porcentajeAsistencia = (resultados.totalEstimate * 100) / resultados.totalCapacity;

            // Asegúrate de que no excedas el número de filas disponibles
            if (index < 6) {
                document.querySelector(`#upcoming-row-${index + 1} td:nth-child(1)`).textContent = categoria;
                document.querySelector(`#upcoming-row-${index + 1} td:nth-child(2)`).textContent = `$ ${resultados.totalRevenues.toFixed(2)}`;
                document.querySelector(`#upcoming-row-${index + 1} td:nth-child(3)`).textContent = `${porcentajeAsistencia.toFixed(2)}%`;
            }
        });
    })
    .catch(error => console.error('Error al obtener los datos de la API:', error));

// Obtener los datos de la API EVENTOS PASADOS
fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {
        // Filtrar eventos pasados
        let currentDate = new Date(data.currentDate);
        let eventosPasados = data.events.filter(evento => new Date(evento.date) <= currentDate);

        // Agrupar eventos pasados por categoría y calcular Revenues y Percentage of attendance
        let categoriasUnicasPasadas = [...new Set(eventosPasados.map(evento => evento.category))];
        let resultadosPorCategoriaPasadas = {};

        categoriasUnicasPasadas.forEach(categoria => {
            resultadosPorCategoriaPasadas[categoria] = {
                totalRevenues: 0,
                totalCapacity: 0,
                totalAssistance: 0,
                eventsCount: 0
            };

            eventosPasados.forEach(evento => {
                if (evento.category === categoria) {
                    let revenue = Number(evento.price) * Number(evento.assistance);
                    resultadosPorCategoriaPasadas[categoria].totalRevenues += revenue;
                    resultadosPorCategoriaPasadas[categoria].totalCapacity += Number(evento.capacity);
                    resultadosPorCategoriaPasadas[categoria].totalAssistance += Number(evento.assistance);
                    resultadosPorCategoriaPasadas[categoria].eventsCount += 1;
                }
            });
        });

        // Mostrar los resultados en la tabla de eventos pasados
        categoriasUnicasPasadas.forEach((categoria, index) => {
            let resultados = resultadosPorCategoriaPasadas[categoria];
            let porcentajeAsistencia = (resultados.totalAssistance * 100) / resultados.totalCapacity;

            // Asegúrate de que no excedas el número de filas disponibles
            if (index < 6) {
                document.querySelector(`#past-row-${index + 1} td:nth-child(1)`).textContent = categoria;
                document.querySelector(`#past-row-${index + 1} td:nth-child(2)`).textContent = `$ ${resultados.totalRevenues.toFixed(2)}`;
                document.querySelector(`#past-row-${index + 1} td:nth-child(3)`).textContent = `${porcentajeAsistencia.toFixed(2)}%`;
            }
        });
    })
    .catch(error => console.error('Error al obtener los datos de la API:', error));
