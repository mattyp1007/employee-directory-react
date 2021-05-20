import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API"

class EmployeeTable extends Component {
  
  state = { employees: [] };

  initEmployees = (data) => {
    // construct the array of objects with only the data we need
    const finalData = data.map(employee => (
      {
        firstName: employee.name.first,
        lastName: employee.name.last,
        email: employee.email,
        phone: employee.phone,
        dob: employee.dob.date,
        picture: employee.picture.large
      }
    ));
    // set the state
    this.setState({ employees: finalData });
    console.log(this.state.employees);
  }

  componentDidMount = () => {
    API.getEmployees()
      .then(res => this.initEmployees(res.data.results))
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
