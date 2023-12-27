import MUIDataTable from 'mui-datatables'
import { WorkerInfo } from '../WorkerInfo';
import { useContext } from 'react';
import { WorkerContext } from '../../context/WorkerContext';
import { useState } from 'react';
import { InfoPrintContext } from '../../context/InfoPrintContext';


export const PrintAll = () => {
  // uso la informacion de WorkerContext
  const { worker } = useContext(WorkerContext)

  // const year = 2023; // Puedes ajustar el año según tus necesidades
  // const controlTypeId = 1; // Puedes ajustar el controlTypeId según tus necesidades
  const userDni = worker.employee.dni; // Puedes ajustar el dni del usuario según tus necesidades

  // Estado para almacenar los datos filtrados
  const { registrosFiltrados } = useContext(InfoPrintContext)
  console.log(registrosFiltrados)

  // const [filteredData, setFilteredData] = useState([]);
  // // Funcion para generar las tablas dependiendo del año, mes tipo de control, y dni
  // const generateMonthTable = (year, month, controlTypeId, userDni) => {
  //   // Filtrar las fechas que tienen controlType id: controlTypeId para el año y mes dados
  //   const filteredDates = worker.taskControlList.filter(item => {
  //     const itemYear = parseInt(item.controlDate.split('-')[0], 10);
  //     const itemMonth = parseInt(item.controlDate.split('-')[1], 10);

  //     return (

  //       itemYear === year &&
  //       itemMonth === month &&
  //       item.controlType.id === controlTypeId &&
  //       worker.employee.dni === userDni
  //     );
  //   })

  //   // Crear un array con los nombres de las columnas (días del 1 al último día del mes)
  //   const lastDayOfMonth = new Date(year, month, 0).getDate();
  //   const columns = Array.from({ length: lastDayOfMonth }, (_, index) => ({
  //     name: `Day${index + 1}`,
  //     label: `${index + 1}`,
  //     options: {
  //       customBodyRender: (value, tableMeta) => {
  //         const dayIndex = tableMeta.columnIndex + 1;
  //         const formattedDay = dayIndex < 10 ? `0${dayIndex}` : `${dayIndex}`;
  //         const date = `${year}-${month < 10 ? `0${month}` : month}-${formattedDay}`;
  //         const control = filteredDates.find(item => item.controlDate === date);

  //         // hago la comprobacion si tiene dia marcado se tiene que poner fondo y borde
  //         const backgroundColor = control ? control.controlType.color : 'transparent';
  //         const border = control ? '1px solid' : '1px';
  //         return (
  //           <div
  //             style={ {
  //               border,
  //               width: '15px',
  //               height: '15px',
  //               borderRadius: '50%',
  //               backgroundColor,
  //               margin: '5px auto',
  //             } }
  //           />
  //         );
  //       },
  //     },
  //   }));


  //   // Crear un array con los datos para la única fila de la tabla
  //   const dataRow = {
  //     id: 1,
  //     controlDate: 'Fecha', // Puedes cambiar esto según tus necesidades
  //   };

  //   const data = [dataRow];

  //   const options = {
  //     filter: false,
  //     selectableRows: 'none',
  //     responsive: 'standard',
  //     print: false,
  //     search: false,
  //     download: false,
  //     viewColumns: false,
  //     rowsPerPageOptions: [],
  //     pagination: false,
  //   };


  //   // Array de nombres de meses
  //   const monthNames = [
  //     'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  //     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  //   ];


  //   // Obtén el nombre del mes según el número del mes
  //   const monthName = monthNames[month - 1];


  //   // Estilo personalizado para el título
  //   const titleStyle = {
  //     fontSize: '15px',  // Puedes ajustar el tamaño del título según tus necesidades
  //   };

  //   return (
  //     <MUIDataTable
  //       className='mb-4 mt-4 pb-2'
  //       key={ `table-${year}-${month}-${controlTypeId}-${userDni}` }
  //       title={ <div style={ titleStyle }>{ `${monthName} ${year}` }</div> }
  //       data={ data }
  //       columns={ columns }
  //       options={ options }
  //     />
  //   );
  // };


  // Función para obtener la cantidad de días para un mes y tipo de control específicos
  // const getDaysCountForMonth = (month, controlTypeId, userDni) => {
  //   return worker.taskControlList.filter(item => {
  //     const itemMonth = parseInt(item.controlDate.split('-')[1], 10);

  //     return (
  //       itemMonth === month &&
  //       item.controlType.id === controlTypeId &&
  //       worker.employee.dni === userDni
  //     );
  //   }).length;
  // };


  // // Función para generar el resumen y tablas para un tipo de control específico
  // const generateSummaryAndTable = (title, controlTypeId) => {
  //   let totalDays = 0;

  //   // Obtén el nombre del mes según el número del mes
  //   const monthNames = [
  //     'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  //     'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  //   ];
  //   // Renderizar resumen de días por mes
  //   console.log(`${title}:`);
  //   for (let month = 1; month <= 12; month++) {
  //     const monthName = monthNames[month - 1];
  //     const daysCount = getDaysCountForMonth(month, controlTypeId, userDni);
  //     totalDays += daysCount;
  //     console.log(`${monthName}: ${daysCount}`);
  //   }
  //   console.log(`Total ${title}: ${totalDays}`);
  //   console.log("----------------------");

  //   return (
  //     <></>
  //   )
  // }

  // // Función para manejar el clic en el botón Imprimir
  // const handlePrintClick = () => {
  //   // Obtener los datos filtrados
  //   const data = registrosFiltrados;
  //   // Actualizar el estado con los datos filtrados
  //   setFilteredData(data);
  // };

  // Agrupa las fechas por tipo de control
  const groupedData = {};
  registrosFiltrados.forEach((item) => {
    const controlType = item.controlType.description;
    if (!groupedData[controlType]) {
      groupedData[controlType] = [];
    }
    groupedData[controlType].push(item.controlDate);
  });

  return (
    <div className='container'>
      <h1 className='mt-4 text-center border'>INFORME SEGÚN TIPO DE CONTROL</h1>
      {/* datos personales del trabajador */ }
      <WorkerInfo worker={ worker } />

      {/* Renderizar información filtrada */ }
      <div className="filter-container" style={ { pageBreakBefore: 'always' } }>
        { Object.entries(groupedData).map(([controlType, dates], index) => (
          <div key={ index } className='filter-item'>
            <h3 className='filter-title'>{ controlType }</h3>
            { dates.map((date, subIndex) => (
              <p key={ subIndex }>Fecha: { date }</p>
            )) }
          </div>
        )) }
      </div>

      {/* Renderizar resumen y tablas para cada tipo de control */ }
      {/* { generateSummaryAndTable('ASISTENCIA', 1) }
      { generateSummaryAndTable('DESCANSO', 2) }
      { generateSummaryAndTable('DIAS LABORADOS', 3) }
      { generateSummaryAndTable('INASISTENCIAS', 4) }
      { generateSummaryAndTable('FERIADO LABORADO', 5) }
      { generateSummaryAndTable('FERIADO NO LABORADO', 6) } */}


      {/* Boton imprimir */ }
      <div className="row col-sm-2 d-flex m-auto btn-print-container">
        <button
          className="btn btn-primary border border-0 fs-7 mt-3 mt-sm-0 text-white"
          style={ { background: '#AD0506' } }
          onClick={ print }
        // onClick={ handlePrintClick }
        >
          Imprimir
        </button>
      </div>


      {/* lista de tablas con todos los tipos de control */ }
      {/* <div className="custom-datatable">
        <h1 className='mt-5'>ASISTENCIA</h1>
        { generateMonthTable(year, 1, controlTypeId, userDni) }
        { generateMonthTable(year, 2, controlTypeId, userDni) }
        { generateMonthTable(year, 3, controlTypeId, userDni) }
        { generateMonthTable(year, 4, controlTypeId, userDni) }
        { generateMonthTable(year, 5, controlTypeId, userDni) }
        { generateMonthTable(year, 6, controlTypeId, userDni) }
        { generateMonthTable(year, 7, controlTypeId, userDni) }
        { generateMonthTable(year, 8, controlTypeId, userDni) }
        { generateMonthTable(year, 9, controlTypeId, userDni) }
        { generateMonthTable(year, 10, controlTypeId, userDni) }
        { generateMonthTable(year, 11, controlTypeId, userDni) }
        { generateMonthTable(year, 12, controlTypeId, userDni) }



        <h1 className='mt-5'>DESCANSO</h1>
        { generateMonthTable(year, 1, 2, userDni) }
        { generateMonthTable(year, 3, 2, userDni) }
        { generateMonthTable(year, 2, 2, userDni) }
        { generateMonthTable(year, 4, 2, userDni) }
        { generateMonthTable(year, 5, 2, userDni) }
        { generateMonthTable(year, 6, 2, userDni) }
        { generateMonthTable(year, 7, 2, userDni) }
        { generateMonthTable(year, 8, 2, userDni) }
        { generateMonthTable(year, 9, 2, userDni) }
        { generateMonthTable(year, 10, 2, userDni) }
        { generateMonthTable(year, 11, 2, userDni) }
        { generateMonthTable(year, 12, 2, userDni) }



        <h1 className='mt-5'>DIAS LABORADOS</h1>
        { generateMonthTable(year, 1, 3, userDni) }
        { generateMonthTable(year, 3, 3, userDni) }
        { generateMonthTable(year, 2, 3, userDni) }
        { generateMonthTable(year, 4, 3, userDni) }
        { generateMonthTable(year, 5, 3, userDni) }
        { generateMonthTable(year, 6, 3, userDni) }
        { generateMonthTable(year, 7, 3, userDni) }
        { generateMonthTable(year, 8, 3, userDni) }
        { generateMonthTable(year, 9, 3, userDni) }
        { generateMonthTable(year, 10, 3, userDni) }
        { generateMonthTable(year, 11, 3, userDni) }
        { generateMonthTable(year, 12, 3, userDni) }



        <h1 className='mt-5'>INASISTENCIAS</h1>
        { generateMonthTable(year, 1, 4, userDni) }
        { generateMonthTable(year, 3, 4, userDni) }
        { generateMonthTable(year, 2, 4, userDni) }
        { generateMonthTable(year, 4, 4, userDni) }
        { generateMonthTable(year, 5, 4, userDni) }
        { generateMonthTable(year, 6, 4, userDni) }
        { generateMonthTable(year, 7, 4, userDni) }
        { generateMonthTable(year, 8, 4, userDni) }
        { generateMonthTable(year, 9, 4, userDni) }
        { generateMonthTable(year, 10, 4, userDni) }
        { generateMonthTable(year, 11, 4, userDni) }
        { generateMonthTable(year, 12, 4, userDni) }



        <h1 className='mt-5'>FERIADO LABORADO</h1>
        { generateMonthTable(year, 1, 5, userDni) }
        { generateMonthTable(year, 3, 5, userDni) }
        { generateMonthTable(year, 2, 5, userDni) }
        { generateMonthTable(year, 4, 5, userDni) }
        { generateMonthTable(year, 5, 5, userDni) }
        { generateMonthTable(year, 6, 5, userDni) }
        { generateMonthTable(year, 7, 5, userDni) }
        { generateMonthTable(year, 8, 5, userDni) }
        { generateMonthTable(year, 9, 5, userDni) }
        { generateMonthTable(year, 10, 5, userDni) }
        { generateMonthTable(year, 11, 5, userDni) }
        { generateMonthTable(year, 12, 5, userDni) }



        <h1 className='mt-5'>FERIADO NO LABORADO</h1>
        { generateMonthTable(year, 1, 6, userDni) }
        { generateMonthTable(year, 3, 6, userDni) }
        { generateMonthTable(year, 2, 6, userDni) }
        { generateMonthTable(year, 4, 6, userDni) }
        { generateMonthTable(year, 5, 6, userDni) }
        { generateMonthTable(year, 6, 6, userDni) }
        { generateMonthTable(year, 7, 6, userDni) }
        { generateMonthTable(year, 8, 6, userDni) }
        { generateMonthTable(year, 9, 6, userDni) }
        { generateMonthTable(year, 10, 6, userDni) }
        { generateMonthTable(year, 11, 6, userDni) }
        { generateMonthTable(year, 12, 6, userDni) }




      </div> */}



    </div>
  );
};