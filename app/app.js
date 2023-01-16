import { getCars } from "./repository.js";

import express,{json} from "express";

import cors from "cors";

// express server or node app
const app = express();

// which returns json , easy to consume
app.use(express.json());


// middle-ware
// cors allows to send requests from other origins to the back-end
// npm install cors 
// all CORS (routes) enabled
app.use(cors());


// GET all data 

app.get('/all-cars',async (request,response)=>{
    console.log("ajunge?")
    const cars = await getCars();
    console.log("test")
    
    response.json(cars)


})



// the port through which the node app can be listened
app.listen(3030,()=>{

    console.log("listen")
})


// testing 