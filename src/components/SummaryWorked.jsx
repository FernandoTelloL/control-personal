/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { WorkerContext } from '../context/WorkerContext';
import { useState } from 'react';
import { useEffect } from 'react';

export const SummaryWorked = () => {


  // uso la informacion de WorkerContext
  const { worker } = useContext(WorkerContext)
  let userDni = 0

  // estado para guardar los tipos de control
  const [controlTypes, setControlTypes] = useState([]);

  useEffect(() => {
    const fetchControlTypes = async () => {
      try {
        const response = await fetch('https://run.mocky.io/v3/2416c7ea-439f-4818-ba2e-52bbb584e376');
        if (!response.ok) {
          throw new Error(`Error al cargar los tipos de control: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setControlTypes(data);
      } catch (error) {
        console.error('Error al cargar los tipos de control:', error);
      }
    };

    fetchControlTypes();
  }, []);



  const year = 2023; // Puedes ajustar el año según tus necesidades
  const controlTypeId = 1; // Puedes ajustar el controlTypeId según tus necesidades

  if (worker !== null) {
    userDni = worker.employee.dni;

    // Función para obtener la cantidad de días para un mes y tipo de control específicos
    const getDaysCountForMonthAndYear = (year, month, controlTypeId, userDni) => {
      return worker.taskControlList.filter(item => {
        const itemYear = new Date(item.controlDate).getFullYear();
        const itemMonth = parseInt(item.controlDate.split('-')[1], 10);

        return (
          itemYear === year &&
          itemMonth === month &&
          item.controlType.id === controlTypeId &&
          worker.employee.dni === userDni
        );
      }).length;
    };


    // Función para generar el resumen y tablas para un tipo de control específico
    const generateSummaryAndTable = (title, controlTypeId) => {
      const tableData = Array.from({ length: 12 }, (_, month) => {
        const monthName = new Date(2023, month, 1).toLocaleString('default', { month: 'long' });
        const daysCount = getDaysCountForMonthAndYear(year, month + 1, controlTypeId, userDni);
        return { monthName, daysCount, key: `${title}-${monthName}` };
      });

      const totalDays = tableData.reduce((acc, { daysCount }) => acc + daysCount, 0);


      return (
        <div key={ controlTypeId } className="mt-4">
          <h6 className="mb-3 fw-bold table-title">{ title }</h6>
          <div className="table-responsive">
            <table className="table table-bordered table-sm"> {/* Agregar la clase table-sm para reducir el tamaño de la tabla */ }
              <thead>
                <tr>
                  <th className="small">Mes</th>
                  { Array.from({ length: 12 }, (_, month) => (
                    <th key={ month + 1 } className="bg-light text-center small">
                      { new Date(2023, month, 1).toLocaleString('default', { month: 'short' }) }
                    </th>
                  )) }
                  <th className="bg-light text-center small">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="small">Días</td>
                  { Array.from({ length: 12 }, (_, month) => (
                    <td key={ month + 1 } className="text-center small">
                      { getDaysCountForMonthAndYear(year, month + 1, controlTypeId, userDni) }
                    </td>
                  )) }
                  <td className="bg-light text-center small">
                    { totalDays }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    };


    return (
      <>

        {/* Renderizar resumen y tablas para cada tipo de control */ }
        { controlTypes.map(({ id, description }) => (
          generateSummaryAndTable(description, id)
        )) }

      </>
    )

  }






}
