/* eslint-disable react/prop-types */
// Este archivo trabaja de la mano con TiposControlContext

import { useState } from "react"
import { TiposControlContext } from './TiposControlContext';


// Este es un high Order Component
export const TiposControlProvider = ({ children }) => {

  const [tiposControl, setTiposControl] = useState([])


  return (
    <TiposControlContext.Provider value={ { tiposControl, setTiposControl } }>
      { children }
    </TiposControlContext.Provider>
  )
}
