import React from 'react';
import {Link} from 'react-router-dom';
import { CurrentUserContext } from '../context/user-context';
import useFetch from '../hooks/use-fetch';
import MedicalForm from './medical-form';
import {Constant} from '../constants/api_constants';

export default function MedicalHistory() {
  const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
  const id=localStorage.getItem(Constant.USER_ID);
  const [show, setShow] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [view, toggleView] = React.useState(false);
  const [delid, setDelid] = React.useState(0);
  const {isLoading, response, error, doFetch} = useFetch("http://localhost:3001/medical_histories");
  const {isLoading: isloading2, response: response2 , error: error2, doFetch: doFetch2} = useFetch(`http://localhost:3001/medical_histories/${delid}.json`);

  const [formData, setFormData] = React.useState({
    id: "",
    relationship: "",
    illness: "",
    drname: "",
    medicine: "",
    startdate: "",
    enddate: "",
    dosage_amount: "",
    dosage_frequency: "",
    dosage_time: "",
    email_notify: "",
    user_id: id,
    dependant_id: null
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));
    console.log(formData.user_id);
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
          user_id: id,
          dependant_id: formData.dependant_id
      }})
    })

    setHistory([...history, formData]);
    setShow(prev => !prev)
  }

  const handleClick = () => {
    toggleView(true)
    setShow(p => !p)
  }
  const handleDelete = (ID) => {
    setDelid(ID);
    console.log(ID);
    console.log(delid);
    alert("Item Deleted!");
    doFetch2({
      method: "delete"
    });
    console.log(ID);
    console.log(delid);
    alert("Item Deleted!");
    doFetch2({
      method: "delete"
    });
  }

  const handleForm =  () => {
    toggleView(false)
  }

    return (
      <div>
        Medical History
        <div>
        <button onClick={handleForm}>View Medical History</button>
        <button onClick={handleClick}>Add Medical History</button>
        </div>
        {!view &&
        <MedicalForm />
        }
        {view &&
        <div className="table">
          <form onSubmit={handleSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Relationship</th>
                <th scope="col">Illness</th>
                <th scope="col">Dr. Name</th>
                <th scope="col">Medicines</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Dosage Amount</th>
                <th scope="col">Dosage Frequency</th>
                <th scope="col">Dosage Time</th>
                <th scope="col">Email Notification</th>
                
              </tr>
            </thead>
            <tbody>
              {show && 
              <tr>
                <td>
                <div className="form-group">
                    <select value={formData.relation} onChange={handleChange} name="relationship" className="form-control">
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Mother_In_Law">Mother In Law</option>
                        <option value="Father_In_Law">Father In Law</option>
                    </select>
                </div>
                </td>
                <td>
                  <div className="form-group">
                  <input type="text"  name="illness"  onChange={handleChange} 
                  placeholder="Illness" value={formData.illness}/>
                  </div>
                  
                </td>
                <td>
                 <div className="form-group">
                  <input type="text" name="drname" onChange={handleChange} 
                  placeholder="Dr. Name" value={formData.drname}/>
                  </div>
                </td>
                <td>
                <div className="form-group">
                  <input type="text" name="medicine" onChange={handleChange} 
                  placeholder="Medicine" value={formData.medicine}/>
                  </div>
                </td>
                <td>
                <div className="form-group">
                  <input type="date" name="startdate" onChange={handleChange} 
                   value={formData.startdate}/>
                   </div>
                </td>
                <td>
                <div className="form-group">
                  <input type="date" name="enddate" onChange={handleChange} 
                   value={formData.enddate}/>
                   </div>
                </td>
                <td>
                <div className="form-group">
                  <input type="text" name="dosage_amount" onChange={handleChange} 
                  placeholder="Dosage Amount" value={formData.dosage_amount}/>
                  </div>
                </td>
                <td>
                <div className="form-group">
                  <input type="text" name="dosage_frequency" onChange={handleChange} 
                  placeholder="Dosage Frequency" value={formData.dosage_frequency}/>
                  </div>
                </td>
                <td>
                <div className="form-group">
                  <input type="time" name="dosage_time" onChange={handleChange} 
                  value={formData.dosage_time}/>
                  </div>
                </td>
                <td>
                  <div className="form-group">
                    <input type="text" name="email_notify" onChange={handleChange} 
                    placeholder ="Notification" value={formData.email_notify}/>
                  </div>
                </td>
              </tr>
              }
              {history.map(h => {
                return (
                  <tr key = {h.id}>
                    <td>{h.relationship}</td>
                    <td>{h.illness}</td>
                    <td>{h.drname}</td>
                    <td>{h.medicine}</td>
                    <td>{h.startdate}</td>
                    <td>{h.enddate}</td>
                    <td>{h.dosage_amount}</td>
                    <td>{h.dosage_frequency}</td>
                    <td>{h.dosage_time}</td>
                    <td><div>{h.email_notify &&
                        <i className="fas fa-toggle-on"></i>
                    }
                    {!h.email_notify &&
                        <i className="fas fa-toggle-off"></i>
                    }</div></td>
                    <td><div><button type="button" className="btn btn-primary" onClick={() => handleDelete(h.id)}>Remove</button></div></td>
                  </tr>
              )})}
            </tbody>

          </table>
          <div className = "d-flex justify-content-around">
          <button>Save</button>
          <Link to="/">Cancel</Link>
          </div>
        </form>
        </div>
      }
      </div>
    )
}
