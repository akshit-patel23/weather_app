import React from 'react'
import './Weather.css'
import clear from '../Assets/clear.png'
import cloud from '../Assets/cloud.png'
import drizzle from '../Assets/drizzle.png'
import humidity from '../Assets/humidity.png'
import rain from '../Assets/rain.png'
import snow from '../Assets/snow.png'
import wind from '../Assets/wind.png'


export default function Icons(props) {
  let icon;
  switch (props.status) {
    case "Clear":
        icon=clear;
        break;
    case "Clouds":
        icon=cloud;
        break;
    case "Drizzle":
        icon=drizzle;
        break;
    case "Humidity":
        icon=humidity;
        break;
    case "Rain":
        icon=rain;
        break;
    case "Snow":
        icon=snow;
        break;
    case "Wind":
        icon=wind;
        break;
    default:
        icon=clear;
        break;
  }
 
  return (
    <div className="tempIcon">
        <img src={icon} alt="" />
    </div>
  )
}
