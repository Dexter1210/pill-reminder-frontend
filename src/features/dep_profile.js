import React from 'react';
import { Link } from 'react-router-dom';
import { Constant } from '../constants/api_constants';
import useFetch from '../hooks/use-fetch';
import Depform from './dep-form';

export default function DepsProfile () {

    const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/dependents");
    const [showDep, setShowDep] = React.useState(false);
    let id = localStorage.getItem(Constant.USER_ID);
    
    const [depData, setDepData] = React.useState({
      relationship: "",
      name: "",
      email: "",
      phone: "",
      blood_group: "",
      date_of_birth: "",
      weight: "",
      height: "",
      user_id: id
    });

  const handleChange = (e) => {
    setDepData({
      ...depData,
      [e.target.name]: e.target.value
    })
  }

  const handleDepSubmit = (e) => {
    e.preventDefault();
    alert("Dependent added");
    console.log (depData);
    doFetch({
        method: "post",
        body: JSON.stringify({
          dependent: {
            relationship: depData.relationship,
            name: depData.name,
            email: depData.email,
            phone: depData.phone,
            blood_group: depData.blood_group,
            date_of_birth: depData.date_of_birth,
            weight: depData.weight,
            height: depData.height,
            user_id: depData.user_id
        }})
        })
  }
    const toggleView = () => {
        setShowDep(p =>!p)
    }

    return(
        <div className="d-flex justify-content-between">
            <div><button className="btn btn-success" onClick={toggleView}> View/Add Dependents</button></div>
            {!showDep && 
            <Depform />
            }
            { showDep &&
          <form onSubmit={handleDepSubmit}>
            <h6>Add Dependant</h6>

            <div className="form-group">
              <select value={depData.relationship} onChange={handleChange} name="relationship" className="form-control">
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Spouse">Spouse</option>
                <option value="Children">Children</option>
                <option value="Mother In Law">Mother In Law</option>
                <option value="Father In Law">Father In Law</option>
              </select>
            </div>

            <div className="form-group">
              <input type="text" name="name" 
              onChange={handleChange} placeholder="Name" 
              value={depData.name} className="form-control" />
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={depData.email} className="form-control" />
            </div>

            <div className="form-group">
              <input type="number" name="phone" 
              onChange={handleChange} placeholder="Contact" 
              value={depData.phone} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="blood_group" 
              onChange={handleChange} placeholder="Blood Group" 
              value={depData.blood_group} className="form-control" />
            </div>

            <div className="form-group">
              <input type="date" name="date_of_birth" 
              onChange={handleChange} 
              value={depData.date_of_birth} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="weight" 
              onChange={handleChange} placeholder="Weight" 
              value={depData.weight} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="height" 
              onChange={handleChange} placeholder="Height" 
              value={depData.height} className="form-control" />
            </div>

            <div className="d-flex mt-4 justify-content-around">
              <button className="btn btn-outline-success">Submit</button>
              <Link to="/profile"><button className="btn btn-outline-danger">Cancel</button></Link>
            </div>
          </form>
        }
          </div>
    )
}