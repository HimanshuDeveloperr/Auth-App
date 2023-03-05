import { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsLoading]=useState(false)
  const History =useHistory()


   const context=useContext(AuthContext)


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
     event.preventDefault()


     const email=emailRef.current.value;
     const password=passwordRef.current.value;

     setIsLoading(true)
 
     let url;

     if(isLogin){
      //while login
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD830lnvIXqWEN1LgVTqFGZgHivafbb1AU"
     }else{
      //while signup
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD830lnvIXqWEN1LgVTqFGZgHivafbb1AU"
    }
    
          fetch(url,{
            method:"POST",
            body:JSON.stringify({
              email:email,
              password:password,
              returnSecureToken:true
            }),
            headers:{
              "Content-Type": "application/json"
            }
    
          }).then((response)=>{
            setIsLoading(false)
            if(response.ok){
              //success then
             return response.json()
            }

            else{
              //if failed then 
             return response.json().then((data)=>{
                console.log(data)
                let errorMessage="Authentication-Failed"
    
                // alert(errorMessage)

                throw new Error(errorMessage)
    
                
                
              })
    
            }
          }).then(data=>{
            //in success case
            console.log(data)
            context.login(data.idToken)
            History.replace("/")

          }).catch((error)=>{
            alert(error.message)
          })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
        { !isLoading &&
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          }
          {isLoading && <p>sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
