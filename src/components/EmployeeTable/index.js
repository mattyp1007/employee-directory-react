import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API"
import DataHelpers from "../../utils/DataHelpers"

class EmployeeTable extends Component {
  
  state = { 
    employees: [], 
    query: "", 
    filteredEmployees: [], 
    currentSort: {
      column: "",
      order: ""
    }
  };

  initEmployees = (data) => {
    // construct the array of objects with only the data we need
    const finalData = data.map(employee => {
      // const date = new Date(employee.dob.date);
      // const formattedDate = date.toLocaleDateString();
      return (
        {
          firstName: employee.name.first,
          lastName: employee.name.last,
          email: employee.email,
          phone: employee.phone,
          dob: employee.dob.date,
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
    this.setState({ filteredEmployees: filtered });

  }

  handleColumnClick = event => {
    let prevSortCol = this.state.currentSort.column;
    let prevSortOrder = this.state.currentSort.order;
    let newOrder = "asc";
    let sorted = [];

    if(event.target.dataset.value === "Name"){
      if(prevSortCol === "Name" && prevSortOrder === "asc"){
        newOrder = "desc";
      }

      if(this.state.query){
        sorted = DataHelpers.sortByName(this.state.filteredEmployees, newOrder);
      } else {
        sorted = DataHelpers.sortByName(this.state.employees, newOrder);
      }
      

    } else {
      if(prevSortCol === "DoB" && prevSortOrder === "asc"){
        newOrder = "desc";
      }

      if(this.state.query){
        sorted = DataHelpers.sortByDob(this.state.filteredEmployees, newOrder);
      } else {
        sorted = DataHelpers.sortByDob(this.state.employees, newOrder)
      }
    }
    if(this.state.query){
      this.setState({ 
        filteredEmployees: sorted, 
        currentSort: {
          column: event.target.dataset.value,
          order: newOrder
        }
      });
    } else {
      this.setState({ 
        employees: sorted, 
        currentSort: {
          column: event.target.dataset.value,
          order: newOrder
        }
      });
    }
    

    
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
          <td>{new Date(employee.dob).toLocaleDateString()}</td>
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
        <p>Click name or date of birth column to sort</p>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th onClick={this.handleColumnClick} data-value="Name">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th onClick={this.handleColumnClick} data-value="DoB">Date of Birth</th>
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
