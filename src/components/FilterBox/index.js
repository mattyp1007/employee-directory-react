import React, { Component } from "react";
import "./style.css";

class FilterBox extends Component {
  state = {
    query: ""
  }

  handleInputChange = event => {
    let val = event.target.value;
    this.setState({ query: val });
  }

  render() {
    return (
      <div>
        <label>
          Filter by first or last name:
          <input id="filter" type="text" onChange={this.handleInputChange} value={this.state.query}></input>
        </label>
        
        <p>{this.state.query}</p>
      </div>
    )
  }

}

export default FilterBox;