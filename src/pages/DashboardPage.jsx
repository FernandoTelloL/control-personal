import { useState } from "react";
import { useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";
import { Outlet } from "react-router-dom";


export const DashboardPage = ({ user }) => {

  const [bntSidenav, setBntSidenav] = useState(false)


  const handleClick = (e) => {
    setBntSidenav(bntSidenav => !bntSidenav)
  }

  let toggleClassCheck = bntSidenav ? 'sb-sidenav-toggled' : null;

  console.log(user)
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




    <div className={`sb-nav-fixed ${toggleClassCheck}`}>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* <!-- Navbar Brand--> */}
        <a className="navbar-brand ps-3" href="index.html">Seguridad Ciudadana</a>

        {/* <!-- Sidebar Toggle--> */}
        <button onClick={handleClick} className={`btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0`} id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>

        {/* <!-- Navbar Search--> */}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
          </div>
        </form>

        {/* <!-- Navbar--> */}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item text-uppercase fw-bold" href="#!">{user.name}</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#!">Configuración</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#!">Logout</a></li>
            </ul>
          </li>
        </ul>
      </nav>


      <div id="layoutSidenav">

        {/* inicio sidebar */}
        <div id="layoutSidenav_nav">
          <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Subtitulo 1</div>
                <a className="nav-link" href="index.html">
                  <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                  Dashboard
                </a>
                <div className="sb-sidenav-menu-heading">Subtitulo 2</div>
                <NavLink className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                  <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                  Usuarios
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </NavLink>
                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav">
                    {/* TODO: Verificar este Link ////////////////////////////////////////////////////////*/}
                    <Link className="nav-link" to='/dashboard/register-user'>Registrar usuario</Link>
                    <a className="nav-link" href="layout-sidenav-light.html">Sub Item 2</a>
                  </nav>
                </div>
                <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                  <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                  Item 3
                  <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                  <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                      Sub Item 3
                      <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                      <nav className="sb-sidenav-menu-nested nav">
                        <a className="nav-link" href="login.html">sub subItem 1</a>
                        <a className="nav-link" href="register.html">sub subItem 2</a>
                        <a className="nav-link" href="password.html">sub subItem 3</a>
                      </nav>
                    </div>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                      Sub Item 4
                      <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </a>
                    <div className="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                      <nav className="sb-sidenav-menu-nested nav">
                        <a className="nav-link" href="401.html">sub subItem 4</a>
                        <a className="nav-link" href="404.html">sub subItem 5</a>
                        <a className="nav-link" href="500.html">sub subItem 6</a>
                      </nav>
                    </div>
                  </nav>
                </div>
                <div className="sb-sidenav-menu-heading">Subtitulo 3</div>
                <a className="nav-link" href="charts.html">
                  <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                  Item 4
                </a>
                <a className="nav-link" href="tables.html">
                  <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                  Item 5
                </a>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logueado como:</div>
              <div className=" small text-uppercase">{`${user.name} ${user.lastName}`}</div>
            </div>
          </nav>
        </div>
        {/* fin sidebar */}

        {/* inicio contenido dashboard */}
        <div id="layoutSidenav_content">

          {/* inicio contenido principal dashboard */}
          <main>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Dashboard</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
              <Outlet />

            </div>
          </main>
          {/* fin contenido principal dashboard */}

          {/* inicio footer dashboard */}
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">FOOTER</div>
              </div>
            </div>
          </footer>
          {/* fin footer dashboard */}

        </div>
        {/* fin contenido dashboard */}
      </div >

    </div >


  )
}
