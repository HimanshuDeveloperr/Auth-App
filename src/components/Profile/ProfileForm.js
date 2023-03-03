import { useContext, useRef } from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  
  const passwordRef=useRef("")
  const context=useContext(AuthContext)

  const submitHandler=(event)=>{
   event.preventDefault();

   const newPassword=passwordRef.current.value;

   fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD830lnvIXqWEN1LgVTqFGZgHivafbb1AU",{
    method:"POST",
    body:JSON.stringify({
      idToken:context.token,
      password:newPassword,
      returnSecureToken:false
    }),
    headers:{
      "Content-Type": "application/json"
    }
   }).then((response)=>{
    console.log(response.status)
   })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
