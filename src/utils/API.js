import axios from "axios";

const API = {
  getEmployees: function() {
    return axios.get('https://randomuser.me/api/?inc=name,email,dob,phone,picture,login&nat=US&results=50');
  }
}

export default API;