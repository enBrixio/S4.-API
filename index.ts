type JokeReport = {
    joke: string;
    score: number | null;
    date: string;
};

interface apiResponse{
    url:string
} 

let reportJokes: JokeReport[] = [];
const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.flex-item');

const scores = {
    'reshot-icon-cold-JDUYMTRXSF.svg': 1,
    'reshot-icon-shifty-QVBDMJCAWN.svg': 2,
    'reshot-icon-tears-SHNXUVD2GZ.svg': 3
};

images.forEach((image: HTMLImageElement) => {
    image.addEventListener('click', (event: Event) => {
        const imageName: string = ((event.target as HTMLImageElement).src.split('/').pop() || '');
        const score = scores[imageName as keyof typeof scores];
        if (score !== undefined && reportJokes.length > 0) {
            console.log(`Has clicado en la imagen ${imageName} con una puntuación de ${score}`);
            // Actualiza el último JokeReport con la nueva puntuación utilizando spread para crear un nuevo arreglo
            reportJokes = [
                ...reportJokes.slice(0, -1),
                {
                    ...reportJokes[reportJokes.length - 1],
                    score: score
                }
            ];
            console.log(reportJokes);
        } else {
            console.log(`No se encontró una puntuación para la imagen ${imageName}`);
        }
    });
});

function addJokeToReport(joke: string) {
    // Añade un nuevo JokeReport utilizando spread para crear un nuevo arreglo
    reportJokes = [
        ...reportJokes,
        {
            joke: joke,
            score: null,
            date: new Date().toISOString().split('T')[0]
        }
    ];
}

document.addEventListener('DOMContentLoaded', () => {
    const jokeBtn = document.getElementById('btn')!;
    const jokeOutput = document.getElementById('joke')!;

    async function fetchJoke() {
        try {

            const responses: apiResponse[] = [
                {
                    url:`https://api.chucknorris.io/jokes/random`, 
                },
                {
                    url:"https://icanhazdadjoke.com/", 
                }
            ]
            const randomApi = responses[Math.floor(Math.random() * responses.length)];
            const responde = await fetch(randomApi.url, {
                headers: {
                    Accept: "application/json"
                }
            });
            const data = await responde.json();
            if (jokeOutput) {
                data.joke = data.value || data.joke;
                jokeOutput.textContent = data.joke;
                addJokeToReport(data.joke); 
                console.log(reportJokes);
            }
        } catch (error) {
            console.error("Error fetching joke:", error);
            jokeOutput.textContent = "Failed to fetch a joke. Please try again later.";
        }       
    }

    if (jokeOutput && jokeBtn) {
        jokeBtn.addEventListener('click', fetchJoke);
    }

    fetchJoke();
});

// Path: weather.ts
async function getWeather() {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    try {
        const response = await fetch('https://api.tomorrow.io/v4/weather/realtime?location=barcelona&apikey=8t6JxsW6QSE42qgjq8szgv5Rl6X0e8To', options);
        const dataWeather = await response.json();
        if(!response.ok) throw new Error("Not Found");
        const weather = dataWeather.data.values.weatherCode;
        const temperature = dataWeather.data.values.temperature;
        
        // Actualizar el DOM
        const weatherIcon = document.getElementById('weatherInfo') as HTMLImageElement;
        const temperatureSpan = document.getElementById('temp') as HTMLSpanElement;

        weatherIcon.src = `./img/color/${weather}.svg`; 
        temperatureSpan.textContent = `${temperature}°C`;
        temperatureSpan.style.padding  = '10px 10px';
        temperatureSpan.style.fontSize = '2rem';
        console.log(dataWeather);    
        console.log(weather);
        console.log(temperature);
        
    } catch (err) {
        console.error('Error fetching weather:', err);
    }
}

// Esta línea ya está correcta para asegurar que getWeather se ejecute después de que el contenido de la página haya cargado.
document.addEventListener('DOMContentLoaded', getWeather);

function obtenerNombreCiudad() {
    // Verificar si la Geolocalización está soportada
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        // Obtener las coordenadas
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
  
        // Construir URL para la API de geocodificación inversa de OpenStreetMap
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`;
  
        // Hacer una solicitud a la API
        fetch(url)
          .then(response => response.json())
          .then(data => {
            // Extraer el nombre de la ciudad del objeto de respuesta
            let ciudad = data.address.city || data.address.town || data.address.village;
            const geoLocalizacion = document.getElementById('localizacion') as HTMLSpanElement;
            geoLocalizacion.textContent = `${ciudad}`;
            console.log(`${ciudad}`);
          })
          .catch(error => console.log('Error al obtener la ubicación:', error));
      });
    } else {
      console.log("Geolocalización no está soportada en este navegador.");
    }
  }

  obtenerNombreCiudad();


















