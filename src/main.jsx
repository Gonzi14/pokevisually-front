import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
const losCososEstos = ``
const Squirtle= { algo:"Squirtle", colorPokemon: '#a1d9ef', atrapadoInicial: false}
root.render(
  <>
  <strong>PokeGGStats</strong>
  <div className='card-container'>
    <div className='card'>
      <img src="../garchomp.gif"/>
      <div className='pokemones'>
        <App algo="Garchomp" colorPokemon={'#ea8b24'} atrapadoInicial={false} >7</App>
        {/* el 1, 4 y 7 son children */}
      </div>
    </div>
  </div>
  
  </>

  )

// {/* <React.StrictMode>
//     <App />
//   </React.StrictMode>, */}

