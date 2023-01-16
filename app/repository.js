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