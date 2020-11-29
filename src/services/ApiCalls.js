const axios = require('axios');


const instance = axios.create({
    baseURL: '[Base_URL_here]',
    headers: {
        'Access-Control-Allow-Origin': true,
        //"X-Requested-With": "XMLHttpRequest"
    }
  });


  export default instance;