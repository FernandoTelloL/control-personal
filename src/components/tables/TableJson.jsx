import MUIDataTable from 'mui-datatables'
import userAsistencia from './../../data/busquedaUsuario.json'

// Filtrar solo las fechas de enero con controlType id: 1
const eneroId1Dates = userAsistencia.taskControlList.filter(item => {
  const month = item.controlDate.split('-')[1];
  return month === '01' && item.controlType.id === 1;
});

console.log(eneroId1Dates);

// Filtrar las fechas que tienen controlType id: 1
// const filteredData = eneroId1Dates.map(item => ({
//   id: item.id,
//   controlDate: item.controlDate,
// }));


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



const options = {
  filter: false, // Puedes ajustar según tus necesidades
  selectableRows: 'none', // Opciones de selección
  responsive: 'standard', // Añade la opción responsive
};

export const TableJson = () => {
  return (
    <div className="custom-datatable">

      <MUIDataTable
        title={ 'Asistencia de Mes Enero' }
        data={ data }
        columns={ columns }
        options={ options }
      />

    </div>
  );
}