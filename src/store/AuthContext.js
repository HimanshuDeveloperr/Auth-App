import React, { useState } from 'react'

const AuthContext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

export const AuthContextProvider=(props)=>{
 const storedToken=localStorage.getItem("token")
    const [token,setToken]=useState(storedToken)

    const userIsLoggedIn=!!token;//truthy value in the form of boolean t/f

    const loginHandler=(token)=>{
        setToken(token)
        localStorage.setItem("token",token)
    }

    const logoutHandler=()=>{
        setToken(null)
        localStorage.removeItem("token")

    }

    const value={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

export default AuthContext