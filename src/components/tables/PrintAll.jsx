import MUIDataTable from 'mui-datatables'
import userAsistencia from '../../data/busquedaUsuario.json'
import { WorkerInfo } from '../WorkerInfo';
import attendanceData from '../../data/busquedaUsuario.json';

const generateMonthTable = (year, month, controlTypeId, userDni) => {
  // Filtrar las fechas que tienen controlType id: controlTypeId para el año y mes dados
  const filteredDates = userAsistencia.taskControlList.filter(item => {
    const itemYear = parseInt(item.controlDate.split('-')[0], 10);
    const itemMonth = parseInt(item.controlDate.split('-')[1], 10);

    return (
      itemYear === year &&
      itemMonth === month &&
      item.controlType.id === controlTypeId &&
      userAsistencia.employee.dni === userDni
    );
  })

  // Crear un array con los nombres de las columnas (días del 1 al último día del mes)
  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const columns = Array.from({ length: lastDayOfMonth }, (_, index) => ({
    name: `Day${index + 1}`,
    label: `${index + 1}`,
    options: {
      customBodyRender: (value, tableMeta) => {
        const dayIndex = tableMeta.columnIndex + 1;
        const formattedDay = dayIndex < 10 ? `0${dayIndex}` : `${dayIndex}`;
        const date = `${year}-${month < 10 ? `0${month}` : month}-${formattedDay}`;
        const control = filteredDates.find(item => item.controlDate === date);

        // hago la comprobacion si tiene dia marcado se tiene que poner fondo y borde
        const backgroundColor = control ? control.controlType.color : 'transparent';
        const border = control ? '1px solid' : '1px';
        return (
          <div
            style={ {
              border,
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              backgroundColor,
              margin: '5px auto',
            } }
          />
        );
      },
    },
  }));

  // Crear un array con los datos para la única fila de la tabla
  const dataRow = {
    id: 1,
    controlDate: 'Fecha', // Puedes cambiar esto según tus necesidades
  };

  const data = [dataRow];

  const options = {
    filter: false, // Puedes ajustar según tus necesidades
    selectableRows: 'none', // Opciones de selección
    responsive: 'standard', // Añade la opción responsive
    print: false,
    search: false,
    download: false,
    viewColumns: false,
    rowsPerPageOptions: [],
    pagination: false,
  };

  // Array de nombres de meses
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Obtén el nombre del mes según el número del mes
  const monthName = monthNames[month - 1];

  // Estilo personalizado para el título
  const titleStyle = {
    fontSize: '15px',  // Puedes ajustar el tamaño del título según tus necesidades
  };

  return (
    <MUIDataTable
      className='mb-4 mt-4 pb-2'
      key={ `table-${year}-${month}-${controlTypeId}-${userDni}` }
      title={ <div style={ titleStyle }>{ `${monthName} ${year}` }</div> }
      data={ data }
      columns={ columns }
      options={ options }
    />
  );
};

export const PrintAll = () => {
  const year = 2023; // Puedes ajustar el año según tus necesidades
  const controlTypeId = 1; // Puedes ajustar el controlTypeId según tus necesidades
  const userDni = 72661345; // Puedes ajustar el dni del usuario según tus necesidades

  return (
    <>
      <WorkerInfo worker={ attendanceData } />
      <div className="custom-datatable">
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
      </div>

    </>
  );
};