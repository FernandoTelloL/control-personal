import MonthComponent from "../components/MonthComponent"
import attendanceData from '../data/busquedaUsuario.json';
import controlTypes from '../data/tiposControl.json';

export const ConsultaPersonal = () => {
  return (
    <MonthComponent attendanceData={ attendanceData } controlTypes={ controlTypes } />

  )
}
