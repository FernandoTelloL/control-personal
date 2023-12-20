/* eslint-disable react/prop-types */
// Este archivo trabaja de la mano con WorkerContext

import { useState } from "react"
import { WorkerContext } from "./WorkerContext"


// Este es un high Order Component
export const WorkerProvider = ({ children }) => {

  const [worker, setWorker] = useState()

  return (
    <WorkerContext.Provider value={ { worker, setWorker } }>
      { children }
    </WorkerContext.Provider>
  )
}
