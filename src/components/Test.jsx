import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Test = () => {

  const [test, setTest] = new useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/test")
    .then(response => {
      console.log(response);
      console.log("Data: ", response.data);
      setTest(response.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  }, []);
  
  
  return (
    <div>
      <div>테스트~</div>
      <div>{test}</div>
    </div>
  )
}

export default Test;