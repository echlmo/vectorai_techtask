import {useEffect, useState} from 'react';

import axios from 'axios';

/*
* Custom post hook for API calls using Axios
*/

export const usePost = (url, options) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
       const runPost = async () => {
           setIsLoading(true);
           try {
               const result = await axios.post(url, options);
               setResponse(result.data)
               setIsLoading(false);
           } catch (error) {
               setError(error)
           }
       }
       runPost()
           .then(r => console.log(r));
    });

    return {response, error, isLoading}
}