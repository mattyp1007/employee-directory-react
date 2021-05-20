import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API"

class EmployeeTable extends Component {
  
  state = { employees: [] };

  updateEmployees = (data) => {
    this.setState({ employees: data });
    console.log(this.state.employees);
  }

  componentDidMount = () => {
    API.getEmployees()
      .then(res => this.updateEmployees(res.data.results))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        {/* {this.state.employees.map(employee => {
          <TableRow
            name={employee.name}
            email={employee.email}
            dob={employee.dob}
            phone={employee.phone}
            picture={employee.picture}
          />
        })} */}

        <pre>Check console </pre>
      </div>
      
      
    )
    
  }

}

export default EmployeeTable;
