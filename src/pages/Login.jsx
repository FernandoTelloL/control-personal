// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useUserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { users } from "../data/users";

export const Login = () => {
  const navigate = useNavigate()

  // navigate('/about')

  // return <form onSubmit={handleSubmit(onSubmit)}>
  //     <div className="mb-3">
  //         <label>Email</label>
  //         <input type="text" className="form-control" {...register('email')} />
  //     </div>
  //     <div className="mb-3">
  //         <label>Password</label>
  //         <input type="password" className="form-control" {...register('password')} />
  //     </div>
  //     <input type="submit" value="Enviar" />
  // </form>


  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  // traigo el dispatch de mi reducer de usuario
  const { dispatch } = useUserContext()

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      userName,
      password,
      roles: []
    }


    // uso el dispatch para poder mandar el usuario logueado
    dispatch({
      type: 'LOGIN_USER',
      value: user
    })

    navigate('/dashboard')
  }

  return (
    <div className="form__container d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column container-fluid col-md-12 col-lg-6 col-xl-6 col-xxl-6 bg-alert"
      >
        <h1 className="text-center mb-4 display-2">Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4 pt-3 pb-3">Enviar</button>
      </form>
    </div>
  )
}


