/* eslint-disable react/prop-types */
// MonthComponent.js
import { useState, useEffect } from 'react';
import { WorkerInfo } from './WorkerInfo';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WorkerContext } from '../context/WorkerContext';
import { TiposControlContext } from '../context/TiposControlContext';
import { show_alerta } from '../helpers/functions';
import { SummaryWorked } from './SummaryWorked';
import { InfoPrintContext } from '../context/InfoPrintContext';



const MonthComponent = () => {
  const [searchDNI, setSearchDNI] = useState('');
  console.log(searchDNI)
  const [filteredData, setFilteredData] = useState([]);
  console.log(filteredData)
  let contadorDeDias = null;
  // Estado para el mes actual de los acordeones
  const [currentMonth, setCurrentMonth] = useState(1); // Enero
  // Estado para cambiar el mes en el combo del header
  const [currentComboMonth, setCurrentComboMonth] = useState(0)
  // Estado para el tipo de control actual
  const [currentControlTypeId, setCurrentControlTypeId] = useState(null);
  console.log(currentControlTypeId)
  // estado para seleccionar que meses se quiere imprimir
  const [mesImprimir, setMesImprimir] = useState([])
  console.log('mes a imprimir: ' + mesImprimir)

  // obtengo el estado del año del contexto infoPrintProvider
  const { anio, setAnio, registrosFiltrados, setRegistrosFiltrados } = useContext(InfoPrintContext)
  console.log(anio)

  // estado para modal de tipos de control
  const [showModal, setShowModal] = useState(false);

  // estado para modal de opciones de impresion
  const [showModalOpciones, setShowModalOpciones] = useState(false);

  // estado para modal de meses del año
  const [showModalMonths, setShowModalMonths] = useState(false);


  const [selectedControlTypes, setSelectedControlTypes] = useState([]);
  console.log(selectedControlTypes)


  // uso la informacion de WorkerContext
  const { worker, setWorker } = useContext(WorkerContext)
  console.log(worker)

  // uso la informacion de TiposControlContext
  const { setTiposControl, tiposControl } = useContext(TiposControlContext)

  // estado usado en funcion para imprimir
  const [datosControl, setDatosControl] = useState()


  // useEffect(() => {
  //   handleTabClick(currentControlTypeId);
  // }, [currentMonth, currentControlTypeId]);


  // useEffect para obtener los TIPOS de control del API al cargar la pagina
  useEffect(() => {

    const fetchData = async () => {

      try {
        // aqui la direccion del back con el ARRAY DE OBJETOS CON LOS TIPOS DE CONTROL
        const response = await fetch(`https://run.mocky.io/v3/2416c7ea-439f-4818-ba2e-52bbb584e376`);

        if (!response.ok) {
          throw new Error(`Error al cargar los datos: ${response.status} ${response.statusText}`);
        }

        const dataTypesControl = await response.json();


        setTiposControl(dataTypesControl)

      } catch (error) {
        console.error('Error al hacer el fetch:', error);
      }

    }

    fetchData()
  }, [setTiposControl])



  // Funcion para obtener los dias trabajados con el tipo de control 1
  const controlDatesSummary = (controlTypeId) => filteredData
    .filter(task => task.controlType.id === controlTypeId)
    .map(task => {
      const [year, month, day] = task.controlDate.split('-');
      return new Date(year, month - 1, day).getDate();
    });
  console.log('dias trabajadosss: ' + controlDatesSummary.length)


  // Funcion para obtener los meses trabajados con el tipo de control 1
  // const controlMonths = attendanceData.taskControlList
  //   .filter(task => task.controlType.id === 1)
  //   .map(task => {
  //     const [year, month, day] = task.controlDate.split('-');
  //     return new Date(year, month - 1, day).getMonth() + 1;
  //   });



  // Función para obtener los años trabajados con el tipo de control 1
  // const controlYears = attendanceData.taskControlList
  //   .filter(task => task.controlType.id === 1)
  //   .map(task => {
  //     const [year, month, day] = task.controlDate.split('-');
  //     return new Date(year, month - 1, day).getFullYear();
  //   });


  // evento para la eleccion de tipos de control


  // funcion que llama al hacer click en los checkbox del modal de los tipos de control para imprimir
  const handleCheckboxChangeType = (event) => {
    const value = event.target.value;
    if (selectedControlTypes.includes(value)) {
      setSelectedControlTypes(selectedControlTypes.filter(type => type !== value));
    } else {
      setSelectedControlTypes([...selectedControlTypes, value]);
    }
  };


  // funciones para mostrar u ocultar modal de tipos de control
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


  // funciones para mostrar u ocultar modal de opciones de impresion
  const handleModalOpcionesOpen = () => {
    setShowModalOpciones(true);
  };

  const handleModalOpcionesClose = () => {
    setShowModalOpciones(false);
  };



  // funciones para mostrar u ocultar modal de meses del año
  const handleModalMonthsOpen = () => {
    setShowModalMonths(true);
  };

  const handleModalMonthsClose = () => {
    setShowModalMonths(false);
  };


  // funcion para capitalizar la primera letra de un String
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }


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
    // Validar que solo contiene números y tiene una longitud máxima de 8
    if (/^\d*$/.test(inputDNI) && inputDNI.length <= 8) {
      setSearchDNI(inputDNI);
    }
  };


  // Funcion para ejecutar buscar informacion del trabajador
  const handleFindEmployee = async (e) => {
    e.preventDefault();
    // setAnio(null)
    setWorker(null)

    if (searchDNI === '') {
      setWorker(null)
      return
    }

    try {
      // aqui la direccion del back con el ARRAY DE OBJETOS DE EMPLEADOS
      const response = await fetch(`https://ciudadania-production.up.railway.app/api/task-control-employee-search?dni=${searchDNI}&year=${anio}`);

      if (response.ok == false) {
        show_alerta('Trabajador no encontrado', 'error')
        setWorker(null)
        setSearchDNI('')
        return
      }

      const dataSearchEmployee = await response.json();

      // Encuentra el empleado con el DNI buscado
      if (dataSearchEmployee) {
        const employeeWithInputDni = dataSearchEmployee;
        console.log('Empleado encontrado:', employeeWithInputDni);

        // Aquí puedes acceder a la lista de tareas del empleado
        const taskControlList = employeeWithInputDni.taskControlList;
        console.log('Lista de tareas:', taskControlList);

        setWorker(employeeWithInputDni)

        // limpio el input dni
        setSearchDNI('')
      } else {
        setWorker(null)
        return
      }

      // Asigna la información encontrada en el back del empleado a la variable setDataEmployee
      // setDataEmployee(employeeWithInputDni);

    } catch (error) {
      error
    }
  };



  // const handleTabSelect = (type) => {
  //   setSelectedTab(type);
  // };

  // Función para manejar el cambio de mes en tab
  const handleMonthChange = (month) => {
    contadorDeDias = 0
    setCurrentMonth(month);
  };


  // Función para manejar el cambio de mes en tab
  // const handleComboMonthChange = (month) => {
  //   setCurrentComboMonth(month);
  // };


  // Funcion para que el TAB tenga la funcionalidad de buscar por tipo de control
  // Filtrar taskControlList por el tipo de control y el mes actual
  // Función para manejar el clic en una pestaña
  const handleTabClick = (controlTypeId) => {

    // Actualizar currentControlTypeId
    setCurrentControlTypeId(controlTypeId);

    // Filtrar taskControlList por el tipo de control y el mes actual
    // const filteredTasks = attendanceData.taskControlList.filter((task) => {
    const filteredTasks = worker.taskControlList.filter((task) => {
      // const taskMonth = parseInt(task.controlDate.split('-')[1]);
      // return task.controlType.id === controlTypeId && taskMonth === currentMonth;
      return task.controlType.id === controlTypeId;
    });
    console.log(filteredTasks)


    // Guardar los resultados en filteredData
    // { worker ? setFilteredData(filteredTasks) : setFilteredData([]) }
    setFilteredData(filteredTasks)
  };


  // funcion para manejar el checked de los meses para seleccionar que imprimir
  const handleCheckboxChangeMonth = (event) => {
    const mesSeleccionado = parseInt(event.target.value, 10);
    const isChecked = event.target.checked;

    if (mesSeleccionado === -1) {
      // Manejar el caso de "Todos los meses"
      if (isChecked) {
        // Si se marca "Todos los meses", agregar todos los meses al array
        setMesImprimir([...Array(12).keys()].map((mes) => mes + 1));
      } else {
        // Si se desmarca "Todos los meses", vaciar el array
        setMesImprimir([]);
      }
    } else {
      // Manejar otros meses individualmente
      if (isChecked) {
        // Si se marca un mes específico, agregarlo al array
        setMesImprimir([...mesImprimir, mesSeleccionado]);
      } else {
        // Si se desmarca un mes específico, quitarlo del array
        setMesImprimir(mesImprimir.filter((mes) => mes !== mesSeleccionado));
      }
    }
  }


  // Funcion para imprimir despuesd de seleccionar segun los checkbox de mes y tipos de control
  const handleImprimir = () => {
    handleModalOpcionesClose()
    // Filtrar los registros de control
    const registrosFiltrados = worker.taskControlList.filter((registro) => {
      // Verificar si el mes está seleccionado
      const mesSeleccionado = mesImprimir.includes(Number(registro.controlDate.substring(5, 7)));
      console.log(mesSeleccionado)
      // Verificar si el tipo de control está seleccionado
      const tipoControlSeleccionado = selectedControlTypes.includes((registro.controlType.id).toString());
      console.log(tipoControlSeleccionado)
      // Devolver true si ambos criterios se cumplen
      return mesSeleccionado && tipoControlSeleccionado;
    });
    console.log(registrosFiltrados);
    registrosFiltrados.forEach((registro) => {
      console.log(`Fecha: ${registro.controlDate}, Tipo de Control: ${registro.controlType.description}`);
      // Agrega más información según tus necesidades
    });

    setRegistrosFiltrados(registrosFiltrados)
  }
  console.log(registrosFiltrados)

  return (
    <div className="container mt-4">

      {/* header con filtros de busqueda */ }
      <div className="form-group row mb-5 mt-5">


        {/* input buscar por DNI */ }
        <div className="col-sm-3 d-flex justify-content-between align-items-center">

          <input
            type="text"
            className="form-control fs-7 me-sm-1"
            placeholder="Buscar por DNI"
            value={ searchDNI }
            onChange={ handleSearchChange }// Asegura que solo se ingresen números
            maxLength="8"
          />

        </div>

        {/* combo año */ }
        <div className="col-sm-3 d-flex align-items-center mt-3 mt-sm-0">
          <label htmlFor="selectMonth" className="form-label fs-7 me-2">Año:</label>
          <select
            className="form-control fs-7 w-100"
            value={ anio }
            onChange={ e => setAnio(e.target.value) }
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2027</option>
          </select>



        </div>

        <div className="col-sm-3 d-flex align-items-center mt-3 mt-sm-0">
          {/* boton buscar */ }
          <button
            disabled={ searchDNI === '' }
            className="btn btn-outline-secondary w-100 text-white border border-0 fs-7"
            type="button"
            style={ { background: '#AD0506' } }
            onClick={ handleFindEmployee }
          >

            Buscar

          </button>
        </div>


        {/* boton opciones de impresion */ }
        <div className="col-sm-3 d-flex align-items-center mt-3 mt-sm-0">
          <button
            type="button"
            disabled={ worker === null }
            className="btn btn-warning fs-7 border-3 w-100"
            onClick={ handleModalOpcionesOpen }
          >

            Imprimir

          </button>
          {/* Modal para seleccionar opciones de IMPRESION */ }
          <div className={ `modal fade ${showModalOpciones ? 'show' : ''}` } tabIndex="-1" role="dialog" style={ { display: showModalOpciones ? 'block' : 'none' } }>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Opciones impresión</h5>
                  <button type="button" className="btn-close" onClick={ handleModalOpcionesClose } aria-label="Close"></button>
                </div>

                <div className="modal-body">
                  <div className="col-sm-12 d-flex align-items-center mt-3 mt-sm-0">
                    <button
                      type="button"
                      className="btn btn-warning fs-7 border-3 w-100"
                      onClick={ handleModalMonthsOpen }
                    >

                      Meses

                    </button>

                    {/* Modal para seleccionar meses */ }
                    <div className={ `modal fade ${showModalMonths ? 'show' : ''}` } tabIndex="-1" role="dialog" style={ { display: showModalMonths ? 'block' : 'none' } }>
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Seleccionar Meses</h5>
                            <button type="button" className="btn-close" onClick={ handleModalMonthsClose } aria-label="Close"></button>
                          </div>
                          <div className="modal-body">

                            {/* Lista de meses con checkboxes */ }
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxTodos"
                                value="-1"
                                onChange={ handleCheckboxChangeMonth }
                              />
                              <label className="form-check-label" htmlFor="checkboxTodos">
                                Todos los meses del año
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxEnero"
                                value="1"
                                onChange={ handleCheckboxChangeMonth }
                              />
                              <label className="form-check-label" htmlFor="checkboxEnero">
                                Enero
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxFebrero"
                                value="2"
                                onChange={ handleCheckboxChangeMonth }
                              />
                              <label className="form-check-label" htmlFor="checkboxFebrero">
                                Febrero
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxMarzo" value="3" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxMarzo">
                                Marzo
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxAbril" value="4" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxAbril">
                                Abril
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxMayo" value="5" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxMayo">
                                Mayo
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxJunio" value="6" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxJunio">
                                Junio
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxJulio" value="7" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxJulio">
                                Julio
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxAgosto" value="8" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxAgosto">
                                Agosto
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxSetiembre" value="9" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxSetiembre">
                                Setiembre
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxOctubre" value="10" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxOctubre">
                                Octubre
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxNoviembre" value="11" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxNoviembre">
                                Noviembre
                              </label>
                            </div>


                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="checkboxDiciembre" value="12" onChange={ handleCheckboxChangeMonth } />
                              <label className="form-check-label" htmlFor="checkboxDiciembre">
                                Diciembre
                              </label>
                            </div>


                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={ handleModalMonthsClose }>
                              Aplicar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* // ... (tu código posterior) */ }



                  {/* combo tipo de control */ }
                  <div className="col-sm-12 d-flex align-items-center mt-3">
                    <button type="button" className="btn btn-warning fs-7 border-3 w-100" onClick={ handleModalOpen }>

                      Tipo de control

                    </button>
                  </div>

                  <div className={ `modal fade ${showModal ? 'show' : ''} z-index-1` } tabIndex="-1" role="dialog" style={ { display: showModal ? 'block' : 'none' } }>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Seleccionar Tipos de Control</h5>
                          <button type="button" className="btn-close" onClick={ handleModalClose } aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          { tiposControl.map((tipo) => (
                            <div key={ tipo.id } className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={ `checkbox_${tipo.id}` }
                                value={ tipo.id }
                                checked={ selectedControlTypes.includes(tipo.id.toString()) }
                                onChange={ handleCheckboxChangeType }
                              />
                              <label className="form-check-label" htmlFor={ `checkbox_${tipo.id}` }>
                                { capitalizeFirstLetter(tipo.description) }
                              </label>
                            </div>
                          )) }
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-primary" onClick={ handleModalClose }>
                            Aplicar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="modal-footer">

                  {/* Boton imprimir */ }
                  <Link to={ `` } className='col-sm-2'>
                    <button
                      className="btn btn-danger border border-0 fs-7 mt-3"
                      onClick={ handleModalOpcionesClose }
                    >

                      Cancelar

                    </button>
                  </Link>

                  {/* Boton imprimir */ }
                  <Link to={ worker ? `printall` : `` } className='col-sm-2'>
                    {/* <Link to={ worker ? `` : `` } className='col-sm-2'> */ }
                    <button
                      className="btn btn-primary border border-0 fs-7 mt-3 text-white mx-lg-2"
                      // onClick={ handleModalOpcionesClose handleImprimir }
                      onClick={ handleImprimir }
                    >

                      Imprimirr

                    </button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


      <hr />

      {/* condicional  que muestra la informacion del usuario despues de que se hace click en buscar y se 
      tiene informacion de un usuario*/}

      {
        (worker !== null && worker?.taskControlList.length > 0) ?
          (<>
            {/* componente que contiene informacion del usuario */ }
            {/* < WorkerInfo worker={ attendanceData } /> */ }

            < WorkerInfo />



            {/* <SummaryWorked /> */ }


            {/* tabs con los tipos de control */ }
            <ul
              className="nav nav-tabs mb-3 tabs-types-control mt-5 "
              style={ { position: 'sticky', paddingTop: '15px', top: '65px', zIndex: '100', backgroundColor: 'white' } }
            >

              {
                tiposControl.map((type, index) => (
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


            {/* Acordeones con los meses del año  */ }
            <div className="accordion accordion-flush" id="accordionFlushExample">

              {/* inicio acordeon ENERO */ }

              {
                Array.from({ length: 31 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 1) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }

              { (contadorDeDias !== null) ? (

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
                                  const monthWorked = parseInt(data.controlDate.split('-')[1])

                                  if (monthWorked == 1) {
                                    if (dayWorked === dayIndex + 1) {
                                      {
                                        contadorDeDias = dayWorked
                                      }
                                      return (
                                        <div
                                          key={ dayWorked }
                                          className="attendance-day border border-secondary"
                                          style={ { backgroundColor: data.controlType ? data.controlType.color : 'defaultColor' } }
                                          title="Asistencia confirmada"
                                        />
                                      );
                                    }
                                  }
                                  return null;
                                }) }

                              </div>
                            </div>
                          ))

                        }
                        <p>Suma total de días: { contadorDeDias }</p>
                        { contadorDeDias = null }

                      </div>
                    </div>
                  </div>
                </div>
              ) :
                (null)
              }

              {/* fin acordeon ENERO */ }



              {/* Inicio acordeon FEBRERO */ }
              {
                Array.from({ length: 28 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 2) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }

              { (contadorDeDias !== null) ? (

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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 2) {
                                  if (dayWorked === dayIndex + 1) {
                                    console.log('dia trabajado: ' + dayWorked)
                                    return (
                                      <div
                                        key={ dayWorked }
                                        className="attendance-day border border-secondary"
                                        style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
                                        title="Asistencia confirmada"
                                      />
                                    );
                                  }
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
              ) :
                (null)
              }
              {/* fin acordeon FEBRERO */ }


              {/* Inicio acordeon MARZO */ }
              {
                Array.from({ length: 31 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 3) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }
              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 3) {
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

              ) :
                (null)
              }

              {/* Fin acordeon MARZO */ }


              {/* Inicio acordeon ABRIL */ }
              {
                Array.from({ length: 30 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 4) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }
              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 4) {
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
              ) :
                (null)
              }
              {/* Fin acordeon ABRIL */ }


              {/* Inicio acordeon Mayo */ }
              {
                Array.from({ length: 31 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 5) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }

              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 5) {
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
              ) :
                (null)
              }
              {/* fIN acordeon Mayo */ }


              {/* Inicio acordeon Junio */ }
              {
                Array.from({ length: 30 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 6) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }

              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 6) {
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
              ) :
                (null)
              }

              {/* Fin acordeon Junio */ }


              {/* Inicio acordeon Julio */ }
              {
                Array.from({ length: 31 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 7) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }

              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 7) {
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
              ) :
                (null)
              }
              {/* Fin acordeon Julio */ }


              {/* Inicio acordeon Agosto */ }
              {
                Array.from({ length: 31 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 8) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })


                ))
              }

              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 8) {
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
              ) :
                (null)
              }
              {/* Fin acordeon Agosto */ }



              {/* Inicio acordeon Setiembre */ }
              {
                Array.from({ length: 30 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 9) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })
                ))
              }

              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 9) {
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
              ) :
                (null)
              }


              {/* Fin acordeon Setiembre */ }


              {/* Inicio acoardeon Octubre */ }
              {
                Array.from({ length: 31 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 10) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })
                ))
              }

              { (contadorDeDias !== null) ? (
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 10) {
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
              ) :
                (null)
              }
              {/* Fin acoardeon Octubre */ }


              {/* Inicio acordeon Noviembre */ }
              {
                Array.from({ length: 30 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 11) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })
                ))
              }

              { (contadorDeDias !== null) ? (
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
                              {

                                filteredData.map((data) => {
                                  const dayWorked = parseInt(data.controlDate.split('-')[2]);
                                  const monthWorked = parseInt(data.controlDate.split('-')[1])


                                  if (monthWorked == 11) {
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
              ) :
                (null)
              }
              {/* FIN acordeon Noviembre */ }


              {/* Inicio acordeon Diciembre */ }
              {
                Array.from({ length: 31 }, (_, dayIndex) => (


                  filteredData.map((data) => {
                    const dayWorked = parseInt(data.controlDate.split('-')[2]);
                    const monthWorked = parseInt(data.controlDate.split('-')[1])

                    if (monthWorked == 12) {
                      if (dayWorked === dayIndex + 1) {
                        {
                          contadorDeDias = dayWorked
                        }

                      }
                    }
                  })
                ))
              }

              { (contadorDeDias !== null) ? (
                <div className="accordion-item pb-4">
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
                              {
                                filteredData.map((data) => {
                                  const dayWorked = parseInt(data.controlDate.split('-')[2]);
                                  const monthWorked = parseInt(data.controlDate.split('-')[1])


                                  if (monthWorked == 12) {
                                    if (dayWorked === dayIndex + 1) {
                                      { contadorDeDias = dayWorked }
                                      return (
                                        <>

                                          <div
                                            key={ dayWorked }
                                            className="attendance-day border border-secondary"
                                            style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
                                            title="Asistencia confirmada"

                                          />
                                        </>
                                      );
                                    }
                                  }
                                  return null;

                                })
                              }
                            </div>
                          </div>
                        )) }
                      </div>
                      <p>Suma total de días: { contadorDeDias }</p>
                      { contadorDeDias = null }
                    </div>
                  </div>
                </div>
              ) :
                (null)
              }
              {/* Fin acordeon Diciembre */ }



              {/* ACORDEON ENERO
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
                                const monthWorked = parseInt(data.controlDate.split('-')[1])

                                if (monthWorked == 1) {
                                  if (dayWorked === dayIndex + 1) {
                                    {
                                      contadorDeDias = dayWorked
                                    }
                                    return (
                                      <div
                                        key={ dayWorked }
                                        className="attendance-day border border-secondary"
                                        style={ { backgroundColor: data.controlType ? data.controlType.color : 'defaultColor' } }
                                        title="Asistencia confirmada"
                                      />
                                    );
                                  }
                                }
                                return null;
                              }) }

                            </div>
                          </div>
                        ))

                      }
                      <p>Suma total de días: { contadorDeDias }</p>
                      { contadorDeDias = null }

                    </div>
                  </div>
                </div>
              </div> 
              */}


              {/* ACORDEON FEBRERO
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 2) {
                                if (dayWorked === dayIndex + 1) {
                                  console.log('dia trabajado: ' + dayWorked)
                                  return (
                                    <div
                                      key={ dayWorked }
                                      className="attendance-day border border-secondary"
                                      style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
                                      title="Asistencia confirmada"
                                    />
                                  );
                                }
                              }
                              return null;
                            }) }

                          </div>
                        </div>
                      )) }

                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON MARZO 
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 3) {
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
                              }
                              return null;
                            }) }

                          </div>
                        </div>
                      )) }

                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON ABRIL
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 4) {
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
                              }
                              return null;
                            }) }

                          </div>
                        </div>
                      )) }

                    </div>
                  </div>
                </div>




              </div> */}


              {/* ACORDEON MAYO
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 5) {
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
                              }
                              return null;
                            }) }

                          </div>
                        </div>
                      )) }

                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON JUNIO
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 6) {
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
                              }
                              return null;
                            }) }
                          </div>
                        </div>
                      )) }

                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON JULIO
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 7) {
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
                              }
                              return null;
                            }) }
                          </div>
                        </div>
                      )) }

                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON AGOSTO
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 8) {
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
                              }
                              return null;
                            }) }
                          </div>
                        </div>
                      )) }

                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON SETIEMBRE
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 9) {
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
                              }
                              return null;
                            }) }
                          </div>
                        </div>
                      )) }
                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON OCTUBRE
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
                              const monthWorked = parseInt(data.controlDate.split('-')[1])

                              if (monthWorked == 10) {
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
                              }
                              return null;
                            }) }
                          </div>
                        </div>
                      )) }
                    </div>
                  </div>
                </div>
              </div> */}


              {/* ACORDEON NOVIEMBRE
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
                            {

                              filteredData.map((data) => {
                                const dayWorked = parseInt(data.controlDate.split('-')[2]);
                                const monthWorked = parseInt(data.controlDate.split('-')[1])


                                if (monthWorked == 11) {
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
                                }


                                return null;
                              }) }
                          </div>
                        </div>
                      )) }
                    </div>
                  </div>

                </div>
              </div> */}


              {/* ACORDEON DICIEMBRE 
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
                            {
                              filteredData.map((data) => {
                                const dayWorked = parseInt(data.controlDate.split('-')[2]);
                                const monthWorked = parseInt(data.controlDate.split('-')[1])


                                if (monthWorked == 12) {
                                  if (dayWorked === dayIndex + 1) {
                                    { contadorDeDias = dayWorked }
                                    return (
                                      <>

                                        <div
                                          key={ dayWorked }
                                          className="attendance-day border border-secondary"
                                          style={ { backgroundColor: data.controlType && data.controlType.color ? data.controlType.color : 'defaultColor' } }
                                          title="Asistencia confirmada"

                                        />
                                      </>
                                    );
                                  }
                                }
                                return null;

                              })
                            }
                          </div>
                        </div>
                      )) }
                    </div>
                    <p>Suma total de días: { contadorDeDias }</p>
                    { contadorDeDias = null }
                  </div>
                </div>
              </div> */}

            </div>


          </>) :
          (<>
            {/* componente que contiene informacion del usuario */ }
            {/* < WorkerInfo worker={ attendanceData } /> */ }

            < WorkerInfo />


          </>)
      }







    </div >

  );
};

export default MonthComponent;
