import { getCars,getAllMakers,getAllModelsByMaker,getAllCarsByModel,getAllCarsByMaker,addCar,deleteCar, getCarById } from "./repository.js";

import express,{json, request, response} from "express";

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
    // console.log("ajunge?")
    const cars = await getCars();
    // console.log("test")
    
    response.json(cars)


})


app.get('/all-cars/all-makers',async(request,response)=>{

    // console.log("test")
    const allMakers = await getAllMakers();
    // console.log("trece de await?")

    response.json(allMakers);
})


app.get('/all-cars/models-by-maker/maker=:maker',async(request,response)=>{

    
    let maker = request.params.maker;
    // console.log(maker)
    let allModelsByMaker = await getAllModelsByMaker(maker);  
    // console.log(allModelsByMaker)
    response.json(allModelsByMaker)



})



app.get('/all-cars/cars-by-model/model=:model',async(request,response)=>{

    let model = request.params.model;
    // console.log(model)
    let allCarsByModel= await  getAllCarsByModel(model);
    response.json(allCarsByModel)


})


app.get('/all-cars/cars-by-maker/maker=:maker',async(request,response)=>{

    let maker = request.params.maker;

    let allCarsByMaker=await getAllCarsByMaker(maker);
    response.json(allCarsByMaker)

})

app.get('/all-cars/car-by-id/id=:id',async(request,response)=>{

    let id = request.params.id;

    let masina = await getCarById(id);

    // console.log("aici aici")
    response.json(masina);



})


app.post('/new-car',async(request,response)=>{

    let car = {

        maker: request.body.maker,
        model: request.body.model,
        year: request.body.year,
        price: request.body.price,
        mileage: request.body.mileage

    }

    await addCar(car);

    // json response, of a JSON stringified object
    response.json(JSON.stringify(car));

})


app.delete('/all-cars/delete/id=:id', async (request,response)=>{

    let id = request.params.id;
    await deleteCar(id)

    response.json("ok");

})


// the port through which the node app can be listened
app.listen(3030,()=>{

    console.log("listen")
})
