import React, { useState,useEffect,useRef } from "react";
import './Weather.css'

import Icons from "./Icons";
import Location from "./Location";
import humiditypng from "../Assets/humidity.png"
import windpng from "../Assets/wind.png"
import visiblitypng from "../Assets/visibility.png"
import pressurepng from "../Assets/pressure.png"

export default function Weather() {
  
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const apiKey=process.env.REACT_APP_API_KEY;
  
 const inputRef=useRef(null);
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      async(position)=>{
        const { latitude, longitude } = position.coords;
        const cityName = await getCityName(latitude, longitude);
        setCity(cityName);
        
      },
      (error) => console.error("Error getting Location ", error),
      { enableHighAccuracy: true }
    );
  },[]);


  useEffect(() => {
    // Fetch weather data when city is set
    if (city) {
      search();
    }
  },[city]); 

  const getCityName=async(latitude,longitude)=>{
    try{
    const cordurl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    const cordres=await fetch(cordurl);
    const corddata=await cordres.json();
    
    return corddata.name;
    }

    catch(error){
      console.error("Error fetching city name",error);
      return "";
    }
    
  }
  const search= async()=>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data= await response.json();
    setWeather(data);
  }
  
  const searchHandle=async()=>{
    let submittedValue=await inputRef.current.value;
   
    setCity(submittedValue);
    search();
  }
  
  
  const handleKeyPress=(event)=>{
    if(event.key ==="Enter"){
      searchHandle();
     
    }

  };
  
 
  return (
    <>
      <div className="container">
         <div className="widget">
          <input className="searchbox" type="text" placeholder="Search" ref={inputRef} onKeyDown={handleKeyPress}/>
          <i className="fa fa-search" id="searchicon" onClick={searchHandle}></i>
          
          {weather&& weather.main &&(
          <>
          <div className="tempdiv">
           <Location location={weather.name}/>
            <div className="temp">
              <div className="tempcel">
              <p id="tempval">{weather.main.temp}<sup id="degcel">&deg;C</sup></p>
              <div className="minmaxtemp">{weather.main.temp_max}&deg;C / {weather.main.temp_min}&deg;C</div>
              </div>
              <Icons status={weather.weather[0].main}/>
            </div>
          </div>
          <div className="otherparam">
            <div className="param">
              <img src={visiblitypng} alt="" />
              <p>{weather.visibility/1000}&nbsp;Km <br /> Visiblity</p>
              <img src={pressurepng} alt="" style={{height:"40px"}} />
              <p>{weather.main.pressure}&nbsp;hPa<br /> Pressure</p>
            </div>
            <div className="param">
              <img src={humiditypng} alt="" />
              <p>{weather.main.humidity}&nbsp;%<br /> Humidity</p>
              <img src={windpng} alt="" />
              <p>{weather.wind.speed}&nbsp;Km/h <br />Wind Speed</p>
            </div>
          </div>
          </>
          )}
          
        </div>
       
      </div>
    </>
  );
}
