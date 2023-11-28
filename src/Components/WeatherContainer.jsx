import React, { useEffect, useState } from 'react'
import { IconSearch } from '@tabler/icons-react';
import axios from 'axios';

const WeatherContainer = ({ weather,  setweather }) => {
    const [cityName, setCityName] = useState('');
    const [unit, setunit] = useState('metric');
    
    const toggleUnit = () => {
        console.log('Toggle Unit');
        setunit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    };

    useEffect(() => {
      if(cityName.trim() !== ''){
        console.log('Unit has changed, triggering search...');
        handleSearch();
      }
    }, [unit])
    
    

    const handleInputChange = (e) => {
        setCityName(e.target.value);
    };

    const handleSearch = async () => {
        console.log('Searching for city:', cityName);
        if (cityName.trim() !== '') {
            try {
                     
                
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=02a9d4eaae34cf2e680e1559c312edbd&lang=sp&units=metric`
                );
                console.log('Weather data fetched:', response.data);
                setweather(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                // Puedes manejar el error de manera adecuada, por ejemplo, mostrando un mensaje al usuario.
            
            }
        }
    };



    const convertTemperature = (temp) => {
        if (unit === 'imperial') {
          // Convertir a Fahrenheit si la unidad es imperial
          return ((temp * 9) / 5 + 32).toFixed(1) + '°F';
        } else {
          // De lo contrario, asumimos que la unidad es métrica y devolvemos Celsius
          return temp.toFixed(1) + '°C';
        }
    }

    return (
        <>
            
            <article className="text-center grid gap-4">
                
                {/* Section Search City*/}
                <div className='flex items-center justify-center top-1'>
                    <input 
                        type='text' 
                        placeholder='Enter city name'
                        className='border p-2 mr-2 rounded-md text-center text-black bg-white' 
                        value={cityName}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSearch}>
                        <IconSearch className='w-8 h-8'/>
                    </button>
                            
                </div>

                
                <h3 className='text-xl font-medium text-black'>{weather.name}, {weather.sys.country}</h3>

                <div className="grid gap-4 text-black">

                    {/* Section 1: Temperatura, descripcion y imagen*/}
                    <section className="bg-white/40 p-4 rounded-xl grid grid-cols-2 items-center ">

                        <h3 className="col-span-2">{weather.weather[0].description}</h3>
                        <span className="text-4xl">
                            {weather && convertTemperature(weather.main.temp)}
                        </span>

                        <div>
                            <img className="block mx-auto" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
                        </div>


                    </section>

                            

                    {/* Section 2: Detalles adicionales del clima*/}
                    <section className="grid grid-cols-3 justify-items-center bg-white/40 p-4 rounded-xl">
                                
                        <div className="flex gap-1 border-r">
                            <div>
                                <img src="/wind.svg" alt="icon-speed" />
                            </div>
                            <span>{weather.wind.speed}m/s</span>
                        </div>

                        <div className="flex gap-1 border-r">
                            <div>
                                <img src="/humidity.svg" alt="icon-porcent" />
                            </div>
                            <span>{weather.main.humidity}%</span>
                        </div>

                        <div className="flex gap-1">
                            <div>
                                <img src='/pressure.svg' alt='icon-pressure' />
                            </div>
                            <span>{weather.main.pressure}hPa</span>
                        </div>

                    </section>
                </div>


                <button className='p-2 mx-auto text-blue-500 bg-white rounded-xl 
                    text-md w-32 border-2 hover:bg-blue-500 hover:text-white' onClick={toggleUnit}>

                    Cambiar a {unit === 'metric' ? 'F°' : 'C°'}
                </button>

                   
  
            </article>

        </>
       
    )
}

export default WeatherContainer