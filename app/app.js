import { getCars, getAllMakers, getAllModelsByMaker, getAllCarsByModel, getAllCarsByMaker, addCar, deleteCar, getCarById, editCar, getMostExpensive } from "./repository.js";

import { byMaker, byMinMileage, byMaxMileage, byModel, byMinYear, byMaxYear, byMinPrice, byMaxPrice, intersection, filterAll } from "./utile.js";

import express, { json, request, response } from "express";

import {throws} from "assert";

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



// an async function called handler,which will mediate the middleware errors
function asyncHandler(callback){

    // function to return the callback 
    return async (request,response,next)=>{

        try {
            // await the callback
            await callback(request,response,next);
        } catch (error) {
            // catch the error and send it
            next(error)
        }

    }

}

// 1st logger
app.use((req,res,next)=>{

    // if an error comes in next, error will be passed next
    // if landed here, landed from next, because no path was not reached
    console.log("1st logger")
    next();
    
});



// GET all data 

app.get('/all-cars', asyncHandler (async(request, response) => {
    
    const cars = await getCars();
    
    return response.status(200).json(cars)
})
);

app.get('/all-cars/filtered', asyncHandler(async (req, res) => {

    let data = await getCars();
    data = await data.cars;

    console.log(req.query)
    return res.status(200).json(filterAll(data,req.query));

}))


app.get('/all-cars/most-expensive',asyncHandler(async (req,res)=>{

    let data = await getMostExpensive();
    

    return res.status(200).json(data);


}))




app.get('/all-cars/all-makers', asyncHandler(async (request, response) => {

    // console.log("test")
    const allMakers = await getAllMakers();
    // console.log("trece de await?")

    return response.status(200).json(allMakers);
}))


app.get('/all-cars/models-by-maker/maker=:maker', asyncHandler(async (request, response) => {


    let maker = request.params.maker;
    // console.log(maker)
    const allModelsByMaker = await getAllModelsByMaker(maker);
    // console.log(allModelsByMaker)
    return response.status(200).json(allModelsByMaker)



}))



app.get('/all-cars/cars-by-model/model=:model', asyncHandler(async (request, response) => {


    
        let model = request.params.model;
        // console.log(model)
        const allCarsByModel = await getAllCarsByModel(model);
        return response.status(200).json(allCarsByModel)

}))


app.get('/all-cars/cars-by-maker/maker=:maker', asyncHandler(async (request, response) => {

    
        let maker = request.params.maker;

        const allCarsByMaker = await getAllCarsByMaker(maker);
        return    response.status(200).json(allCarsByMaker)



})
)





app.get('/all-cars/car-by-id/id=:id', asyncHandler(async (request, response) => {


    
        let id = request.params.id;

        let masina = await getCarById(id);
    
        
        response.status(200).json(masina);
    


})
)

app.post('/new-car', asyncHandler(async (request, response) => {


    
        let car = {

            maker: request.body.maker,
            model: request.body.model,
            year: request.body.year,
            price: request.body.price,
            mileage: request.body.mileage
    
        }
    
        await addCar(car);
    
        // json response, of a JSON stringified object
        response.status(201).json(car);

})
)


app.put('/edit-car/car-id=:id', asyncHandler(async (request, response) => {



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
    return response.status(201).json(JSON.stringify(car));

})
)

app.delete('/all-cars/delete/id=:id', asyncHandler(async (request, response) => {


        let id = request.params.id;
        let car=await deleteCar(id)

        return response.status(200).json(`Successfully deleted`);
        
        
})
)


// timpul parcurs de la request la response, tot ce se intampla intre a primi un request, si a trimite un raspuns
app.use((req,res,next)=>{

    // if an error comes in next, error will be passed next
    // if landed here, landed from next, because no path was not reached
    const error = new Error("Not found")
    error.status=404;
    next(error);
    
});



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


