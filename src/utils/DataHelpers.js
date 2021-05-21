const DataHelpers = {
  filterEmployees: function(data, query) {
    const qry = query.toLowerCase();
    return data.filter(person => {
      let first = person.firstName.toLowerCase();
      let last = person.lastName.toLowerCase();
      return first.startsWith(qry) || last.startsWith(qry);
    })
  }
}

export default DataHelpers;