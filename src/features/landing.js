import React from 'react';
import {CurrentUserContext} from '../context/user-context';
import useFetch from '../hooks/use-fetch';
import Login from './login';
import MedicalForm from './medical-form';
import {Link} from 'react-router-dom';
export default function Landing() {
  const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
  const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3001/medical_histories.json`);


  const [history, setHistory] = React.useState([]);

  const [formData, setFormData] = React.useState({
   illness: "",
   drname:"",
   medicine:"",
   startdate:"",
   enddate:"",
   dosage_amount:"",
   dosage_frequency:"",
   dosage_time:"",
   email_notify:"",
   user_id:"",
   dependent_id:""

  });

  React.useEffect(() => {
    let data = [];
    // data.push({
    //   illness: "Cough",
    //   drname:"Dr Ompal",
    //   medicine:"Vicks Action 500",
    //   startdate:"2020-09-22",
    //   enddate:"2020-10-20",
    //   dosage_amount:"2 tbsp",
    //   dosage_frequency:"3 times a day",
    //   dosage_time:"variable",
    //   email_notify:"yes",
    //   // user_id:'${currentUserState.id}',
    //    user_id:1,
    //   dependent_id:"1"
    // });

    // data.push({
    //   illness: "Pneumonia",
    //   drname:"Dr Ompal",
    //   medicine:"Vicks Action 500",
    //   startdate:"2020-09-22",
    //   enddate:"2020-10-20",
    //   dosage_amount:"2 tbsp",
    //   dosage_frequency:"3 times a day",
    //   dosage_time:"variable",
    //   email_notify:"no",
    //    user_id:"1"
      
    // });

    // setHistory([...data])

  },[])

  React.useEffect(() => {
    doFetch({
      method: "get"
    })
  },[])
  
  React.useEffect(() => {
    console.log(response);
  }, [response])

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
        medical_history:{
        illness: formData.illness,
        drname:formData.drname,
        medicine:formData.medicine,
       startdate:formData.startdate,
        enddate:formData.enddate,
        dosage_amount:formData.dosage_amount,
        dosage_frequency:formData.dosage_frequency,
        dosage_time:formData.dosage_time,
        email_notify:formData.email_notify,
        user_id:formData.user_id,
        dependent_id:formData.dependent_id
        }
        
      })
    })   

    setHistory([...history, formData]);
  }
  
  return (
    <div>
      <h1>Welcome </h1>
      </div>
  )
     

}
      