import React, { Component } from "react";
import axios from "axios";
import "./style.css";

class EmployeeTable extends Component {
  
  state = { }

  componentDidMount = () => {
    axios.get('https://randomuser.me/api/?inc=name,email,dob,phone,picture&results=50')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        
        <pre>Check console </pre>
      </div>
      
      
    )
    
  }

}

export default EmployeeTable;
