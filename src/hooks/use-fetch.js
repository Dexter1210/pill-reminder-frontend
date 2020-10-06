import { end } from '@popperjs/core';
import React from 'react';
import {Constant} from '../constants/api_constants';

export default function useFetch(url) {
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [response, setResponse] = React.useState(null);
    const [options, setOptions] = React.useState({});
  
    const doFetch = React.useCallback((options={}) => {
      
      setIsLoading(true);
      setOptions(options);
    },[]);
  
    React.useEffect(() => {
      if (!isLoading) return;
  
      async function fetchData() {
        try {
  
          let token = localStorage.getItem(Constant.AUTH_TOKEN);
  
          const response = await fetch(url, {
            ...options,
            mode: "cors",
            headers: {
              "Content-type": "application/json; charset=UTf-8",
              "Access-Control-Allow-Origin":"*",
              "Authorization": token ? `Token ${token}` : ""
            }
          });
          const data = await response.json();
          setIsLoading(false);
          setResponse(data);
          setError(null);
        } catch (e) {
          setError({
            error: e.message
          })
        }
      }
      fetchData();
  
    }, [isLoading, url, options,doFetch])
  
    return {isLoading, response, error, doFetch};
}