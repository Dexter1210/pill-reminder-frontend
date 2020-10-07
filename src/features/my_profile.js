import React from 'react';
import { Link } from 'react-router-dom';
import { Constant } from '../constants/api_constants';
import useFetch from '../hooks/use-fetch';

export default function MyProfile () {
    let id = localStorage.getItem(Constant.USER_ID);
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:3001/users/${id}.json`,);
    const [edit, setEdit] = React.useState(false);
    React.useEffect(() => {
        doFetch({
        method: "get"
        })
    },[])

    React.useEffect(() => {
        console.log(response);
        if(response)
        setUserData(response)
      },[response])

    const [userData, setUserData] = React.useState({
        full_name: "",
        email: "",
        phone: "",
        blood_group:"",
        date_of_birth: "",
        weight: "",
        height: "",
        country:""
      });

      const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
          })
      }

      const handleUserSubmit = (e) => {
        e.preventDefault();
        alert("User Data Modified");
        doFetch({
            method: "put",
            body: JSON.stringify({
                user: {
                full_name: userData.full_name,
                email: userData.email,
                phone: userData.phone,
                date_of_birth: userData.date_of_birth,
                weight: userData.weight,
                blood_group: userData.blood_group,
                height: userData.height,
                country:userData.country
                }
              }
            )
          })
      }

    return ( 
        <div className="d-flex justify-content-start">
          <form onSubmit={handleUserSubmit}>
            <h6>{userData.full_name}'s Profile</h6>
            <div className="form-group">
              <input type="text" name="full_name" 
              onChange={handleChange} placeholder="Name" 
              value={userData.full_name} className="form-control" />
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={userData.email} className="form-control" />
            </div>

            <div className="form-group">
              <input type="number" name="phone" 
              onChange={handleChange} placeholder="Contact" 
              value={userData.phone} className="form-control" />
            </div>

            <div className="form-group">
              <input type="date" name="date_of_birth" 
              onChange={handleChange} 
              value={userData.date_of_birth} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="blood_group" placeholder="Enter Blood group"
              onChange={handleChange} 
              value={userData.blood_group} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="country" placeholder="Enter Country"
              onChange={handleChange}
              value={userData.country} className="form-control" />
            </div>


            <div className="form-group">
              <input type="text" name="weight" placeholder="Enter Weight"
              onChange={handleChange}
              value={userData.weight} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="height" placeholder="Enter Height"
              onChange={handleChange}
              value={userData.height} className="form-control" />
            </div>

            <div className="d-flex mt-4 justify-content-around">
            <button className="btn btn-outline-success">Save</button>
              
            </div>
          </form>
        </div>
    )
}