import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [iscelcius, setIsCelcius] = useState(true)

  const success = (pos) => {
    const newCoords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(newCoords)
  }

  const changeUnitTemperature = () => setIsCelcius(!iscelcius)
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords) {
      const API_KEY = '14075d20a7bc155ef8726f0b6abd765f'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      axios.get(URL)
        .then(res => {
          const tempKelvin = res.data.main.temp
          const tempCelsius = (tempKelvin - 273.15).toFixed(1)
          const tempFahrenheit = ((tempCelsius * 9/5) + 32).toFixed(1)
          const newTemperature = {
            celsius: tempCelsius,
            fahrenheit: tempFahrenheit
          }
          setTemperature(newTemperature)
          setWeather(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [coords])



  return (
    <div className="App">
      {
        weather ? ( 
          <WeatherCard 
            weather={weather} 
            temperature={temperature}
            changeUnitTemperature={changeUnitTemperature}
            iscelcius={iscelcius}
          />
        ) : <div><img className='loadingImage' src="https://images.vexels.com/media/users/3/234492/isolated/lists/03325d6a72e4f878170e0076f08bab39-cloud-weather-sky.png" alt="" /><h1>Loading...</h1></div>
      }
    </div>
  )
}

export default App
