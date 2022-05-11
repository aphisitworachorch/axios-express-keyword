const express = require('express');
const app = express()
const cors = require('express-cors');
const res = require('express/lib/response');
const axios = require('axios').default;
const _ = require('lodash');

app.use(cors())

/**
 * API Happended Here !
 */

/**
 * ANTI-Mess ANTI-Mess ANTI-Mess
 * Functions happended here !
 */
async function getData(filter) {
    /**
     * Asynchronized Axios 🚀
     * HTTP Clients
     * 
     * GET from https://jsonplaceholder.typicode.com/post
     * with Headers 'Content-Type':'application/json'
     * 
     * (then) for Successful Response
     * (catch) for Error Response
     */
    return await axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
        const data = response.data;

        if (filter != null || filter != undefined) {
            /**
             * Filtering by Lodash
             * -> use Customized function
             */
            return _.filter(data, (value) => {
                /**
                 * Check Condition
                 * If Value.Title converted to lowercase and use included case from filter with lowercase Is Matched ?
                 * If Matched -> Return
                 */
                return value.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) || value.body.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
            })
        }
    }).catch((error) => error);
}

/**
 * GET : /api/trips
 * Query Parameters 
 * :search (example ?keywords=restaurant)
 * :lang (example ?lang=TH || ?lang=EN)
 */
app.get('/api/trips',async (request,response) => {

    let responseData = {
        message: null,
        result: null,
        status: 200,
    }

    /**
     * Searching Value
     * request.query = Receive Query Parameters from Request
     * 
     * 1. request = Request Receiving from Web Framework
     * 2. query = Type of Data in Request
     * 
     * eg: ?keywords=mountain || ?keywords=skyscraper
     */
    const searchValue = request.query.keywords;

    if (searchValue != null || searchValue != undefined) {
        responseData.status = 200;
        responseData.message = "Successful";
        responseData.result = await getData(searchValue);
        response.json(responseData);
    }else{
        responseData.status = 400;
        responseData.message = "Bad Request ['Missing Keywords'] !"
        response.json(responseData);
    }
});

/**
 * API End Here !
 */
app.listen(3000,()=>{
    console.log("RUN ON HTTP 3000");
})