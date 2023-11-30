import MUIDataTable from "mui-datatables"

const columns = ['Nombre', 'Empresa', 'Cuidad']
const data = [
  ['Joe1', 'Empresa1', 'Cuidad1'],
  ['Joe12', 'Empresa2', 'Cuidad2'],
  ['Joe13', 'Empresa3', 'Cuidad3'],
]
const options = {}

export const TableBasic = () => {
  return (
    <MUIDataTable
      title={ 'Lista de empleados' }
      data={ data }
      columns={ columns }
      options={ options }
    />
  )
}