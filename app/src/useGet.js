import React, {useState, useEffect} from 'react';
import axios from 'axios';

/*
* Custom fetch/get hook for API calls using Axios
*/

export const useGet = (url, options) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const runFetch = async () => {
          setIsLoading(true);
          try {
              const result = await axios.get(url, options)
              setData(result.data)
              setIsLoading(false)
          } catch (error) {
            setError(error);
          }
        };
        runFetch()
            .then(r => console.log(r));
      }, []);

  return { data, error, isLoading };
}