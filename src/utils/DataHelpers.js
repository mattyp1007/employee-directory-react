const DataHelpers = {
  filterEmployees: function(data, query) {
    const qry = query.toLowerCase();
    return data.filter(person => {
      let first = person.firstName.toLowerCase();
      let last = person.lastName.toLowerCase();
      return first.startsWith(qry) || last.startsWith(qry);
    })
  },

  sortByName: function(data, order) {
    if(order === "asc"){
      return data.sort((a,b) => (a.lastName > b.lastName) ? 1 : -1)
    } else {
      return data.sort((a,b) => (a.lastName > b.lastName) ? -1 : 1)
    }
  },

  sortByDob: function(data, order) {
    if(order === "asc"){
      return data.sort((a,b) => (a.dob > b.dob) ? 1 : -1)
    } else {
      return data.sort((a,b) => (a.dob > b.dob) ? -1 : 1)
    }
  }
}

export default DataHelpers;