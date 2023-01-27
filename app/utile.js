export  function byMaker(arr,param){

    let x =[]
    
    for(let i=0; i< arr.length;i++){

        if(arr[i].maker===param){
            x.push(arr[i])
        }
    }

    return x;
}


export  function byModel(arr,param){

    let x =[]
    for(let i=0; i< arr.length;i++){

        if(arr[i].model===param){
            x.push(arr[i])
        }
    }

    return x;
}



export  function byMinYear(arr,minYear){

    let x = []
    
    for(let i=0; i< arr.length;i++){

        if(arr[i].year>=minYear){
            x.push(arr[i])
        }
    }

    return x;
}

export  function byMaxYear(arr,maxYear){

    let x = []
    
    for(let i=0; i< arr.length;i++){

        if(arr[i].year<=maxYear){
            x.push(arr[i])
        }
    }

    return x;
}


export  function byMinMileage(arr,minMil){

    let x = []
    
    for(let i=0; i< arr.length;i++){

        if(arr[i].mileage>=minMil){
            x.push(arr[i])
        }
    }

    return x;
}


export  function byMaxMileage(arr,maxMil){

    let x = []
    
    for(let i=0; i< arr.length;i++){

        if(arr[i].mileage<=maxMil){
            x.push(arr[i])
        }
    }

    return x;
}



export  function byMinPrice(arr,minPrice){

    let x = []
    
    for(let i=0; i< arr.length;i++){

        if(arr[i].price.slice(1)>=minPrice){
            x.push(arr[i])
        }
    }

    return x;
}


export  function byMaxPrice(arr,maxPrice){

    let x = []
    
    for(let i=0; i< arr.length;i++){

        if(arr[i].price.slice(1)<=maxPrice){
            x.push(arr[i])
        }
    }

    return x;
}


//functie de intersectare a doi vectori si filtrare 

export function byId(arr,param){

    for(let i=0;i<arr.length;i++){
        if(arr[i].id===param){
            return arr[i];
        }


    }

}





// trebuie testata in test.js
export function intersection(arr,arr2){

    //intersectam doi vectori

    let x = []

    // numaram elementele primului vector
    for(let i=0;i<arr.length;i++){

    
        // if byId trebuie sa ia arrayul doi si fiecare id al lui i din primul array
        // daca este un element in arr2 care are acelasi id la i-ul acesta
        // push in x si return de arr

        if(byId(arr2,arr[i].id)){
            x.push(arr[i]);
        }
    }

    return x;

}

// functie care verifica daca avem vector si marca, si exista vreun obiect cu marca respectiva

export function  filterAll( arr , query){


    let filters=[];


    if(query.maker){

        filters.push({

            type:"maker",

            value:query.maker
        })
    }


    if(query.model){

        filters.push({

            type:"model",

            value:query.model

        })

    }


    if(query.minYear){

        filters.push({

            type:"minYear",

            value:+query.minYear

        })

    }


    if(query.maxYear){

        filters.push({

            type:"maxYear",

            value:query.maxYear

        })

    }


    if(query.minMil){

        filters.push({

            type:"minMil",

            value:+query.minMil

        })

    }


    if(query.maxMil){

        filters.push({

            type:"maxMil",

            value:+query.maxMil

        })

    }


    if(query.minPrice){

        filters.push({

            type:"minPrice",

            value:+query.minPrice

        })

    }


    if(query.maxPrice){

        filters.push({

            type:"maxPrice",

            value:+query.maxPrice

        })

    }

    

    let sol=arr;






    filters.forEach(element => {



        switch(element.type){


            // cazul maker - intersection de ID , intre sol si array dat de byMaker (adica 2 masini cazul BMW)
            case "maker":
            
            // sol e arrayul mare 
            // sol egal cu intersectia dintre sol si arrayul determinat de byMaker, cu parametrii sol,maker
            // byMaker va returna toate elementele din sol care au acelasi maker 
            // intersectia va compara sol si arr byMaker 
            // si sol devine defapt by Maker;
            
            sol=intersection(sol,byMaker(sol,element.value));
            break;

            case "model":

            sol=intersection(sol,byModel(sol,element.value));

            break;


            case "minYear":
                sol=intersection(sol,byMinYear(sol,element.value));
                break;


            
            case "maxYear":
                sol=intersection(sol,byMaxYear(sol,element.value));
                break;


            case "minMil":
                sol=intersection(sol,(byMinMileage(sol,element.value)));
                break;


            case "maxMil":
                sol=intersection(sol,(byMaxMileage(sol,element.value)));
                break;


            case "minPrice":
                sol=intersection(sol,(byMinPrice(sol,element.value)));
            break

            case "maxPrice":
                sol=intersection(sol,(byMaxPrice(sol,element.value)));
            break

        }




        
    });
    return sol;


}




