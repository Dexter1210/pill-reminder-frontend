import React from 'react';
import DepsProfile from './dep_profile';
import MyProfile from './my_profile';

export default function Profile() {

  
    return (
        <div className="d-flex justify-content-around ">
            <div className="d-flex justify-content-start">
                <MyProfile />
            </div>

            <div className="d-flex justify-content-center">
            <DepsProfile />
            </div>
      </div>
    )
}