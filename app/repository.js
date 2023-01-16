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


//test