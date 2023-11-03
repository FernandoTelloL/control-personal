import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAllowed, children, redirecTo = '/login' }) => {

  if (!isAllowed) {
    return <Navigate to={redirecTo} />
  }

  return children ? children : <Outlet />
}



