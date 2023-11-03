
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Layout, ProtectedRoute } from './components'
import { Login, DashboardPage, GuiaPage } from './pages'
import { useState } from 'react'


function App() {

  // Esta parte del user lo voy a hacer en contexto despues
  const [user, setUser] = useState(null)

  // aca se deberia hacer la peticion al backend
  const login = () => {
    // request done
    setUser({
      id: 1,
      name: 'Fernando',
      roles: ['admin']
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (

    <BrowserRouter>

      <Navigation />

      {/* muestro condicionalmente login o logout para probar privilegios */}
      {
        user ? (<button onClick={logout}>Logout</button>)
          : (<button onClick={login}>Login</button>)
      }


      <Routes>

        <Route index element={
          <div className=''>
            <Layout>
              <Login />
            </Layout>
          </div>
        } />

        <Route path='/login' element={
          <div className=''>
            <Layout>
              <Login />
            </Layout>
          </div>
        } />

        // colocar !! este simbolo antes de user me dice que si existe user devuelve true de lo contrario false
        <Route element={<ProtectedRoute isAllowed={!!user && (user.roles.includes('user') || user.role.includes('admin'))} />}>
          <Route path='/dashboard' element={<DashboardPage user={user} />} />
          <Route path='/guia' element={<GuiaPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}


// creo temporalmente aca el nav para navegar entre las rutas
function Navigation() {
  return <nav>
    <ul>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <Link to='/guia'>Guia de Usuario</Link>
      </li>
    </ul>
  </nav>
}

export default App
