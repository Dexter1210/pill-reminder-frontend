import React from 'react';
import useFetch from '../hooks/use-fetch';
import {Link} from 'react-router-dom';
import {CurrentUserContext} from '../context/user-context';
import {API_SESSIONS} from '../constants/api_constants';
import {Constant} from '../constants/api_constants';



export default function Login() {
    const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    
     const [user, setUser] = React.useState({
      email: "",
      password: ""
    });
    
     const {isLoading, response, error, doFetch} = useFetch(API_SESSIONS);
  
    let token = localStorage.getItem(Constant.AUTH_TOKEN);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      //alert("Hi!");
       doFetch({
        method: "post",
        body: JSON.stringify({
          email: user.email,
          password: user.password
        })
      })
    }
    
    // When user logins in
    React.useEffect(() => {
      if (!response) return;
  
      console.log("RESPONSE: ", response);
      if (!response.token) return;
      
      // Set the auth token in localStorage
      localStorage.setItem(Constant.AUTH_TOKEN,response.token);
      localStorage.setItem(Constant.USER_ID,response.id);
      
      
      // Update the userContext
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: response
      }))
    },[response])
    
    const handleChange  = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
    }
    
    return (
      
      <div className="card p-5" style={{maxWidth:"400px"}}>
        <form  >
          <div>
            <img src="oie_png.png"  className="rounded mx-auto d-block" ></img>
          </div>
        
          <h2>Welcome to Pill Reminder</h2>
          <div>
            {response && JSON.stringify(response)}
            {error && JSON.stringify(error)}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email"  
              onChange= {handleChange}
              value={user.email}
              name="email"
              className="form-control"  />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" 
              value={user.password}
              onChange= {handleChange}
              name="password"
              className="form-control" />
          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-success" onClick={handleSubmit} >Sign in</button>
          </div>
          <div className="d-flex mt-4 justify-content-around">
            {/* <input type="button" value="Forgot password" className="btn btn-secondary"/> */}
            <Link to="/register">New User</Link>
          </div>
        </form>
    
      </div>
    )
  }