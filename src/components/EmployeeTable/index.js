import React, { Component } from "react";
import axios from "axios";
import "./style.css";

class EmployeeTable extends Component {
  
  state = { }

  componentDidMount = () => {
    axios.get('https://randomuser.me/api/?inc=name,email,dob,phone,picture&results=50')
      .then(function (response) {
        
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
        {this.state.employees.map(employee => {
          <TableRow
            name={employee.name}
            email={employee.email}
            dob={employee.dob}
            phone={employee.phone}
            picture={employee.picture}
          />
        })}

        <pre>Check console </pre>
      </div>
      
      
    )
    
  }

}

export default EmployeeTable;
