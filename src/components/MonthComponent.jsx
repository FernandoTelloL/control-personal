/* eslint-disable react/prop-types */
// MonthComponent.js
import { useState, useEffect } from 'react';
import { WorkerInfo } from './WorkerInfo';


const MonthComponent = ({ attendanceData, controlTypes }) => {
  const [searchDNI, setSearchDNI] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(controlTypes[0].type);
  const [daysWorked, setDaysWorked] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  // Estado para el mes actual
  const [currentMonth, setCurrentMonth] = useState(1); // Enero
  // Estado para el tipo de control actual
  const [currentControlTypeId, setCurrentControlTypeId] = useState(null);
  console.log(currentControlTypeId)


  useEffect(() => {
    handleTabClick(currentControlTypeId);
  }, [currentMonth, currentControlTypeId]);



  // Funcion para obtener los dias trabajados con el tipo de control 1
  const controlDates = attendanceData.taskControlList
    .filter(task => task.controlType.id === 1)
    .map(task => {
      const [year, month, day] = task.controlDate.split('-');
      return new Date(year, month - 1, day).getDate();
    });


  // Funcion para obtener los meses trabajados con el tipo de control 1
  const controlMonths = attendanceData.taskControlList
    .filter(task => task.controlType.id === 1)
    .map(task => {
      const [year, month, day] = task.controlDate.split('-');
      return new Date(year, month - 1, day).getMonth() + 1;
    });



  // Función para obtener los años trabajados con el tipo de control 1
  const controlYears = attendanceData.taskControlList
    .filter(task => task.controlType.id === 1)
    .map(task => {
      const [year, month, day] = task.controlDate.split('-');
      return new Date(year, month - 1, day).getFullYear();
    });






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



  // const handleTabSelect = (type) => {
  //   setSelectedTab(type);
  // };

  // Función para manejar el cambio de mes
  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  // Funcion para que el TAB tenga la funcionalidad de buscar por tipo de control
  // Filtrar taskControlList por el tipo de control y el mes actual
  // Función para manejar el clic en una pestaña
  const handleTabClick = (controlTypeId) => {

    // Actualizar currentControlTypeId
    setCurrentControlTypeId(controlTypeId);

    // Filtrar taskControlList por el tipo de control y el mes actual
    const filteredTasks = attendanceData.taskControlList.filter((task) => {
      const taskMonth = parseInt(task.controlDate.split('-')[1]);
      console.log(taskMonth)
      return task.controlType.id === controlTypeId && taskMonth === currentMonth;
    });

    // Guardar los resultados en filteredData
    setFilteredData(filteredTasks);
  };



  //  funcion para obtener los dias trabajados con el tipo de control al seleccionar el mes y año 
  function handleTabSelect(type) {
    const filterData = attendanceData.taskControlList.filter(task => task.controlType.id === type.id);
    setFilteredData(filterData);
  }
  console.log(filteredData)

  // Funcion para expandir todos los meses y poder imprimir la asistencia de todos los meses 
  function expandAllMonthsAndPrint() {
    window.onafterprint = () => {
      accordions.forEach(accordion => {
        accordion.classList.remove('show');
        accordion.setAttribute('aria-expanded', 'false');
      });
    }

    // Aquí, reemplaza 'accordion' con la clase o el ID que estás usando para los acordeones
    const accordions = document.querySelectorAll('.accordion-collapse');
    console.log(accordions)

    accordions.forEach(accordion => {
      accordion.classList.add('show');
    });

    window.print();

    window.onafterprint = () => {
      accordions.forEach(accordion => {
        accordion.classList.remove('show');
        accordion.setAttribute('aria-expanded', 'false');
      });
    }
  }


  return (
    <div className="container mt-4">

      <div className="form-group row mb-5">
        <div className="col-sm-3">

          <input
            type="text"
            className="form-control"
            placeholder="Buscar por documento de identidad"
            value={ searchDNI }
            onChange={ handleSearchChange }
          />

        </div>
        <div className="col-sm-3">

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
        <div className="col-sm-3">
          {/* <button className="btn btn-outline-secondary" type="button" onClick={ handleSearchClick }> */ }
          <button className="btn btn-outline-secondary" type="button" onClick={ {} }>
            Buscar
          </button>
        </div>

        <button
          className="btn btn-primary col-sm-3 border border-0"
          style={ { background: '#AD0506' } }
          onClick={ expandAllMonthsAndPrint }
        >
          Imprimir
        </button>

      </div>

      <hr />

      {/* componente que contiene informacion del usuario */ }
      <WorkerInfo worker={ attendanceData } />

      <hr />

      <ul
        className="nav nav-tabs mb-3 tabs-types-control mt-5"
        style={ { position: 'sticky', paddingTop: '15px', top: '65px', zIndex: '100', backgroundColor: 'white' } }
      >
        { controlTypes.map((type, index) => (
          <li key={ type.id } className="nav-item tab-item-types-control">

            <button
              className={ `tab-link-types-control nav-link ${type.id === currentControlTypeId ? 'active' : ''} ${type.id === currentControlTypeId ? 'bg-tab-active' : ''}` }
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

        <div className="accordion-item pb-4">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(1) }
            >
              Enero
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                {
                  Array.from({ length: 31 }, (_, dayIndex) => (
                    <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                      <span className=''>{ dayIndex + 1 }</span>
                      <div className="attendance-info mt-2">
                        { filteredData.map((data) => {
                          const dayWorked = parseInt(data.controlDate.split('-')[2]);

                          if (dayWorked === dayIndex + 1) {
                            return (
                              <div
                                key={ dayWorked }
                                className="attendance-day border border-secondary"
                                style={ { backgroundColor: data.controlType ? data.controlType.color : 'defaultColor' } }
                                title="Asistencia confirmada"
                              />
                            );
                          }
                          return null;
                        }) }
                      </div>
                    </div>
                  )) }
                { console.log(attendanceData.taskControlList[0].controlType.color) }
              </div>
            </div>
          </div>
        </div>

        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingTwo">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(2) }
            >
              Febrero
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 28 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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

        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingThree">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(3) }
            >
              Marzo
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 31 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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

        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingFour">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFour"
              aria-expanded="false"
              aria-controls="flush-collapseFour"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(4) }
            >
              Abril
            </button>
          </h2>
          <div
            id="flush-collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFour"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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

        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingFive">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseFive"
              aria-expanded="false"
              aria-controls="flush-collapseFive"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(5) }
            >
              Mayo
            </button>
          </h2>
          <div
            id="flush-collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingFive"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 31 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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

        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingSix">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSix"
              aria-expanded="false"
              aria-controls="flush-collapseSix"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(6) }
            >
              Junio
            </button>
          </h2>
          <div
            id="flush-collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingSix"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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

        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingSeven">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseSeven"
              aria-expanded="false"
              aria-controls="flush-collapseSeven"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(7) }
            >
              Julio
            </button>
          </h2>
          <div
            id="flush-collapseSeven"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingSeven"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 31 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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


        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingEight">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseEight"
              aria-expanded="false"
              aria-controls="flush-collapseEight"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(8) }
            >
              Agosto
            </button>
          </h2>
          <div
            id="flush-collapseEight"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingEight"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 31 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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


        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingNine">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseNine"
              aria-expanded="false"
              aria-controls="flush-collapseNine"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(9) }
            >
              Septiembre
            </button>
          </h2>
          <div
            id="flush-collapseNine"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingNine"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>
                    <div className="attendance-info mt-2">

                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);


                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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


        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingTen">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTen"
              aria-expanded="false"
              aria-controls="flush-collapseTen"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(10) }
            >
              Octubre
            </button>
          </h2>
          <div
            id="flush-collapseTen"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTen"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 31 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>

                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);


                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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


        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingEleven">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseEleven"
              aria-expanded="false"
              aria-controls="flush-collapseEleven"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(11) }
            >
              Noviembre
            </button>
          </h2>
          <div
            id="flush-collapseEleven"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingEleven"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 30 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>

                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);


                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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


        <div className="accordion-item pb-4 pt-4">
          <h2 className="accordion-header" id="flush-headingTwelve">
            <button
              className="accordion-button collapsed fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwelve"
              aria-expanded="false"
              aria-controls="flush-collapseTwelve"
              style={ { borderRadius: '10px 10px 0 0' } }
              onClick={ () => handleMonthChange(12) }
            >
              Diciembre
            </button>
          </h2>
          <div
            id="flush-collapseTwelve"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingTwelve"
            data-bs-parent="#accordionFlushExample"
            style={ { backgroundColor: 'rgb(231,241,255)', borderRadius: '0px 0px 10px 10px' } }
          >
            <div className="accordion-body">
              <div className="row">
                { Array.from({ length: 31 }, (_, dayIndex) => (
                  <div key={ dayIndex } className="col p-2 d-flex flex-column align-items-center">
                    <span>{ dayIndex + 1 }</span>

                    <div className="attendance-info mt-2">
                      { filteredData.map((data) => {
                        const dayWorked = parseInt(data.controlDate.split('-')[2]);

                        if (dayWorked === dayIndex + 1) {
                          return (
                            <div
                              key={ dayWorked }
                              className="attendance-day border border-secondary"
                              style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
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

    </div >

  );
};

export default MonthComponent;
