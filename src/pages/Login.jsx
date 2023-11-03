// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

export const Login = () => {

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

  return (
    <div className="form__container d-flex justify-content-center align-items-center min-vh-100">
      <form className="d-flex flex-column container-fluid col-md-12 col-lg-6 col-xl-6 col-xxl-6 bg-alert" >
        <h1 className="text-center mb-4 display-2">Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Recordarme</label>
        </div>
        <button type="submit" className="btn btn-primary mt-4 pt-3 pb-3">Enviar</button>
      </form>
    </div>
  )
}


