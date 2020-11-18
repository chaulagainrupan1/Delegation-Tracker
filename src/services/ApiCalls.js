const axios = require('axios');


const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.dev.ada.sireto.io',
    headers: {
        'Access-Control-Allow-Origin': true,
    }
  });


  export default instance;