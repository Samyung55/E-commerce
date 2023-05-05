import { createContext, useContext, useReducer } from 'react'
import AuthReducer from '../reducers/authRedux'

const initialState = {
    authData: {}
}

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [auth, dispatch] = useReducer(AuthReducer, initialState)
    const value = {auth, dispatch}

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext Error")
    }

    return context
} 