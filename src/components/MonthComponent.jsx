/* eslint-disable react/prop-types */
// MonthComponent.js
import { useState, useEffect } from "react"
import { WorkerInfo } from "./WorkerInfo"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { WorkerContext } from "../context/WorkerContext"
import { TiposControlContext } from "../context/TiposControlContext"
import { show_alerta } from "../helpers/functions"
import { SummaryWorked } from "./SummaryWorked"
import { InfoPrintContext } from "../context/InfoPrintContext"

const MonthComponent = () => {
  const [searchDNI, setSearchDNI] = useState("")
  console.log(searchDNI)
  const [filteredData, setFilteredData] = useState([])
  console.log(filteredData)
  let contadorDeDias = null
  // Estado para el tipo de control actual
  const [currentControlTypeId, setCurrentControlTypeId] = useState(null)
  console.log(currentControlTypeId)
  // estado para seleccionar que meses se quiere imprimir
  const [mesImprimir, setMesImprimir] = useState([])
  console.log("mes a imprimir: " + mesImprimir)

  // obtengo el estado del año del contexto infoPrintProvider
  const { anio, setAnio, registrosFiltrados, setRegistrosFiltrados } =
    useContext(InfoPrintContext)

  // estado para modal de tipos de control
  const [showModal, setShowModal] = useState(false)

  // estado para modal de opciones de impresion
  const [showModalOpciones, setShowModalOpciones] = useState(false)

  // estado para modal de meses del año
  const [showModalMonths, setShowModalMonths] = useState(false)

  const [selectedControlTypes, setSelectedControlTypes] = useState([])
  console.log(selectedControlTypes)

  // uso la informacion de WorkerContext
  const { worker, setWorker } = useContext(WorkerContext)
  console.log(worker)

  // uso la informacion de TiposControlContext
  const { setTiposControl, tiposControl } = useContext(TiposControlContext)

  // estado usado en funcion para imprimir
  const [datosControl, setDatosControl] = useState()

  // ------------------------------------------------------------------------------------------
  // useEffect para obtener los TIPOS de control del API al cargar la pagina

  useEffect(() => {
    const fetchData = async () => {
      try {
        // aqui la direccion del back con el ARRAY DE OBJETOS CON LOS TIPOS DE CONTROL
        const response = await fetch(
          `https://run.mocky.io/v3/2416c7ea-439f-4818-ba2e-52bbb584e376`
        )

        if (!response.ok) {
          throw new Error(
            `Error al cargar los datos: ${response.status} ${response.statusText}`
          )
        }

        const dataTypesControl = await response.json()

        setTiposControl(dataTypesControl)
      } catch (error) {
        console.error("Error al hacer el fetch:", error)
      }
    }

    fetchData()
  }, [setTiposControl])
  // -------------------------------------------------------------------------------------

  // evento para la eleccion de tipos de control

  // funcion que llama al hacer click en los checkbox del modal de los tipos de control para imprimir
  const handleCheckboxChangeType = (event) => {
    const value = event.target.value
    if (selectedControlTypes.includes(value)) {
      setSelectedControlTypes(
        selectedControlTypes.filter((type) => type !== value)
      )
    } else {
      setSelectedControlTypes([...selectedControlTypes, value])
    }
  }

  // funciones para mostrar u ocultar modal de tipos de control
  const handleModalOpen = () => {
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  // funciones para mostrar u ocultar modal de opciones de impresion
  const handleModalOpcionesOpen = () => {
    setShowModalOpciones(true)
  }

  const handleModalOpcionesClose = () => {
    setShowModalOpciones(false)
  }

  // funciones para mostrar u ocultar modal de meses del año
  const handleModalMonthsOpen = () => {
    setShowModalMonths(true)
  }

  const handleModalMonthsClose = () => {
    setShowModalMonths(false)
  }

  // funcion para capitalizar la primera letra de un String
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  // Funcion para que el input actualice el estado del dni
  const handleSearchChange = (e) => {
    const inputDNI = e.target.value.trim()
    // Validar que solo contiene números y tiene una longitud máxima de 8
    if (/^\d*$/.test(inputDNI) && inputDNI.length <= 8) {
      setSearchDNI(inputDNI)
    }
  }

  // Funcion para ejecutar buscar informacion del trabajador
  const handleFindEmployee = async (e) => {
    e.preventDefault()
    // setAnio(null)
    setWorker(null)

    if (searchDNI === "") {
      setWorker(null)
      return
    }

    try {
      // aqui la direccion del back con el ARRAY DE OBJETOS DE EMPLEADOS
      // const response = await fetch(`https://ciudadania-production.up.railway.app/api/task-control-employee-search?dni=${searchDNI}&year=${anio}`);
      const response = await fetch(
        `https://run.mocky.io/v3/7cc9f974-16e4-4e4b-8bd7-ab664a3b798d`
      )

      if (response.ok == false) {
        show_alerta("Trabajador no encontrado", "error")
        setWorker(null)
        setSearchDNI("")
        return
      }

      const dataSearchEmployee = await response.json()

      // Encuentra el empleado con el DNI buscado
      if (dataSearchEmployee) {
        const employeeWithInputDni = dataSearchEmployee
        console.log("Empleado encontrado:", employeeWithInputDni)

        // Aquí puedes acceder a la lista de tareas del empleado
        const taskControlList = employeeWithInputDni.taskControlList
        console.log("Lista de tareas:", taskControlList)

        setWorker(employeeWithInputDni)

        // limpio el input dni
        setSearchDNI("")
      } else {
        setWorker(null)
        return
      }

      // Asigna la información encontrada en el back del empleado a la variable setDataEmployee
      // setDataEmployee(employeeWithInputDni);
    } catch (error) {
      error
    }
  }

  // funcion para manejar el checked de los meses para seleccionar que imprimir
  const handleCheckboxChangeMonth = (event) => {
    const mesSeleccionado = parseInt(event.target.value, 10)
    const isChecked = event.target.checked

    if (mesSeleccionado === -1) {
      // Manejar el caso de "Todos los meses"
      if (isChecked) {
        // Si se marca "Todos los meses", agregar todos los meses al array
        setMesImprimir([...Array(12).keys()].map((mes) => mes + 1))
      } else {
        // Si se desmarca "Todos los meses", vaciar el array
        setMesImprimir([])
      }
    } else {
      // Manejar otros meses individualmente
      if (isChecked) {
        // Si se marca un mes específico, agregarlo al array
        setMesImprimir([...mesImprimir, mesSeleccionado])
      } else {
        // Si se desmarca un mes específico, quitarlo del array
        setMesImprimir(mesImprimir.filter((mes) => mes !== mesSeleccionado))
      }
    }
  }

  // Funcion para imprimir despuesd de seleccionar segun los checkbox de mes y tipos de control
  const handleImprimir = () => {
    handleModalOpcionesClose()
    // Filtrar los registros de control
    const registrosFiltrados = worker.taskControlList.filter((registro) => {
      // Verificar si el mes está seleccionado
      const mesSeleccionado = mesImprimir.includes(
        Number(registro.controlDate.substring(5, 7))
      )
      console.log(mesSeleccionado)
      // Verificar si el tipo de control está seleccionado
      const tipoControlSeleccionado = selectedControlTypes.includes(
        registro.controlType.id.toString()
      )
      console.log(tipoControlSeleccionado)
      // Devolver true si ambos criterios se cumplen
      return mesSeleccionado && tipoControlSeleccionado
    })
    console.log(registrosFiltrados)
    registrosFiltrados.forEach((registro) => {
      console.log(
        `Fecha: ${registro.controlDate}, Tipo de Control: ${registro.controlType.description}`
      )
      // Agrega más información según tus necesidades
    })

    setRegistrosFiltrados(registrosFiltrados)
  }
  console.log(`registros filtradosss:  ${registrosFiltrados}`)

  // ----------------------------------------
  // Función para obtener el nombre del mes
  const getMonthName = (monthIndex) => {
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ]
    return monthNames[monthIndex - 1]
  }

  // Agrupar los registros por mes
  const groupedByMonth = {}
  worker?.taskControlList.forEach((registro) => {
    const month = new Date(registro.controlDate).getMonth() + 1
    if (!groupedByMonth[month]) {
      groupedByMonth[month] = []
    }
    groupedByMonth[month].push(registro)
  })

  var type = "";
  var colorType = "";

  // ----------------------------------------
  return (
    <div className="container mt-4">
      {/* header con filtros de busqueda */}
      <div className="form-group row mb-5 mt-5">
        {/* input buscar por DNI */}
        <div className="col-sm-3 d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control fs-7 me-sm-1"
            placeholder="Buscar por DNI"
            value={searchDNI}
            onChange={handleSearchChange} // Asegura que solo se ingresen números
            maxLength="8"
          />
        </div>

        {/* combo año */}
        <div className="col-sm-3 d-flex align-items-center mt-3 mt-sm-0">
          <label htmlFor="selectMonth" className="form-label fs-7 me-2">
            Año:
          </label>
          <select
            className="form-control fs-7 w-100"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
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

        {/* boton buscar */}
        <div className="col-sm-3 d-flex align-items-center mt-3 mt-sm-0">
          {/* boton buscar */}
          <button
            disabled={searchDNI === ""}
            className="btn btn-outline-secondary w-100 text-white border border-0 fs-7"
            type="button"
            style={{ background: "#AD0506" }}
            onClick={handleFindEmployee}
          >
            Buscar
          </button>
        </div>

        {/* boton opciones de impresion */}
        <div className="col-sm-3 d-flex align-items-center mt-3 mt-sm-0">
          <button
            type="button"
            disabled={worker === null}
            className="btn btn-warning fs-7 border-3 w-100"
            onClick={handleModalOpcionesOpen}
          >
            Imprimir
          </button>
          {/* Modal para seleccionar opciones de IMPRESION */}
          <div
            className={`modal fade ${showModalOpciones ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: showModalOpciones ? "block" : "none" }}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Opciones impresión</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleModalOpcionesClose}
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="col-sm-12 d-flex align-items-center mt-3 mt-sm-0">
                    <button
                      type="button"
                      className="btn btn-warning fs-7 border-3 w-100"
                      onClick={handleModalMonthsOpen}
                    >
                      Meses
                    </button>

                    {/* Modal para seleccionar meses */}
                    <div
                      className={`modal fade ${showModalMonths ? "show" : ""}`}
                      tabIndex="-1"
                      role="dialog"
                      style={{ display: showModalMonths ? "block" : "none" }}
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Seleccionar Meses</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={handleModalMonthsClose}
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {/* Lista de meses con checkboxes */}
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxTodos"
                                value="-1"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxTodos"
                              >
                                Todos los meses del año
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxEnero"
                                value="1"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxEnero"
                              >
                                Enero
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxFebrero"
                                value="2"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxFebrero"
                              >
                                Febrero
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxMarzo"
                                value="3"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxMarzo"
                              >
                                Marzo
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxAbril"
                                value="4"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxAbril"
                              >
                                Abril
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxMayo"
                                value="5"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxMayo"
                              >
                                Mayo
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxJunio"
                                value="6"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxJunio"
                              >
                                Junio
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxJulio"
                                value="7"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxJulio"
                              >
                                Julio
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxAgosto"
                                value="8"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxAgosto"
                              >
                                Agosto
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxSetiembre"
                                value="9"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxSetiembre"
                              >
                                Setiembre
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxOctubre"
                                value="10"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxOctubre"
                              >
                                Octubre
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxNoviembre"
                                value="11"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxNoviembre"
                              >
                                Noviembre
                              </label>
                            </div>

                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkboxDiciembre"
                                value="12"
                                onChange={handleCheckboxChangeMonth}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkboxDiciembre"
                              >
                                Diciembre
                              </label>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleModalMonthsClose}
                            >
                              Aplicar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* // ... (tu código posterior) */}

                  {/* combo tipo de control */}
                  <div className="col-sm-12 d-flex align-items-center mt-3">
                    <button
                      type="button"
                      className="btn btn-warning fs-7 border-3 w-100"
                      onClick={handleModalOpen}
                    >
                      Tipo de control
                    </button>
                  </div>

                  <div
                    className={`modal fade ${showModal ? "show" : ""
                      } z-index-1`}
                    tabIndex="-1"
                    role="dialog"
                    style={{ display: showModal ? "block" : "none" }}
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">
                            Seleccionar Tipos de Control
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={handleModalClose}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          {tiposControl.map((tipo) => (
                            <div key={tipo.id} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`checkbox_${tipo.id}`}
                                value={tipo.id}
                                checked={selectedControlTypes.includes(
                                  tipo.id.toString()
                                )}
                                onChange={handleCheckboxChangeType}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`checkbox_${tipo.id}`}
                              >
                                {capitalizeFirstLetter(tipo.description)}
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleModalClose}
                          >
                            Aplicar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  {/* Boton imprimir */}
                  <Link to={``} className="col-sm-2">
                    <button
                      className="btn btn-danger border border-0 fs-7 mt-3"
                      onClick={handleModalOpcionesClose}
                    >
                      Cancelar
                    </button>
                  </Link>

                  {/* Boton imprimir */}
                  <Link to={worker ? `printall` : ``} className="col-sm-2">
                    {/* <Link to={ worker ? `` : `` } className='col-sm-2'> */}
                    <button
                      className="btn btn-primary border border-0 fs-7 mt-3 text-white mx-lg-2"
                      // onClick={ handleModalOpcionesClose handleImprimir }
                      onClick={handleImprimir}
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

      {worker !== null && worker?.taskControlList.length > 0 ? (
        <>
          {/* componente que contiene informacion del usuario */}
          {/* < WorkerInfo worker={ attendanceData } /> */}
          <WorkerInfo />
          {/* Tabla de asistencia */}
          <div className="table-responsive">
            <table className="table table-bordered table-dark">
              <thead>
                <tr>
                  <th>MES</th>
                  {[...Array(30)].map((_, index) => (
                    <th key={index + 1}>{index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(12)].map((_, monthIndex) => (
                  <tr key={monthIndex}>
                    <td>{getMonthName(monthIndex + 1)}</td>
                    {[...Array(30)].map((_, dayIndex) => (
                      <td key={dayIndex + 1}>
                        {groupedByMonth[monthIndex + 1]?.find((registro) => {
                          type = registro.controlType.type
                          colorType = registro.controlType.color
                          console.log("soy el color", colorType)
                          return (
                            new Date(registro.controlDate).getDate() ===
                            dayIndex + 1
                          )
                        }) ? (
                          <span className="badge bg-primary" style={{backgroundColor: colorType }}>{type}</span>
                        ) : (
                          <span className="badge bg-secondary">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* ***************** */}
        </>
      ) : (
        <>
          {/* componente que contiene informacion del usuario */}
          {/* < WorkerInfo worker={ attendanceData } /> */}
          <WorkerInfo />
        </>
      )}
    </div>
  )
}

export default MonthComponent