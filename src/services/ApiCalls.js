const axios = require('axios');


const instance = axios.create({
    baseURL: 'https://api.dev.ada.sireto.io',
    headers: {
        'Access-Control-Allow-Origin': true,
        //"X-Requested-With": "XMLHttpRequest"
    }
  });


  export default instance;