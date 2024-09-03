import React, { useEffect, useState } from 'react'
import "./Weather.css"
const KEY ="e04ea5b3c6c1f0933226eef3ff8989ce"

import SearchIcon from './Assets/Search.png'
import SunIcon from './Assets/ClearSun.png'
import MoonIcon from './Assets/Moon.png'
import HumidityIcon from './Assets/Humidity.png'
import MoonCloudIcon from './Assets/moon-night.png'
import MoonRainIcon from './Assets/Rainy-moon.png'
import SunWithCloud from "./Assets/Cloud-sun.png"
import WindSpeed from './Assets/wind-speed.png'
import Sunrain from './Assets/sun-rain.png'
import Cloudy  from "./Assets/Cloudy.png"
import BrokenCloud from "./Assets/cloud-thunder.png"
import RainyCloud from './Assets/colud-rain.png'
import Thunder from './Assets/cloud-thunder.png'
import Snow from './Assets/snow.png'
import Mist from "./Assets/mist.png"




const WeatherDetails=({Icon ,temp, City ,Country, latitude, longitude, Humidity, Windspeed})=>{
return(
    <>
    <div className='image'>
        <img src={Icon} alt='Image'/>
    </div>

     <div className='Temperature'>{Math.floor(temp)}°C 
     </div>

     <div className='City'>{City} 
     </div>

     <div className='Contry'>{Country} 
     </div>

     <div className='Cordinates'> 
     <div className='latitude'> <span>Latitude</span> <span>{latitude}</span>
     </div>
     <div className='longitude'><span>Longitude</span> <span> {longitude}</span>
     </div>
     </div>

     <div className='Data-Container'>
        <div className='element'>
          <img src={HumidityIcon} alt='Humidity' className='Icon'/>
          <div className='Data'>
           <div className='Humidity-percentage'>{Humidity} %</div>
            <div className='Icon-text'> Humidity</div>
          </div>
        </div>
     

    
        <div className='element'>
          <img src={WindSpeed} alt='Wind-speed' className='Icon'/>
          <div className='Data'>
            <div className='Wind-speed'>{Windspeed} km/h</div>
            <div className='Icon-text'>Wind speed</div>
          </div>
        </div>
     </div>

    </>
)
}
function WeatherApp(props) {
    const [Icon, setIcon] = useState(SunIcon);
    const [temp, setTemp] = useState(0);
    const [City, setCity] = useState("Nagapattinam");
    const [Country, setCountry] = useState("");
    const [latitude,setLatitude ] = useState("0")
    const [longitude,setLongitude ] = useState("0")
    const [Humidity,sethumidity ] = useState("0")
    const [Windspeed,setwindspeed ] = useState("0")
    const [loading,setLoading] = useState(false)
    const [cityNotFound, setCityNotFound] = useState(false)
    const [error,setError] = useState(null)
      
    const FetchData = async() => {
      setLoading(true);

      let url =`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${KEY}&units=Metric`
      
      try{
          let res = await fetch(url);
          let data = await res.json();

          if(data.cod === "404"){
            console.error("city not found")
            setCityNotFound(true);
            setLoading(false)
            return;
        }



          setTemp(data.main.temp)
          setwindspeed(data.wind.speed)
          sethumidity(data.main.humidity)
          setLatitude(data.coord.lat)
          setLongitude((data.coord.lon))
          setCountry(data.sys.country)
          const WeatherIconCode = data.weather[0].icon 
          setIcon(WeatherIcon[WeatherIconCode] || SunWithCloud)}
          
          catch(error){
        console.error("An error occured",error.message);
        setLoading(false);
        setError("An error occured while fetching data. ");

      }
      finally{
        setLoading(false);
      } 
  }
const WeatherIcon={
  "01d":SunIcon,
  "01n":MoonIcon,
  "02d":SunWithCloud,
  "02n":MoonCloudIcon,
  "03d":Cloudy,
  "03n":Cloudy,
  "04d":BrokenCloud,
  "04n":BrokenCloud,
  "09d":RainyCloud ,
  "09n":RainyCloud ,
  "10d":Sunrain,
  "10n":MoonRainIcon,
  "11d":Thunder,
  "11n":Thunder,
  "13d":Snow,
  "13n":Snow,
  "50d":Mist,
  "50n":Mist,
}
const handlecity=(e)=>{
    setCity(e.target.value)  
}

const handleKeyDown = (e)=>{
  if (e.key == "Enter"){
    FetchData ();
  }
}

useEffect(function(){
  FetchData();
},[]);

  return (
    <>
      <div className='Container'>
      <div className='h1'>
        <h1>
            <span>Weather</span> App
        </h1>
      </div>
      <div className="Search-Bar">
      <input type='text' placeholder='Enter City Name' onKeyDown={handleKeyDown
      } onChange={handlecity} className='Input'></input>
      <img onClick={FetchData } src={SearchIcon}></img>
      </div>

   

    {loading && <div className='loading-msg'> Loading...</div>}
    {error && <div className='Error-msg'> {error}</div>}
    { cityNotFound && <div className='Citynotfound-msg'> City not found!!</div>}
    
    { !loading && !cityNotFound &&  <WeatherDetails Icon={Icon} temp={temp} City={City} Country={Country} latitude={latitude} longitude={longitude} Humidity={Humidity} Windspeed={Windspeed}/>}
    
    <div className='Copyright'>
      <p> Designetd by <span>PRAISOODAN</span></p>
    </div>
</div>
    </>
  )
}



export default WeatherApp

