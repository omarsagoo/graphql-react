import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './index'

function Weather() {
    const [ zip, setZip ] = useState('')
    const [ weather, setWeather ] = useState(null)

    async function getWeather() {
        try {
          const json = await client.query({
            query: gql`
              query {
                getWeather(zip:${zip}) {
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
            weather.data.getWeather.cod != 200 
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
            type={Number}
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default Weather