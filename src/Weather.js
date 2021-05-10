import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'

function Weather() {
    const [ zip, setZip] = useState('')
    const [ weather, setWeather ] = useState(null)
    const [unit, setUnit] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    async function getWeather() {
        try {
          const json = await client.query({
            query: gql`
              query {
                getWeather(zip:${zip}, units:${unit}, lat:${lat}, long:${long}) {
                  temperature
                  description
                  cod
                  message
                }
              }
            `
          })
          setWeather(json)
        } catch(err) {
          console.log(err.message)
        }
      }
  
    return (
      <div className="Weather">

        {weather 
            ? 
            weather.data.getWeather.cod !== 200 
                    ?
                    <h1>{weather.data.getWeather.message}</h1> 
                    :
                    <h1>{weather.data.getWeather.temperature}</h1> 
            : 
            <h1> Input a zip to get your weather</h1>}

        <form onSubmit={(e) => {
            e.preventDefault()
            getWeather()
        }}>
            <input 
            type="number"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            />
            <input
            type="radio"
            value="metric"
            onClick={(e) => setUnit(e.target.value)}
            /> Metric
            <input
            type="radio"
            value="imperial"
            onClick={(e) => setUnit(e.target.value)}
            /> Kelvin

            <input
            type="radio"
            onClick={(e) => {
                navigator.geolocation.getCurrentPosition(pos => {
                    setLat(String(pos.coords[0]))
                    setLong(String(pos.coords[1]))
                })
            }}
            /> use Coordinates
            
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default Weather