// componente donde se muestra la informacion el trabajador y tambien los tabs y asistencia dependiendo
// del mes

import { useContext } from "react";
import MonthComponent from "../components/MonthComponent"
// import controlTypes from '../data/tiposControl.json';
import { TiposControlContext } from "../context/TiposControlContext";

export const ConsultaPersonal = () => {

  // uso la informacion de TiposControlContext
  const { setTiposControl, tiposControl } = useContext(TiposControlContext)

  return (
    <MonthComponent controlTypes={ tiposControl } />

  )
}
