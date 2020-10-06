import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';
import {API_SESSIONS} from '../constants/api_constants';
import {Constant} from '../constants/api_constants';


export default function Register() {


  const [user, setUser] = React.useState({
    full_name:"",
    email: "",
    phone:"",
    country:"",
    date_of_birth:"",
    password: "",
    password_confirmation:""
  });

  const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/users.json");


  const handleSubmit = (e) => {
    e.preventDefault();
    doFetch({
     method: "post",
     body: JSON.stringify({
       user:{
       full_name:user.full_name,
       email: user.email,
       phone:user.number,
       country:user.country,
       date_of_birth:user.date_of_birth,
       password: user.password,
       password_confirmation:user.cpassword
       }
     })
   })   
    setUser({
      full_name:"",
      email: "",
      phone:"",
      country:"",
      date_of_birth:"",
      password: "",
      password_confirmation:""
    })

  }

  const handleChange  = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
    return (

       <div className="card p-5" style={{maxWidth:"400px"}}>
       <form>
       
         <h2>Registration</h2>
         
         <div className="form-group">
           <label>Name</label>
           <input type="text"  
             onChange= {handleChange}
             value={user.full_name}
             name="full_name"
             className="form-control"  />
         </div>
         <div className="form-group">
           <label>Email Address</label>
           <input type="email" 
             value={user.email}
             onChange= {handleChange}
             name="email"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Contact Number</label>
           <input type="number" 
             value={user.number}
             onChange= {handleChange}
             name="number"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Country</label>
           <input type="text" 
             value={user.country}
             onChange= {handleChange}
             name="country"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Date of Birth</label>
           <input type="date" 
             value={user.date_of_birth}
             onChange= {handleChange}
             name="date_of_birth"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Password</label>
           <input type="password" 
             value={user.password}
             onChange= {handleChange}
             name="password"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Confirm Password</label>
           <input type="password" 
             value={user.cpassword}
             onChange= {handleChange}
             name="cpassword"
             className="form-control" />
         </div>
         <div className="d-flex mt-4 justify-content-around">
           <button type="button" className="btn btn-success"onClick={handleSubmit}>Register</button>
           <button type="button" className="btn btn-outline-warning"><Link to="/">Cancel</Link></button>
         </div>
       </form>
   
     </div>
   )
    
}