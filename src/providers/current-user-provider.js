import React from 'react';
import {Constant} from '../constants/api_constants';
import {CurrentUserContext} from '../context/user-context';

export const CurrentUserProvider = ({children}) => {
    let token = localStorage.getItem(Constant.AUTH_TOKEN);
  
    const [state, setState] = React.useState({
      isLoading: false,
      isLoggedIn: token ? true : false, 
      currentUser: token  // We will fix this (if needed)
    })
  
    return(
      <CurrentUserContext.Provider value={[state, setState]}>
        {children}
      </CurrentUserContext.Provider>
    )
}
  