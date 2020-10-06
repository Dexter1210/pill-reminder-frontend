import React from 'react';
import useFetch from '../hooks/use-fetch';
import {Constant} from '../constants/api_constants';
import {CurrentUserContext} from '../context/user-context';

export default function CurrentUserChecker({children}) {
    const token = localStorage.getItem(Constant.AUTH_TOKEN);
    const [CurrentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    const {response, doFetch} = useFetch("http://localhost:3001/sessions/user");
    
  
    React.useEffect(() => {
      if (!token) {
        setCurrentUserState(state => ({
          ...state,
          isLoggedIn: false
        }))
        return; 
      }
      doFetch();
  
      setCurrentUserState(state => ({
        ...state,
        isLoading: true
      }));
    },[setCurrentUserState, token]);
    
    React.useEffect(() => {
      if (!response) {
        return;
      }
      
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: response
      }))
      
    }, [response, setCurrentUserState]);
    
    return children;
}