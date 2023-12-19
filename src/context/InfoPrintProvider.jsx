
/* eslint-disable react/prop-types */
// Este archivo trabaja de la mano con InfoPrintContext

import { useState } from "react"
import { InfoPrintContext } from "./InfoPrintContext"



export const InfoPrintProvider = ({ children }) => {

  const [meses, setMeses] = useState([])
  const [anio, setAnio] = useState(0)
  const [tipoControl, setTipoControl] = useState([])

  return (
    <InfoPrintContext.Provider value={ { meses, setMeses, anio, setAnio, tipoControl, setTipoControl } }>
      { children }
    </InfoPrintContext.Provider>
  )
}
