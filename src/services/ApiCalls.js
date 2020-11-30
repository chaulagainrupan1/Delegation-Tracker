const axios = require('axios');


const instance = axios.create({
    baseURL: '[Enter_your_Base_URL],
    headers: {
        'Access-Control-Allow-Origin': true,
        //"X-Requested-With": "XMLHttpRequest"
    }
  });


  export default instance;