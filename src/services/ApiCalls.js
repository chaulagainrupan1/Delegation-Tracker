const axios = require('axios');


const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://(API link here)',
    headers: {
        'Access-Control-Allow-Origin': true,
    }
  });


  export default instance;