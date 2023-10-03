import { useState, useEffect } from "react";
import axios from "axios";
//import { RAPID_API_KEY } from "@env";

const rapidApiKey = "3f8248e26amsh1496769c135d553p1085d0jsn003e26857bc9";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('Could not fetch data')
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  },[])

  const refetch =  () => {
    setIsLoading(true)
    fetchData()
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;