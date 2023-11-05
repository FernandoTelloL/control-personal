import { useContext } from "react"
import { useReducer } from "react"
import { createContext } from "react"
import { users } from "../data/users"


const UserContext = createContext()

// creo mi hook personalizado para usar el context desde cualquier archivo
const useUserContext = () => {
  return useContext(UserContext)
}

// defino el estado inicial de mi useReducer
const initialState = {
  user: {
    userName: '',
    password: '',
    roles: []
  }
}

// creo el reducer, cuando en otro archivo llaman al dispatch, el codigo pasa por aqui
const userReducer = (state, action) => {
  console.log(action)

  switch (action.type) {

    case 'LOGIN_USER': {
      const url = users
      console.log(url)

      function getData() {
        fetch(users)
          .then = (res) => res.json()
        console.log(res)
      }

      return {
        ...state,
        user: action.value
      }
    }

  }

  return state
}

const UserProvider = ({ children }) => {

  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ user: state.user, dispatch }}>
      {console.log(state.user)}
      {children}
    </UserContext.Provider>
  )
}

export {
  UserProvider,
  useUserContext
}