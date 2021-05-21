import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API"
import DataHelpers from "../../utils/DataHelpers"

class EmployeeTable extends Component {
  
  state = { employees: [], query: "", filteredEmployees: [] };

  initEmployees = (data) => {
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
  }

  componentDidMount = () => {
    API.getEmployees()
      .then(res => this.initEmployees(res.data.results))
      .catch(err => console.log(err))
  }

  handleInputChange = event => {
    let val = event.target.value;
    this.setState({ query: val });
    let filtered = DataHelpers.filterEmployees(this.state.employees, val);
    console.log("FILTER RESULT", filtered);
    this.setState({ filteredEmployees: filtered });

  }

  renderEmployees() {
    let arrayToRender;

    if (this.state.query) {

      arrayToRender = this.state.filteredEmployees;
    } else {
      arrayToRender = this.state.employees;
    }

    return (
      arrayToRender.map(employee => (
        <tr key={employee.id}>
          <td><img src={employee.picture} alt={employee.firstName + " " + employee.lastName}/></td>
          <td>{employee.firstName} {employee.lastName}</td>
          <td>{employee.email}</td>
          <td>{employee.phone}</td>
          <td>{employee.dob}</td>
        </tr>
      ))
    )
  }

  render() {
    return (
      <div>
        <h3>Employee Directory</h3>
        <label>
          Filter by first or last name:
          <input id="filter" type="text" onChange={this.handleInputChange} value={this.state.query}></input>
        </label>

        <table>
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
            {this.renderEmployees()}
          </tbody>
      </table>

        <pre>Check console </pre>
      </div>
      
      
    )
    
  }

}

export default EmployeeTable;
