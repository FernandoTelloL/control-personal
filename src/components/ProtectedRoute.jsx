import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import { useUserContext } from "../context/UserProvider";

export const ProtectedRoute = ({ children, redirecTo = '/login' }) => {
  // !!user && (user.roles.includes('user') || user.roles.includes('admin'))} />
  // const { user } = useUserContext();
  const { user } = useContext(UserContext)
  console.log(user)

  if (!user.userName || user == null || user.userName == false) {
    return <Navigate to='/login' />
  }

  return children ? children : <Outlet />
}



