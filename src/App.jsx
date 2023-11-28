
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import WeatherContainer from './Components/WeatherContainer';

function App() {

  const [weather, setweather] = useState(null);
  

  const sucess = (pos) => {

    const {
      coords: {latitude, longitude},
    } = pos;
    
    
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=02a9d4eaae34cf2e680e1559c312edbd&lang=sp&units=metric`)
    .then(({ data }) => setweather(data))
    .catch((err) => console.log(err))
    

  };


  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(sucess);

  }, [])

  const bgImages = {
    "01d": "bg-[url(/public/img-d.jpg)]",
    "01n": "bg-[url(/public/img-nocheDespejada.jpg)]",
    "02d": "bg-[url(/public/img-pocasNubes.jpg)]",
    "02n": "bg-[url(/public/img-nochePocasNubes.jpg)]",
    "03d": "bg-[url(/public/img-diaNubesDispersas.jpg)]",
    "03n": "bg-[url(/public/img-noche-NubesDispersas.jpg)]",
    "04d": "bg-[url(/public/nubesCortadasDia.jpg)]",
    "04n": "bg-[url(/public/img-nuboso.jpg)]",
    "09d": "bg-[url(/public/img-Aguacero.jpg)]",
    "09n": "bg-[url(/public/img-lluvia.jpg)]",
    "10d": "bg-[url(/public/img-Aguacero.jpg)]",
    "10n": "bg-[url(/public/img-nocheAguacero.jpg)]",
    "11d": "bg-[url(/public/img-diaNubesDispersas.jpg)]",
    "11n": "bg-[url(/public/img-pocasNubes.jpg)]",
    "13d": "bg-[url(/public/img-pocasNubes.jpg)]",
    "13n": "bg-[url(/public/img-nieve.jpg)]",
    "50d": "bg-[url(/public/img-pocasNubes.jpg)]",
    "50n": "bg-[url(/public/niebla.jpg)]",
    // Imagen predeterminada si no coincide con ninguna condición
    "defaultIcon": "url(/public/img-pocasNubes.jpg)", 
  };
  
  const iconClass = weather?.weather[0]?.icon || "defaultIcon";
  const mainClasses = `flex justify-center items-center h-screen bg-black text-white bg-cover ${bgImages[iconClass]} bg-no-repeat bg-center`;
  
  return (
    <main className={mainClasses}>
      {weather ? <WeatherContainer weather={weather} setweather={setweather} /> : <span className="mi-span-atractivo">Cargando...</span>}
  </main>
  )
}

export default App
