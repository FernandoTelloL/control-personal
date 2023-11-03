import { Navigate } from "react-router-dom";


export const DashboardPage = ({ user }) => {

  console.log(user)
  return (
    <div className="container">
      <h1>DashboardPage</h1>

      <button className="btn btn-primary w-100 mb-3">Buscar trabajador </button>

      {
        user.role.includes('admin')
          ? (
            <>
              <button className="btn btn-success w-100 mb-3">Agregar trabajador </button>
              <button className="btn btn-danger w-100 mb-3">Editar trabajador </button>
            </>
          ) : <></>

      }
    </div>
  )
}
