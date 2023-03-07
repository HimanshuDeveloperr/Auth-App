import React, { useState } from 'react'

const AuthContext=React.createContext({
    token:"",
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}
})

// export const AuthContextProvider=(props)=>{
//  const storedToken=localStorage.getItem("token")
//     const [token,setToken]=useState(storedToken)

//     const userIsLoggedIn=!!token;//truthy value in the form of boolean t/f

//     const loginHandler=(token)=>{
//         setToken(token)
//         localStorage.setItem("token",token)
//     }

//     const logoutHandler=()=>{
//         setToken(null)
//         localStorage.removeItem("token")

//     }

//     const value={
//         token:token,
//         isLoggedIn:userIsLoggedIn,
//         login:loginHandler,
//         logout:logoutHandler
//     }

//     return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
// }
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [expiryTime, setExpiryTime] = useState(null);
  
    const userIsLoggedIn = !!token && new Date().getTime() < expiryTime;
  
    const calculateExpiryTime = () => {
      const remainingTime = expiryTime - new Date().getTime();
      setTimeout(() => {
        setToken(null);
        localStorage.removeItem("token");
        setExpiryTime(null);
      }, remainingTime);
    };
  
    const loginHandler = (token) => {
      setToken(token);
      localStorage.setItem("token", token);
      setExpiryTime(new Date().getTime() + 5 * 60 * 1000); // 5 minutes in milliseconds
      calculateExpiryTime();
    };
  
    const logoutHandler = () => {
      setToken(null);
      localStorage.removeItem("token");
      setExpiryTime(null);
    };
  
    const contextValue = {
      token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    };
  
    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
  };
  

export default AuthContext