import fs from "fs";

import path from "path";

export function getCars() {
    return new Promise((response, reject) => {

        // read an indicated file , UTF-8 encoding for language read, with error and data
        fs.readFile(("data.json"), 'utf-8', (err, data) => {

            if (err) {
                reject(err);
            } else {
                // transform the response data to JSON
                const json = JSON.parse(data);
                // responde with a JSON 

                response(json);


            }
        })



    })
}



export async function save(data) {

    return new Promise((resolve, reject) => {

        fs.writeFile(("data.json"), JSON.stringify(data), (err, data) => {

            if (err) {
                reject(err);
            } else {

                resolve();
            }
        })


    })
}


export async function getAllMakers() {

    let data = await getCars();
    data = data.cars;

    let arr = [];

    for (let i = 0; i < data.length; i++) {

        if (arr.includes(data[i].maker) === false) {

            arr.push(data[i].maker)
        }
    }

    arr.sort();
    return arr;

}


export async function getAllModelsByMaker(maker) {


    let data = await getCars();
    data = data.cars;

    let arr = [];

    for (let i = 0; i < data.length; i++) {

        if (data[i].maker == maker) {
            if (arr.includes(data[i].model) === false) {

                arr.push(data[i].model)
            }
        }

    }


    arr.sort();
    // console.log(arr)
    return arr;
}


export async function getAllCarsByModel(model) {

    let data = await getCars();
    data = data.cars;

    let arr = [];

    for (let i = 0; i < data.length; i++) {

        if (data[i].model === model) {

            // console.log(data[i]);

            if (arr.includes(data[i]) === false) {
                // console.log(data[i])
                arr.push(data[i]);
            }

        }


    }

    // arr.sort();
    return arr;

}

export async function getAllCarsByMaker(maker) {


    let data = await getCars();
    data = data.cars;

    let arr = [];

    for (let i = 0; i < data.length; i++) {

        if (data[i].maker == maker) {
            arr.push(data[i]);
        }

    }

    // arr.sort();
    return arr;
}

export async function getMostExpensive(){

    let data = await getCars();
    // data=data.cars;

    

    // let arr = [];

    for(let i=0;i<data.length;i++){

        for(let j=i+1;j<data.length;j++){

            if(data[j].price.slice(1)>data[i].price.slice(1)){

                let aux;
                aux = data[i].price.slice(1);
                data[i].price.slice(1)=data[j].price.slice(1);
                data[j].price.slice(1)=aux;

                console.log(aux)
                


            }


        }

    }

    return data;


}

export async function getCarById(id) {

    let data = await getCars();
    for (let i = 0; i < data.cars.length; i++) {
        // console.log("aici")



        if (data.cars[i].id == id) {
            // console.log(data.cars[i]);
            // console.log(`id-ul este: ${data.cars[i].id}`)
            // console.log(data.cars[i])
            return data.cars[i];
        }

    }

}





export async function addCar(car) {

    // get data
    let data = await getCars();

    // array of ids, every element from data is mapped within
    let ids = data.cars.map(e => e.id)

    // generate id, random uint between 1 and 3001
    let id = Math.floor(Math.random() * 3000 + 1)

    // while ids includes the previous generated id, keep generating
    while (ids.includes(id) === true) {
        id = Math.floor(Math.random() * 1000 + 1);
    }

    // after no longer generating, the id is assigned to the new car
    car.id = id;

    // push the car to data
    data.cars.push(car);

    // write file to newest version
    await save(data);

}





export async function editCar(car,id) {
        // cere 2 parametrii - car si id , oricare ar fi ele 
    
        
    let data= await getCars();
    
        // pentru fiecare element din data 
    data.cars.forEach(element => {
        // console.log(element)
        // daca element.id egal id din parametrul functiei
        if(element.id == id){

            // console.log("aici") 
            
            // daca vine car.maker -> elementul din data.maker egal cu ce primeste din car
            if(car.maker){
                element.maker=car.maker;
                // console.log(car.maker)
            }
            if(car.model){
                element.model=car.model
            }
            if(car.year){
                element.year=car.year
            }
            if(car.price){
                element.price=car.price
            }

            if(car.mileage){
                element.mileage=car.mileage
            }
        }
        
    });



    await save(data);
    // trimit un obiect care are sigur un id 
    // sa contina doar campurile care au fost completate 
}


export async function deleteCar(id) {

    let data = await getCars();
    data.cars = data.cars.filter(e => e.id != id);
    // console.log(data.cars[0]);
    await save(data);
}





