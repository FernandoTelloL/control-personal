
/* eslint-disable react/prop-types */
// Este archivo trabaja de la mano con InfoPrintContext

import { useState } from "react"
import { InfoPrintContext } from "./InfoPrintContext"



export const InfoPrintProvider = ({ children }) => {

  // funcion para capturar el año actual en que nos encontramos
  const fechaActual = new Date();
  const yearActual = fechaActual.getFullYear();

  const [meses, setMeses] = useState([])
  const [anio, setAnio] = useState(yearActual)
  const [tipoControl, setTipoControl] = useState([])
  const [registrosFiltrados, setRegistrosFiltrados] = useState([])


  return (
    <InfoPrintContext.Provider value={ { meses, setMeses, anio, setAnio, tipoControl, setTipoControl, registrosFiltrados, setRegistrosFiltrados } }>
      { children }
    </InfoPrintContext.Provider>
  )
}
