import MUIDataTable from 'mui-datatables'
import userAsistencia from './../../data/busquedaUsuario.json'

// Filtrar solo las fechas de enero con controlType id: 1
const eneroId1Dates = userAsistencia.taskControlList.filter(item => {
  const month = item.controlDate.split('-')[1];
  return month === '01' && item.controlType.id === 1;
});

console.log(eneroId1Dates);

// Filtrar las fechas que tienen controlType id: 1
const filteredData = eneroId1Dates.map(item => ({
  id: item.id,
  controlDate: item.controlDate,
}));


// Crear un array con los nombres de las columnas (días del 1 al 31)
const columns = Array.from({ length: 31 }, (_, index) => ({
  name: `Day${index + 1}`,
  label: `${index + 1}`,
  options: {
    customBodyRender: (value) => {
      return (
        <div style={ { maxWidth: '15px', margin: 'auto' } }>{/* Ajusta el ancho según tus necesidades */ }
          { value }
        </div>
      );
    },
  },
}));


// Crear un array con los datos para la única fila de la tabla
const dataRow = {
  id: 1,
  controlDate: 'Fecha', // Puedes cambiar esto según tus necesidades
};


// Marcar los días que aparecen en el filtrado
for (let i = 1; i <= 31; i++) {
  const formattedDay = i < 10 ? `0${i}` : `${i}`;
  const date = `2023-01-${formattedDay}`;
  dataRow[`Day${i}`] = eneroId1Dates.some(item => item.controlDate === date) ? 'X' : '';
}

const data = [dataRow];




// // Crea un array de objetos para cada día del mes
// const data = Array.from({ length: 31 }, (_, index) => {
//   const day = index + 1;
//   const formattedDay = day < 10 ? `0${day}` : `${day}`;
//   const date = `2023-01-${formattedDay}`;

//   // Comprueba si la fecha está en el array filtrado
//   const hasControl = eneroId1Dates.some(item => item.controlDate === date);

//   return { id: index + 1, controlDate: date, hasControl };
// });

const options = {
  filter: false, // Puedes ajustar según tus necesidades
  selectableRows: 'none', // Opciones de selección
  responsive: 'standard', // Añade la opción responsive
};

// const data = [
//   ['X', '', 'X', 'X'],
// ]

// const options = {
//   filterTpe: 'checkbox'
// }

export const TableJson = () => {
  return (
    <div className="custom-datatable">

      <MUIDataTable
        title={ 'Tabla de Datos' }
        data={ data }
        columns={ columns }
        options={ options }
      />

    </div>
  );
}