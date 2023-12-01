import { useState, useEffect } from "react"
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../helpers/functions";


export const ShowUsers = () => {

  const myUsers = [
    {
      userId: 1,
      firstName: "Juan",
      secondName: "Carlos",
      firstSurname: "Pérez",
      secondSurname: "López",
      dni: "12345678A",
      rol: "Usuario"
    },
    {
      userId: 2,
      firstName: "María",
      secondName: "Isabel",
      firstSurname: "García",
      secondSurname: "Fernández",
      dni: "98765432B",
      rol: "Administrador"
    },
    {
      userId: 3,
      firstName: "Luis",
      secondName: "Miguel",
      firstSurname: "Sánchez",
      secondSurname: "González",
      dni: "56781234C",
      rol: "Editor"
    },
    {
      userId: 4,
      firstName: "Ana",
      secondName: "Carmen",
      firstSurname: "Martínez",
      secondSurname: "Rodríguez",
      dni: "87654321D",
      rol: "Usuario"
    },
    {
      userId: 5,
      firstName: "Pedro",
      secondName: "José",
      firstSurname: "Rodríguez",
      secondSurname: "Sánchez",
      dni: "34567890E",
      rol: "Editor"
    }
  ];


  // defino la url
  const url = myUsers;
  console.log(url)
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [userSecondName, setUserSecondName] = useState('')
  const [userFirstSurname, setUserFirstSurname] = useState('')
  const [userSecondSurname, setUserSecondSurname] = useState('')
  const [userDni, setUserDni] = useState('')
  const [userRoles, setUserRoles] = useState([])
  const [operation, setOperation] = useState(1)
  const [title, setTitle] = useState('')

  useEffect(() => {
    getUsers()
  }, [])


  const getUsers = async () => {
    // const respuesta = await axios.get(url);
    const respuesta = url;
    console.log(respuesta)
    setUsers(respuesta);
  }


  // con esta funcion determino que modal se va a abrir
  const openModal = (
    op,
    userId,
    userFirstName,
    userSecondName,
    userFirstSurname,
    userSecondSurname,
    userDni,
    userRoles
  ) => {
    setUserId('');
    setUserFirstName('');
    setUserSecondName('');
    setUserFirstSurname('');
    setUserSecondSurname('');
    setUserDni('');
    setUserRoles('');
    setOperation(op);
    if (op == 1) {
      setTitle('Registrar Producto')
    } else if (op == 2) {
      setTitle('Editar Producto');
      setUserId(userId);
      setUserFirstName(userFirstName);
      setUserSecondName(userSecondName);
      setUserFirstSurname(userFirstSurname);
      setUserSecondSurname(userSecondSurname);
      setUserDni(userDni);
      setUserRoles(userRoles);
    }
    // funcion que hace que se seleccione el primer input del formulario
    window.setTimeout(function () {
      document.getElementById('userFirstName').focus();
    }, 500)
  }

  // funcion para validar que los campos del formulario esten llenos antes de enviar la solicitud
  const validar = () => {
    let parametros;
    let metodo;

    if (userFirstName.trim() === '') {
      show_alerta('Escribe el primer nombre de usuario', 'warning')
    }

    if (userSecondName.trim() === '') {
      show_alerta('Escribe el segundo nombre de usuario', 'warning')
    }

    if (userFirstSurname.trim() === '') {
      show_alerta('Escribe el primer apellido de usuario', 'warning')
    }

    if (userSecondSurname.trim() === '') {
      show_alerta('Escribe el segundo apellido de usuario', 'warning')
    }

    if (userDni.trim() === '') {
      show_alerta('Escribe el DNI de usuario', 'warning')
    }

    if (userRoles.trim() === '') {
      show_alerta('Escribe el rol de usuario', 'warning')
    }

    if (operation === 1) {
      parametros = {
        // userId: userId.trim(),
        userFirstName: userFirstName.trim(),
        userSecondName: userSecondName.trim(),
        userFirstSurname: userFirstSurname.trim(),
        userSecondSurname: userSecondSurname.trim(),
        userDni: userDni.trim(),
        userRoles: userRoles.trim(),
      };
      { console.log(userDni.trim()); }

      metodo = 'POST';
    } else {
      parametros = {
        userId: userId,
        userFirstName: userFirstName.trim(),
        userSecondName: userSecondName.trim(),
        userFirstSurname: userFirstSurname.trim(),
        userSecondSurname: userSecondSurname.trim(),
        userDni: userDni.trim(),
        userRoles: userRoles.trim(),
      };

      metodo = 'PUT';
    }

    // Utilizo la funcion para enviar la solicitud
    enviarSolicitud(metodo, parametros)

  }

  // creo la funcion para enviar solicitud
  const enviarSolicitud = async (metodo, parametros) => {
    await axios({ method: metodo, url: url, data: parametros })
      .then(function (respuesta) {
        let tipo = respuesta.data[0];
        let msj = respuesta.data[1];
        show_alerta(msj, tipo)
        if (tipo === 'success') {
          document.getElementById('btnCerrar').click()
          getUsers();
        }
      })
      .catch(function (error) {
        show_alerta('Error en la solicitud', 'error');
        console.log(error);
      })
  }

  // funcion para eliminar usuarios
  const deleteUser = (userId, userFirstName, userFirstSurname) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: '¿Seguro de eliminar al usuario ' + userFirstName + ' ' + userFirstSurname + ' ?',
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          setUserId(userId);
          enviarSolicitud('DELETE', { userId: userId });
        } else {
          show_alerta('El usuario No fue eliminado', 'info')
        }
      })
  }

  return (
    <>

      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="d-grid mx-auto">
              <button onClick={ () => openModal(1) } className="btn btn-dark" data-bs-toggle='modal' data-bs-target='#modalUsers'>
                <i className="fa-solid fa-circle-plus"></i> Añadir
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-lg-10 offset-0 mx-auto">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-sm">
                <thead>
                  <tr><th>#</th><th>NOMBRE</th><th>APE P</th><th>APE M</th><th>DNI</th><th>ROL</th></tr>
                </thead>
                <tbody className="table-group-divider">
                  {
                    users.map((user, i) => (
                      <tr key={ user.userId }>
                        <td>{ (i + 1) }</td>
                        <td>{ user.firstName }</td>
                        <td>{ user.firstSurname }</td>
                        <td>{ user.secondSurname }</td>
                        <td>{ user.dni }</td>
                        <td>{ user.rol }</td>
                        <td>
                          <button
                            onClick={ () => openModal(2, user.id, user.firstName, user.secondName, user.firstSurname, user.secondSurname, user.dni, user.rol) }
                            className="btn btn-warning"
                            data-bs-toggle='modal'
                            data-bs-target='#modalUsers'
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          &nbsp;
                          <button onClick={ () => deleteUser(user.id, user.firstName, user.firstSurname) } className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* creacion del modal */ }
      <div id="modalUsers" className="modal fade" aria-hidden='true'>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <label htmlFor="" className="h5">{ title }</label>
              <button type="button" className="btn-close" data-bs-dismiss='modal' aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <input type="hidden" id='id' />
              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-forumbee"></i></span>
                <input
                  type="text"
                  id="userFirstName"
                  className="form-control"
                  placeholder="Primer Nombre"
                  value={ userFirstName }
                  onChange={ (e) => setUserFirstName(e.target.value) }
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-forumbee"></i></span>
                <input
                  type="text"
                  id="userSecondName"
                  className="form-control"
                  placeholder="Segundo Nombre"
                  value={ userSecondName }
                  onChange={ (e) => setUserSecondName(e.target.value) }
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-forumbee"></i></span>
                <input
                  type="text"
                  id="userFirstSurname"
                  className="form-control"
                  placeholder="Primer apellido"
                  value={ userFirstSurname }
                  onChange={ (e) => setUserFirstSurname(e.target.value) }
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-forumbee"></i></span>
                <input
                  type="text"
                  id="userSecondSurname"
                  className="form-control"
                  placeholder="Segundo apellido"
                  value={ userSecondSurname }
                  onChange={ (e) => setUserSecondSurname(e.target.value) }
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-forumbee"></i></span>
                <input
                  type="text"
                  id="userDni"
                  className="form-control"
                  placeholder="DNI"
                  value={ userDni }
                  onChange={ (e) => setUserDni(e.target.value) }
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="fa-solid fa-forumbee"></i></span>
                <input
                  type="text"
                  id="userRoles"
                  className="form-control"
                  placeholder="Roles"
                  value={ userRoles }
                  onChange={ (e) => setUserRoles(e.target.value) }
                />
              </div>

              <div className="d-grid col-6 mx-auto mb-3">
                <button onClick={ () => validar() } className="btn btn-success">
                  <i className="fa-solid fa-floppy-disk"></i>Guardar
                </button>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" id="btnCerrar" data-bs-dismiss='modal'>Cerrar</button>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}
