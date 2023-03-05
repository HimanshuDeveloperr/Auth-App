import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const context=useContext(AuthContext)
  const History=useHistory()

  const BtnHandler=()=>{
    context.logout()
    History.replace("/auth")

  }

  const isLoggedIn=context.isLoggedIn
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && 
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          }
          {isLoggedIn && 
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          }
          
          {isLoggedIn && 
          <li>
            <button onClick={BtnHandler}>Logout</button>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
