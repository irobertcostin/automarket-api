import fs from "fs";

import path from "path";

export function getCars() {
    return new Promise ((response,reject)=>{

        // read an indicated file , UTF-8 encoding for language read, with error and data
        fs.readFile(("data.json"),'utf-8',(err,data)=>{

            if(err){
                reject(err);
            }else {
                // transform the response data to JSON
                const json=JSON.parse(data);
                // responde with a JSON 
                response(json);

            }
        })



    })
}


export async function save(data){

    return new Promise ((resolve,reject)=>{

        fs.writeFile(("data.json"),JSON.stringify(data),(err,data)=>{

            if(err){
                reject(err);
            }else{
                console.log("salveaza")
                resolve();
            }
        })
    })
}


export async function getAllMakers(){

    let data = await getCars();
    data = data.cars;

    let arr=[];

    for(let i=0;i<data.length;i++){
    
            if(arr.includes(data[i].maker)===false){

                arr.push(data[i].maker)
            }
    }

    arr.sort();
    return arr;

}


export async function getAllModelsByMaker(maker){


    let data = await getCars();
    data = data.cars;

    let arr = [];

    for(let i=0;i<data.length;i++){

        if(data[i].maker==maker){
            if(arr.includes(data[i].model)===false){

                arr.push(data[i].model)
            }
    }

        }
    

arr.sort();
// console.log(arr)
return arr;
}


export async function getAllCarsByModel(model){

    let data = await getCars();
    data= data.cars;

    let arr=[];

    for(let i=0;i<data.length;i++){
        
        if(data[i].model===model){

            // console.log(data[i]);

            if(arr.includes(data[i])===false){
                // console.log(data[i])
                arr.push(data[i]);
            }

        }


    }

    // arr.sort();
    return arr;

}

export async function getAllCarsByMaker(maker){


    let data = await getCars();
    data= data.cars;

    let arr=[];

    for(let i=0;i<data.length;i++){

        if(data[i].maker==maker){
            arr.push(data[i]);
        }

    }

    // arr.sort();
    return arr;
}

export async function addCar(car){

    // get data
    let data = await getCars();
    
    // array of ids, every element from data is mapped within
    let ids = data.cars.map(e=>e.id)

    // generate id, random uint between 1 and 3001
    let id = Math.floor(Math.random()*3000+1)

    // while ids includes the previous generated id, keep generating
    while(ids.includes(id)===true){
        id=Math.floor(Math.random()*1000+1);
    }

    // after no longer generating, the id is assigned to the new car
    car.id=id;

    // push the car to data
    data.cars.push(car);

    // write file to newest version
    await save(data);

}


export async function deleteCar(id){

    let data = await getCars();
    data.cars=data.cars.filter(e=>e.id!=id);
    save(data);
}


