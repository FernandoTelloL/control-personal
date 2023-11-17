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

  // Funcion para que el boton buscar tenga la funcionalidad de buscar por dni 
  const handleSearchClick = () => {

    ///////////////////////////////////
    // ACA TENGO QUE HACER EL LLAMADO DE LA INFORMACION COMPLETA DE MI TRABAJADOR
    ///////////////////////////////////

    // Filtrar taskControlList por el mes de enero
    // const januaryAttendance = attendanceData.taskControlList.filter(
    //   (data) => new Date(data.controlDate).getMonth() === 0 // 0 es enero en JavaScript
    // );

    // Guardar los resultados en filteredData
    // setFilteredData(januaryAttendance);
    // console.log(januaryAttendance)
  };

  // Funcion para que el input actualice el estado del dni
  const handleSearchChange = (e) => {
    const inputDNI = e.target.value.trim();
    setSearchDNI(inputDNI);
  };
  console.log(searchDNI)


  // const handleTabSelect = (type) => {
  //   setSelectedTab(type);
  // };

  // Funcion para que el TAB tenga la funcionalidad de buscar por tipo de control
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
          {/* <button className="btn btn-outline-secondary" type="button" onClick={ handleSearchClick }> */ }
          <button className="btn btn-outline-secondary" type="button" onClick={ {} }>
            Buscar
          </button>
        </div>
      </div>


      <ul className="nav nav-tabs mb-3 tabs-types-control">
        { controlTypes.map((type, index) => (
          <li key={ type.id } className="nav-item tab-item-types-control">

            <button
              className={ `tab-link-types-control nav-link ${type.description === selectedTab ? 'active' : ''
                }` }
              onClick={ () => handleTabClick(index + 1) }
            >
              { type.description.toUpperCase() }
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

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Enero
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
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
                              // style={ { backgroundColor: `${}` } }
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
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Febrero
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 28 }, (_, dayIndex) => (
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
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Marzo
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
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
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
            >
              Abril
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFour"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
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
          </div>




        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
            >
              Mayo
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFive"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
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
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingSix">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseSix"
            >
              Junio
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingSix"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
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
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingSeven">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSeven"
              aria-expanded="false"
              aria-controls="flush-collapseSeven"
            >
              Julio
            </button>
          </h2>
          <div
            id="flush-collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingSeven"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
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




          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingEight">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseEight"
              aria-expanded="false"
              aria-controls="flush-collapseEight"
            >
              Agosto
            </button>
          </h2>
          <div
            id="flush-collapseEight"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingEight"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
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
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingNine">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseNine"
              aria-expanded="false"
              aria-controls="flush-collapseNine"
            >
              Septiembre
            </button>
          </h2>
          <div

            id="flush-collapseNine"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingNine"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
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
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTen">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTen"
              aria-expanded="false"
              aria-controls="flush-collapseTen"
            >
              Octubre
            </button>
          </h2>
          <div
            id="flush-collapseTen"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTen"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
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
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingEleven">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseEleven"
              aria-expanded="false"
              aria-controls="flush-collapseEleven"
            >
              Noviembre
            </button>
          </h2>
          <div
            id="flush-collapseEleven"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingEleven"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
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
          </div>
        </div>


        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingTwelve">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwelve"
              aria-expanded="false"
              aria-controls="flush-collapseTwelve"
            >
              Diciembre
            </button>
          </h2>
          <div
            id="flush-collapseTwelve"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwelve"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
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
          </div>
        </div>





        {/* <div className="row">
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
                    </div> */}


      </div>

    </div>

  );
};

export default MonthComponent;
