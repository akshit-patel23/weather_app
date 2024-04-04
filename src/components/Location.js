import React from 'react'
import './Weather.css'
export default function Location(props) {
  return (
    <div className='locdiv'>
         <p className='fa fa-map-marker'>&nbsp;{props.location}</p>
    </div>
  )
}
