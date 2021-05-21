import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API"

class EmployeeTable extends Component {
  
  state = { employees: [] };

  initEmployees = (data) => {
    console.log(data);
    // construct the array of objects with only the data we need
    const finalData = data.map(employee => {
      const date = new Date(employee.dob.date);
      const formattedDate = date.toLocaleDateString();
      return (
        {
          firstName: employee.name.first,
          lastName: employee.name.last,
          email: employee.email,
          phone: employee.phone,
          dob: formattedDate,
          picture: employee.picture.large,
          id: employee.login.uuid
        }
      )
    });
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
        <table>
          <caption>Employee Directory</caption>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(employee => (
              <tr key={employee.id}>
                <td><img src={employee.picture} alt={employee.firstName + " " + employee.lastName}/></td>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.dob}</td>
              </tr>
            ))}
          </tbody>
      </table>

        <pre>Check console </pre>
      </div>
      
      
    )
    
  }

}

export default EmployeeTable;
