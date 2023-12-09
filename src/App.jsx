
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout, PrintAll, ProtectedRoute } from './components'
import { Login, DashboardPage, GuiaPage, UpdateUser, ConsultaPersonal, Inicio, UploadExcel } from './pages'
// import { useState } from 'react'
import { useUserContext } from './context/UserProvider'
import { ShowUsers } from './components/ShowUsers'


function App() {

  const { user } = useUserContext();
  console.log(user)

  // Esta parte del user lo voy a hacer en contexto despues
  // const [user, setUser] = useState(null)

  // aca se deberia hacer la peticion al backend
  // const login = () => {
  //   // request done
  //   setUser({
  //     id: 1,
  //     name: 'Fernando',
  //     lastName: 'Tello',
  //     roles: ['admin']
  //   })
  // }

  const logout = () => {
    // setUser(null)
  }


  return (


    <BrowserRouter>


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


        {/* <Route path='/consulta-personal' element={
          <DashboardPage >
            <ConsultaPersonal />
          </DashboardPage>

        } /> */}
        {/* <Route path='/dashboard' element={ <DashboardPage /> }>
          <Route path='/dashboard/consulta-personal' element={ <ConsultaPersonal /> } />
          <Route path='/dashboard/inicio' element={ <Inicio /> } />
        </Route> */}

        {/* // colocar !! este simbolo antes de user me dice que si existe user devuelve true de lo contrario false */ }
        <Route element={ <ProtectedRoute /> }>
          <Route path='/dashboard' element={ <DashboardPage /> } >
            <Route path='register-user' element={ <ShowUsers /> } />
            <Route path='update-user' element={ <UpdateUser /> } />
            <Route path="consulta-personal/printall" element={ <PrintAll /> } />
            <Route path='consulta-personal' element={ <ConsultaPersonal /> } />
            <Route path='upload-excel' element={ <UploadExcel /> } />
            <Route path='inicio' element={ <Inicio /> } />
          </Route>
          <Route path='/guia' element={ <GuiaPage /> } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}



export default App
