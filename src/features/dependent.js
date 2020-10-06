import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import {Constant} from '../constants/api_constants';
export default function Dependent(){


    const [dependent, setDependent] = React.useState({
        name:"",
        email: "",
        phone:"",
        weight:"",
        date_of_birth:"",
        height: "",
        relationship:"",
        blood_group:"",
        user_id:localStorage.getItem(Constant.USER_ID)
      });
      const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/dependents.json");
    const handleChange=(e)=>{
        setDependent({
            ...dependent,
            [e.target.name]: e.target.value,
          });
    }

    const [deptotalstate, setDeptotalstate] = useState(null);

    const handleSubmit=(e)=>{

        e.preventDefault();
        doFetch({
        method: "post",
        body: JSON.stringify({
        dependent:{
            
        name: dependent.name,
        email: dependent.email,
        phone: dependent.phone,
        blood_group: dependent.blood_group,
        date_of_birth: dependent.date_of_birth,
        weight: dependent.weight,
        height: dependent.height,
        user_id:localStorage.getItem(Constant.USER_ID),
        relationship:dependent.relationship
        }
      }),
    });
        
    }
    return(
        <div className="card p-5" style={{maxWidth:"400px"}}>
       <form>
       
         <h2>Add Dependents</h2>
         
         <div className="form-group">
           <label>Relationship</label>
           <select name="relationship" id="dep" onChange={handleChange}>
                   <option value=""></option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Mother_in_law">Mother-in-law</option>
                    <option value="Father_in_law">Father-in-law</option>
                  </select>
         </div>
         <div className="form-group">
           <label>Name</label>
           <input type="text" 
             value={dependent.name}
             onChange= {handleChange}
             name="name"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Email Address</label>
           <input type="email" 
             value={dependent.email}
             onChange= {handleChange}
             name="email"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Contact Number</label>
           <input type="text" 
             value={dependent.phone}
             onChange= {handleChange}
             name="phone"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Date of Birth</label>
           <input type="date" 
             value={dependent.date_of_birth}
             onChange= {handleChange}
             name="date_of_birth"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Weight</label>
           <input type="text" 
             value={dependent.weight}
             onChange= {handleChange}
             name="weight"
             className="form-control" />
         </div>
         <div className="form-group">
           <label>Height</label>
           <input type="password" 
             value={dependent.height}
             onChange= {handleChange}
             name="height"
             className="form-control" />
         </div>
         <div className="form-group">
        <label>Blood Group</label>
        

        <select name="blood_group" id="dep" onChange={handleChange}>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>

                  </select>
      </div>
         <div className="d-flex mt-4 justify-content-around">
           <button type="button" className="btn btn-success"onClick={handleSubmit}>Register</button>
           <button type="button" className="btn btn-outline-warning"><Link to="/">Cancel</Link></button>
         </div>
       </form>
   
     </div>
    )
}