import './App.css'
import { useState } from 'react'

export function App ({children, algo, colorPokemon, atrapadoInicial}) {
  const [atrapado, setAtrapado] = useState(atrapadoInicial)
  const texto = atrapado ? 'Elegido' : 'Elegir'
  const nombreTotal = "00" + children + "." + algo

  return (
    // 
    <header>

      <div>
        
        <span> {nombreTotal}</span>
      </div>
      <aside>
        <button style = {{backgroundColor:colorPokemon}} onClick={() => {setAtrapado(!atrapado)}}>{texto}</button>
      </aside>
    </header>
  )
}
