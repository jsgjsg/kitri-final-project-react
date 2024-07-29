import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [test, setTest] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8080/test")
      .then(response => {
        console.log(response);
        console.log("Data: ", response.data);
        setTest(response.data[0]);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }, []);
  
  return (
    <div>
      <div>테스트~</div>
      {test && (
        <div>
          <div>id: {test.id}</div>
          <div>testcol1: {test.testcol1}</div>
          <div>testcol2: {test.testcol2}</div>
          <div>testcol3: {test.testcol3}</div>
        </div>
      )}
    </div>
  );
}

export default Test;