const axios = require('axios')

var fetcher = async (query, variables) => {
    try{
        // var result = await fetch(process.env.DB_URL,{method: 'POST',headers: {'content-type':'application/json', 'x-hasura-admin-secret':process.env.DB_PASS},body: JSON.stringify({query:query, variables:variables})}).then((response) => response.json()).then((user) => { return user;});
        let result = await axios.post(process.env.DB_URL, {query: query, variables: variables}, {headers: {'content-type':'application/json', 'x-hasura-admin-secret':process.env.DB_PASS}}).then((response) => {return response.data});
        return result;
    }catch(e){
        return {
            errors: [{
                messsage: e.message
            }]
        }
    }
}

module.exports = {fetcher}