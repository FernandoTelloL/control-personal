/* eslint-disable react/prop-types */
// MonthComponent.js
import React, { useState } from 'react';

const MonthComponent = ({ attendanceData, controlTypes }) => {
  const [searchDNI, setSearchDNI] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(controlTypes[0].type);
  const [daysWorked, setDaysWorked] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());


  console.log(attendanceData)

  // Funcion para obtener los dias trabajados con el tipo de control 1
  const controlDates = attendanceData.taskControlList
    .filter(task => task.controlType.id === 1)
    .map(task => {
      const [year, month, day] = task.controlDate.split('-');
      return new Date(year, month - 1, day).getDate();
    });

  console.log(controlDates);

  // Funcion para obtener los meses trabajados con el tipo de control 1
  const controlMonths = attendanceData.taskControlList
    .filter(task => task.controlType.id === 1)
    .map(task => {
      const [year, month, day] = task.controlDate.split('-');
      return new Date(year, month - 1, day).getMonth() + 1;
    });

  console.log(controlMonths);

  // Función para obtener los años trabajados con el tipo de control 1
  const controlYears = attendanceData.taskControlList
    .filter(task => task.controlType.id === 1)
    .map(task => {
      const [year, month, day] = task.controlDate.split('-');
      return new Date(year, month - 1, day).getFullYear();
    });

  console.log(controlYears);

  // Funcion para que el boton buscar tenga la funcionalidad de buscar por dni 
  const handleSearchClick = () => {
    // Asumiendo que attendanceData es el JSON que proporcionaste
    // const attendanceData = require('./busquedaUsuario.json');

    // Filtrar taskControlList por el mes de enero
    const januaryAttendance = attendanceData.taskControlList.filter(
      (data) => new Date(data.controlDate).getMonth() === 0 // 0 es enero en JavaScript
    );

    // Guardar los resultados en filteredData
    setFilteredData(januaryAttendance);
  };


  // funcion para obtener los dias trabajados con el tipo de control al ingresar el dni
  // const handleSearchChange = (e) => {
  //   const inputDNI = e.target.value.trim();
  //   setSearchDNI(inputDNI);

  //   if (inputDNI === '') {
  //     setFilteredData({});
  //     setDaysWorked(0);
  //   } else {
  //     const employeeData = Object.values(attendanceData).find(
  //       (data) => data.employee && data.employee.dni.toString() === inputDNI
  //     );
  //     console.log(employeeData)

  //     setFilteredData(employeeData ? { [inputDNI]: employeeData } : {});
  //     setDaysWorked(employeeData ? employeeData.taskControlList.length : 0);
  //   }
  // };

  // Funcion para que el input actualice el estado del dni
  const handleSearchChange = (e) => {
    const inputDNI = e.target.value.trim();
    setSearchDNI(inputDNI);
  };
  console.log(searchDNI)


  // const handleTabSelect = (type) => {
  //   setSelectedTab(type);
  // };

  const handleTabClick = (controlTypeId) => {
    // Filtrar taskControlList por el tipo de control
    const filteredTasks = attendanceData.taskControlList.filter(
      (task) => task.controlType.id === controlTypeId
    );

    // Guardar los resultados en filteredData
    setFilteredData(filteredTasks);
    console.log(filteredData)
  };



  //  funcion para obtener los dias trabajados con el tipo de control al seleccionar el mes y año 
  function handleTabSelect(type) {
    const filterData = attendanceData.taskControlList.filter(task => task.controlType.id === type.id);
    setFilteredData(filterData);
  }
  console.log(filteredData)

  return (
    <div className="container mt-4">

      <div className="form-group row mb-5">
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por documento de identidad"
            value={ searchDNI }
            onChange={ handleSearchChange }
          />
        </div>
        <div className="col-sm-4">
          <select
            className="form-control"
            value={ selectedYear }
            onChange={ e => setSelectedYear(e.target.value) }
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* Agrega más opciones según sea necesario */ }
          </select>
        </div>
        <div className="col-sm-4">
          <button className="btn btn-outline-secondary" type="button" onClick={ handleSearchClick }>
            Buscar
          </button>
        </div>
      </div>

      <ul className="nav nav-tabs mb-3 tabs-types-control">
        { controlTypes.map((type, index) => (
          <li key={ type.id } className="nav-item tab-item-types-control">
            <button
              className={ `tab-link-types-control nav-link ${type.type === selectedTab ? 'active' : ''
                }` }
              onClick={ () => handleTabClick(index + 1) }
            >
              { type.description }
            </button>
          </li>
        )) }
      </ul>
      {/* 
      
      
       */}
      {/* <div className="row">
        { Array.from({ length: 31 }, (_, dayIndex) => (
          <div key={ dayIndex } className="col p-2">
            <span>{ dayIndex + 1 }</span>
            <div className="attendance-info mt-2">
              { Object.keys(filteredData).map((dni) => {
                const worker = filteredData[dni];
                const controlType = controlTypes.find(
                  (type) => type.id === worker.employee.taskControlList[0].controlType.id
                );

                const colorClass =
                  controlType && controlType.type === selectedTab
                    ? `bg-${controlType.type}`
                    : '';

                return (
                  <div
                    key={ dni }
                    className={ `attendance-day ${colorClass}` }
                    title={ controlType ? controlType.description : '' }
                  />
                );
              }) }
            </div>
          </div>
        )) }
      </div> */}

      <div className="row">
        { Array.from({ length: 31 }, (_, dayIndex) => (
          <div key={ dayIndex } className="col p-2">
            <span>{ dayIndex + 1 }</span>
            <div className="attendance-info mt-2">
              { filteredData.map((data) => {
                const dayWorked = parseInt(data.controlDate.split('-')[2]);

                if (dayWorked === dayIndex + 1) {
                  return (
                    <div
                      key={ dayWorked }
                      className="attendance-day bg-green"
                      title="Asistencia confirmada"
                    />
                  );
                }
                return null;
              }) }
            </div>
          </div>
        )) }
      </div>


    </div>
  );
};

export default MonthComponent;
