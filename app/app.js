import { getCars, getAllMakers, getAllModelsByMaker, getAllCarsByModel, getAllCarsByMaker, addCar, deleteCar, getCarById, editCar, getMostExpensive } from "./repository.js";

import { byMaker, byMinMileage, byMaxMileage, byModel, byMinYear, byMaxYear, byMinPrice, byMaxPrice, intersection, filterAll } from "./utile.js";

import express, { json, request, response } from "express";

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




app.use((req,res,next)=>{


    console.log("1st logger");


    next();
    
});

// GET all data 

app.get('/all-cars', async (request, response) => {
    // console.log("ajunge?")
    const cars = await getCars();
    // console.log("test")

    response.json(cars)


})


app.get('/all-cars/filtered', async (req, res) => {

    let data = await getCars();
    data = await data.cars;

    console.log(req.query)
    res.json(filterAll(data,req.query));

})


app.get('/all-cars/most-expensive',async (req,res)=>{

    let data = await getMostExpensive();
    

    res.json(data);


})




app.get('/all-cars/all-makers', async (request, response) => {

    // console.log("test")
    const allMakers = await getAllMakers();
    // console.log("trece de await?")

    response.json(allMakers);
})


app.get('/all-cars/models-by-maker/maker=:maker', async (request, response) => {


    let maker = request.params.maker;
    // console.log(maker)
    let allModelsByMaker = await getAllModelsByMaker(maker);
    // console.log(allModelsByMaker)
    response.json(allModelsByMaker)



})



app.get('/all-cars/cars-by-model/model=:model', async (request, response,next) => {


    try {
        let model = request.params.model;
        // console.log(model)
        let allCarsByModel = await getAllCarsByModel(model);
        response.json(allCarsByModel)
    
    } catch (error) {
        next(error);
    }


})


app.get('/all-cars/cars-by-maker/maker=:maker', async (request, response,next) => {

    try {
        let maker = request.params.maker;

        let allCarsByMaker = await getAllCarsByMaker(maker);
        response.status(210).json(allCarsByMaker)
    } catch (error) {
        next(error)
    }


})






app.get('/all-cars/car-by-id/id=:id', async (request, response,next) => {


    try {
        let id = request.params.id;

        let masina = await getCarById(id);
    
        // console.log("aici aici")
        response.status(209).json(masina);
    
    } catch (error) {
        next(error)
    }


  


})


app.post('/new-car', async (request, response,next) => {


    try {
        let car = {

            maker: request.body.maker,
            model: request.body.model,
            year: request.body.year,
            price: request.body.price,
            mileage: request.body.mileage
    
        }
    
        await addCar(car);
    
        // json response, of a JSON stringified object
        response.status(208).json(JSON.stringify(car));
    } catch (error) {
        next(error)
    }


    

})

app.put('/edit-car/car-id=:id', async (request, response,next) => {


    try {
        

         // cerem id din request
    let id = request.params.id
    // console.log(id)

    // console.log(request.params.id)
    // definim un obiect, pentru care cerem elemente scrise in body , pentru a popula obiectul
    let car = {

        maker: request.body.maker,
        model: request.body.model,
        year: request.body.year,
        price: request.body.price,
        mileage: request.body.mileage

    }

    // console.log(car)

    // editam obiectul, trimitem masina noua si un id, pentru care se va inlocui masina
    await editCar(car, id);


    // json response, of a JSON stringified object
    return response.status(204).json(JSON.stringify(car));



    } catch (error) {
        next(error)
    }

})


app.delete('/all-cars/delete/id=:id', async (request, response,next) => {

    try{

        let id = request.params.id;
        let car=await deleteCar(id)
    
        response.status(205).json(car);
        
        

    }catch(err){

        // acest next trimite catre primul middle-ware care are err in app.use()
        next(err);

    }

})



// timpul parcurs de la request la response, tot ce se intampla intre a primi un request, si a trimite un raspuns


// prindem eroarea 
// aterizam aici pentru ca path nu prinde nimic 
// nu mai apare eroarea clasica, customizam noi mai jos 

app.use((req,res,next)=>{


    const error= new Error("Not found");

    error.status=404;


    next(error);


}
)


// 4 parametri e standard pentru management erori 
// customizam eroarea pentru client
app.use((err,req,res,next)=>{



    res.status(err.status || 500);

    res.json({

        error:{

            message:err.message
        }
    })
})

// the port through which the node app can be listened
app.listen(4444, () => {

    console.log("Server Started")
})


