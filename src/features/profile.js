import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';
import {API_SESSIONS} from '../constants/api_constants';
import {Constant} from '../constants/api_constants';


export default function Profile() {

  const id=localStorage.getItem(Constant.USER_ID);
  const API=`http://localhost:3001/users/${id}.json`;
  const API_DEPENDENTS="http://localhost:3001/dependents.json";


  const [user, setUser] = React.useState({
    full_name:"",
    email: "",
    phone:"",
    bloodgroup:"",
    date_of_birth:"",
    weight: "",
    height:""
  });

  const [changedependent, setchangeDependent] = React.useState(null);

  const API_DEPCHANGE=`http://localhost:3001/dependents/${changedependent}.json`;
  const {
    isLoading: depchangeisLoading,
    response: depchangeresponse,
    error: dechangeperror,
    doFetch: depchangedoFetch,
    doLogout: depchangedoLogout,
   } = useFetch(API_DEPCHANGE);

  const userhandleChange=(e) =>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })

  }

  const {
    isLoading:userisLoading,
    response:userresponse,
    error: usererror,
    doFetch:userdoFetch
   
  } = useFetch(API);

  console.log(userisLoading,userresponse,usererror,userdoFetch);

  useEffect(() => {
    userdoFetch({
      method: "get",
    });
  }, []);

  useEffect(() => {
    if (userresponse) {
      console.log(userresponse);
      setUser({
        full_name: userresponse.full_name,
        email: userresponse.email,
        phone: userresponse.phone,
        blood_group: userresponse.blood_group,
        date_of_birth: userresponse.date_of_birth,
        weight: userresponse.weight,
        height: userresponse.height,
      });
    }
  }, [userresponse]);

  const [dependent, setDependent] = useState({
    name: "",
    email: "",
    phone: "",
    blood_group: "",
    date_of_birth: "",
    weight: "",
    height: "",
  });

  const dephandleChange = (e) => {
    setDependent({
      ...dependent,
      [e.target.name]: e.target.value,
    });
  };

 // const {isLoading,response}=useFetch("");

   const {
     isLoading:depisLoading,
     response: depresponse,
     error: deperror,
     doFetch: depdoFetch
    
   } = useFetch(API_DEPENDENTS);

  useEffect(() => {
    depdoFetch({
      method: "get",
    });
  }, []);
  const [deptotalstate, setDeptotalstate] = useState(null);
  useEffect(() => {
    console.log("Hi!",depresponse);
    setDeptotalstate(depresponse);
  }, [depresponse]);

  const [dummydep, setdummydep] = useState(0);
  const myDep = (e) => {
    e.preventDefault();

    console.log("Dependent State",deptotalstate,e.target.value);
    
    for (var i = 0; i < deptotalstate.length; i++) {
      if (
        deptotalstate[i].relationship ==
       e.target.value.toString()
      ) {
        setchangeDependent(deptotalstate[i].id);
        
        setdummydep(i);
        console.log(deptotalstate);
        setDependent({
          name: deptotalstate[i].name,
          email: deptotalstate[i].email,
          phone: deptotalstate[i].phone,
          blood_group: deptotalstate[i].blood_group,
          date_of_birth: deptotalstate[i].date_of_birth,
          weight: deptotalstate[i].weight,
          height: deptotalstate[i].height,
        });
      }
    }
  };

  const userChange = (e) => {
    e.preventDefault();
    userdoFetch({
      method: "put",
      body: JSON.stringify({
        user:{
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        blood_group: user.blood_group,
        date_of_birth: user.date_of_birth,
        weight: user.weight,
        height: user.height
        }
      }),
    });
  };

  const depChange = (e) => {
    e.preventDefault();
    if (changedependent === null) return;

    depchangedoFetch({
      method: "put",
      body: JSON.stringify({
        dependent:{
        name: dependent.name,
        email: dependent.email,
        phone: dependent.phone,
        blood_group: dependent.blood_group,
        date_of_birth: dependent.date_of_birth,
        weight: dependent.weight,
        height: dependent.height
        }
      }),
    });
    const vel = () => {
      return deptotalstate.map((item) => {
        if (item.id === changedependent) {
          item.name = dependent.name;
          item.email = dependent.email;
          item.contact_phone = dependent.phone;
          item.blood_group = dependent.blood_of_group;
          item.date_of_birth = dependent.date_of_birth;
          item.weight = dependent.weight;
          item.height = dependent.height;
          return item;
        } else {
          return item;
        }
      });
    };
    setDeptotalstate(vel);
  };
  useEffect(() => {
    if (depchangeresponse) {
      console.log(depchangeresponse);
     
    }
  }, [depchangeresponse]);


  
 
    return (
      <div>
      <h2>Welcome {user.full_name}</h2>
      <div className="row" >
        
        <div className="col-md-4">
      <form onSubmit={userChange}>

        <div className="form-group">
          <button type="button" className="btn btn-outline-success"><Link to="/dependent">Add dependents</Link></button>
        </div>
      
       
        
        <div className="form-group">
          <label>Name</label>
          <input type="text"  
            onChange= {userhandleChange}
            value={user.full_name}
            name="full_name"
            className="form-control"  />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" 
            value={user.email}
            onChange= {userhandleChange}
            name="email"
            className="form-control" />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input type="text" 
            value={user.phone}
            onChange= {userhandleChange}
            name="phone"
            className="form-control" />
        </div>
        <div className="form-group">
        <label>Blood Group</label>
        

<select name="blood_group" id="user" onChange={userhandleChange}>
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
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" 
            value={user.date_of_birth}
            onChange= {userhandleChange}
            name="date_of_birth"
            className="form-control" />
        </div>
        <div className="form-group">
          <label>Weight</label>
          <input type="number" 
            value={user.weight}
            onChange= {userhandleChange}
            name="weight"
            className="form-control" />
        </div>
        <div className="form-group">
          <label>Height</label>
          <input type="number" 
            value={user.height}
            onChange= {userhandleChange}
            name="height"
            className="form-control" />
        </div>
        <div className="d-flex mt-4 justify-content-around">
          <button type="submit" className="btn btn-success" value="Submit">Save</button>
          <button type="button" className="btn btn-outline-warning" value="Cancel"><Link to="/">Cancel</Link></button>
        </div>
      </form>

      </div>


      {/* {JSON.stringify(dependent)} */}
      {changedependent}

  <div className="col-md-4 col-md-offset-4">


      <form onSubmit={depChange}>
      
      
      
      <div className="form-group">
        <label>Relationship</label>
          <select name="relationship" id="dep" onChange={myDep}>
                   <option value=""></option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Mother_in_law">Mother-in-law</option>
                    <option value="Father_in_law">Father-in-law</option>
                  </select>
      </div>
      <div className="form-group">
        <label>Name</label>
        <input type="text" 
          value={dependent.name}
          onChange= {dephandleChange}
          name="name"
          className="form-control" />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" 
          value={dependent.email}
          onChange= {dephandleChange}
          name="email"
          className="form-control" />
      </div>
      <div className="form-group">
        <label>Contact Number</label>
        <input type="text" 
          value={dependent.phone}
          onChange= {dephandleChange}
          name="number"
          className="form-control" />
      </div>
      <div className="form-group">
        <label>Blood Group</label>
        

<select name="blood_group" id="dep" onChange={dephandleChange}>
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
      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" 
          value={dependent.date_of_birth}
          onChange= {dephandleChange}
          name="date_of_birth"
          className="form-control" />
      </div>
      <div className="form-group">
        <label>Weight</label>
        <input type="text" 
          value={dependent.weight}
          onChange= {dephandleChange}
          name="weight"
          className="form-control" />
      </div>
      <div className="form-group">
        <label>Height</label>
        <input type="text" 
          value={dependent.height}
          onChange= {dephandleChange}
          name="height"
          className="form-control" />
      </div>
      <div className="d-flex mt-4 justify-content-around">
        <button type="submit" className="btn btn-success"value="Submit">Save</button>
        <button type="button" className="btn btn-outline-warning" value="Cancel"><Link to="/">Cancel</Link></button>
      </div>
    </form>
  
    </div>
    </div>

    </div>
  
    
  )
    
}