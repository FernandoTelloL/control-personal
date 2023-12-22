import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
// import { useUserContext } from "../context/UserProvider";
import MonthComponent from "../components/MonthComponent";
import logo from '../assets/logo.png'
// import attendanceData from '../components/asistencia.json';
// import attendanceData from '../data/busquedaUsuario.json';
import { PrintAll } from "../components/tables/PrintAll";
// import { Inicio } from "./Inicio";
import { useContext } from "react";
import { useEffect } from "react";
import { TiposControlContext } from "../context/TiposControlContext";
import { WorkerContext } from "../context/WorkerContext";
import { UserContext } from "../context/UserContext";
import { CleaningServices } from "@mui/icons-material";


export const DashboardPage = () => {

  const { user, setUser } = useContext(UserContext)

  const [bntSidenav, setBntSidenav] = useState(false)

  // const { user } = useUserContext();
  // console.log(user)

  const handleClick = () => {
    setBntSidenav(bntSidenav => !bntSidenav)
  }

  let toggleClassCheck = bntSidenav ? 'sb-sidenav-toggled' : null;


  // uso la informacion de WorkerContext
  const { setWorker } = useContext(WorkerContext)

  // uso la informacion de TiposControlContext
  // const { setTiposControl } = useContext(TiposControlContext)

  // // useEffect para obtener los tipos de control del API al cargar la pagina
  // useEffect(() => {

  //   const fetchData = async () => {

  //     try {
  //       // aqui la direccion del back con el ARRAY DE OBJETOS DE EMPLEADOS
  //       const response = await fetch(`https://run.mocky.io/v3/2416c7ea-439f-4818-ba2e-52bbb584e376`);

  //       if (!response.ok) {
  //         throw new Error(`Error al cargar los datos: ${response.status} ${response.statusText}`);
  //       }
  //       console.log(dataTypesControl)

  //       const dataTypesControl = await response.json();

  //       // Encuentra el empleado con el DNI buscado
  //       // const employeeWithInputDni = dataSearchEmployee.find(user => user.employee.dni === parseInt(searchDNI, 10));

  //       // if (employeeWithInputDni) {
  //       //   console.log('Empleado encontrado:', employeeWithInputDni);

  //       //   // Aquí puedes acceder a la lista de tareas del empleado
  //       //   const taskControlList = employeeWithInputDni.taskControlList;
  //       //   console.log('Lista de tareas:', taskControlList);

  //       //   // ... Resto de tu lógica ...

  //       // } else {
  //       //   console.log('Empleado no encontrado');
  //       // }

  //       // Asigna la información encontrada en el back del empleado a la variable setDataEmployee
  //       // setDataEmployee(employeeWithInputDni);
  //       setTiposControl(dataTypesControl)

  //     } catch (error) {
  //       console.error('Error al hacer el fetch:', error);
  //     }

  //   }

  //   fetchData()
  // }, [setTiposControl])



  return (
    // <div className="container">
    //   <h1>DashboardPage</h1>

    //   <button className="btn btn-primary w-100 mb-3">Buscar trabajador </button>

    //   {
    //     user.role.includes('admin')
    //       ? (
    //         <>
    //           <button className="btn btn-success w-100 mb-3">Agregar trabajador </button>
    //           <button className="btn btn-danger w-100 mb-3">Editar trabajador </button>
    //         </>
    //       ) : <></>

    //   }
    // </div>




    <div className={ `sb-nav-fixed ${toggleClassCheck}` }>
      <nav className="sb-topnav navbar navbar-expand bg-white shadow-sm">
        {/* <!-- Navbar Brand--> */ }
        {/* <a className="navbar-brand ps-3" href="index.html">Seguridad Ciudadana</a> */ }
        <nav className="navbar navbar-light bg-light p-">
          <a className="navbar-brand bg-white" href="#">
            <img className="pl-2" width='197px' src={ logo } alt="Brand Logo" />
          </a>
        </nav>

        {/* <!-- Sidebar Toggle--> */ }
        <button onClick={ handleClick } className={ `btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0` } id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

        {/* <!-- Navbar Search--> */ }
        {/* <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
          </div>
        </form> */}

        {/* <!-- Navbar--> */ }
        <ul className="navbar-nav ms-auto me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle " id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item text-uppercase fw-bold" href="#!">{ user.userName }</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#!">Configuración</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <Link
                  className="dropdown-item"
                  to={ '/' }
                  onClick={ () => setUser(null) }
                >
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <div id="layoutSidenav">

        {/* inicio sidebar */ }
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark sidenav-main" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Menu Principal</div>

                <Link
                  className="nav-link"
                  to="/dashboard/inicio"
                  onClick={ () => setWorker(null) }
                >
                  <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                  Inicio
                </Link>

                <hr />



                <NavLink className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                  <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                  Principal
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </NavLink>
                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                    <Link className="nav-link fs-7" to="/dashboard/consulta-personal" >
                      Consulta de Personal
                    </Link>

                    <Link
                      className="nav-link fs-7"
                      to='/dashboard/upload-excel'
                      onClick={ () => setWorker(null) }
                    >
                      Carga de Excel
                    </Link>

                  </nav>
                </div>
                <hr />
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages2" aria-expanded="false" aria-controls="collapsePages">
                  <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                  Tablas Maestras
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapsePages2" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">

                    {
                      user.roles.includes('admin')
                        ? (
                          <Link
                            className="nav-link fs-7"
                            to="/dashboard/register-user"
                            onClick={ () => setWorker(null) }
                          >
                            Personal
                          </Link>
                        )
                        : null
                    }

                    <a className="nav-link fs-7" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                      Funciones
                    </a>

                    <a className="nav-link fs-7" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                      Tipos de Control
                    </a>

                  </nav>
                </div>
                <hr />
                {/* <div className="sb-sidenav-menu-heading">Subtitulo 3</div> */ }

              </div>
            </div>
            <div className="sb-sidenav-footer sidenav-main-footer">
              <div className="small">Logueado como:</div>
              {/* revisar estoooo */ }
              <div className=" small text-uppercase">{ `${user.userName}` }</div>
            </div>
          </nav>
        </div>
        {/* fin sidebar */ }

        {/* inicio contenido dashboard */ }
        <div id="layoutSidenav_content">

          {/* inicio contenido principal dashboard */ }
          <main>
            <div className="container-fluid px-4 pb-5">
              {/* <h1 className="mt-4">Dashboard</h1> */ }

              {/* <TableJson /> */ }





              {/* <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol> */}

              <Outlet />

            </div>
          </main>
          {/* fin contenido principal dashboard */ }

          {/* inicio footer dashboard */ }
          {/* <footer className="py-4 mt-auto bg-dark text-light">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">FOOTER</div>
              </div>
            </div>
          </footer> */}


          {/* fin footer dashboard */ }

        </div>
        {/* fin contenido dashboard */ }
      </div >

    </div >


  )
}
