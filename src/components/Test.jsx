import axios from "axios";

const Test = () => {

  let test;

  axios.get("127.0.0.1:8080/test")
    .then(response => {
      console.log(response);
      console.log("Data: ", response.data);
      test = response.data;
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  
  return (
    <div>
      <div>테스트~</div>
      <div>{test}</div>
    </div>
  )
}

export default Test;