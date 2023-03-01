import { useRef, useState } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsLoading]=useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
     event.preventDefault()


     const email=emailRef.current.value;
     const password=passwordRef.current.value;

     setIsLoading(true)

     if(isLogin){
      //while login
     }else{
      //while signup

      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD830lnvIXqWEN1LgVTqFGZgHivafbb1AU",{
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
        }
        else{
          //if failed then 
          response.json().then((data)=>{
            let errorMessage="Authentication-Failed"

            alert(errorMessage)

            
            
          })

        }
      })
     }
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
