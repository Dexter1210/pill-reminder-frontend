import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';
import { Constant } from '../constants/api_constants';
export default function AddMedicalHistory() {
    const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/medical_histories");
    let userID=localStorage.getItem(Constant.USER_ID);
    var dependent=[];
    const [formData, setFormData] = React.useState({
      illness: "",
      drname: "",
      medicine: "",
      startdate: "",
      enddate: "",
      dosage_amount: "",
      dosage_frequency: "",
      dosage_time: "",
      email_notify: false,
      user_id: userID,
      dependent_id:""

    });
  

    {
        const {response, doFetch} = useFetch(`http://localhost:3001/dependents/${userID}/dependents`);
        React.useEffect(() => {
          doFetch({
            method: "get"
          })
      
        },[])
            {response && response.map(r=>{
            return(
              dependent.push(r)
            ) 
            })}
          }

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(JSON.stringify(formData));
      doFetch({
        method: "post",
        body: JSON.stringify({
          medical_history: {
            illness: formData.illness,
            drname: formData.drname,
            medicine: formData.medicine,
            startdate: formData.startdate,
            enddate: formData.enddate,
            dosage_amount: formData.dosage_amount,
            dosage_frequency: formData.dosage_frequency,
            dosage_time: formData.dosage_time,
            email_notify: formData.email_notify,
            user_id: formData.user_id,
            dependent_id: formData.dependent_id
        }})
      })
    }

    return(
        <div className="d-flex justify-content-around">
            <form onSubmit={handleSubmit}>
                <h6>Add Medical History here..</h6>
                <div className="form-group">
                <select  name="dependent_id" value={formData.dependent_id}  className="form-control" placeholder="Select Relation" onChange={handleChange}>
                <option label="Select Relation Here"></option>
                <option value="Self">Self</option>
                {dependent && dependent.map(d => {
                return (
                <option value={d.relationship=="Self"? 0 : d.id} key={d.id}>{d.relationship}</option>
                )
                })}
                </select>
                </div>

                <div className="form-group">
                    <input type="text"  name="illness"  onChange={handleChange} 
                placeholder="Illness" value={formData.illness} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="drname" onChange={handleChange} 
                placeholder="Dr. Name" value={formData.drname} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="medicine" onChange={handleChange} 
                placeholder="Medicine" value={formData.medicine} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="date" name="startdate" onChange={handleChange} 
                    value={formData.startdate} className="form-control"/>
                </div>
              

                <div className="form-group">
                    <input type="date" name="enddate" onChange={handleChange} 
                    value={formData.enddate} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="dosage_amount" onChange={handleChange} 
                 placeholder="Dosage Amount" value={formData.dosage_amount} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="dosage_frequency" onChange={handleChange} 
                    placeholder="Dosage Frequency" value={formData.dosage_frequency} className="form-control"/>
                </div>

                <div className="form-group">
                    <input type="time" name="dosage_time" onChange={handleChange}
                    value={formData.dosage_time} className="form-control"/>
                </div>

                <div className="form-group">
                    <select value={formData.email_notify} name="eNotify" onChange={handleChange} className="form-control">
                        <option value='true'>Enable E-Notification</option>
                        <option value='false'>Disable E-Notification</option>
                    </select>
                </div>

                <div className = "d-flex justify-content-around">
                    <button className="btn btn-success">Save</button>
                    <Link to="/medical-history"><button className="btn btn-danger">Go Back</button></Link>
                </div>
            </form>
        </div>
    )
}