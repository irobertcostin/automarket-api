// aici declaram doi vectori si testam 



import { byMaker,intersection,byModel,byMaxMileage,byMinMileage,byMaxPrice,byMinPrice,byMaxYear,byMinYear,filterAll } from "./utile.js"


let testObj={
    maker: 'BMW',
    model: 'Seria 1',
    minYear: 2005,
    maxYear: 2009,
    minMil: 200000,
    maxMil: 270000
  }




let test =
    [
        {
            maker: "Audi",
            model: "Q8",
            year: 2019,
            price: "$119000",
            mileage: 125000,
            id: 2185
        },
        {
            maker: "Lamborghini",
            model: "Huracan",
            year: 2020,
            price: "$299000",
            id: 207,
            mileage: 47880
        },
        {
            maker: "Porsche",
            model: "Panamera",
            year: 2015,
            price: "$46500",
            id: 2928,
            mileage: 246000
        },
        {
            maker: "BMW",
            model: "Seria 1",
            year: 2007,
            price: "$5600",
            id: 2678,
            mileage: 255000
        },
        {
            maker: "Ferrari",
            model: "612",
            year: 2017,
            price: "$195000",
            mileage: 12000,
            id: 1490
        },
        {
            maker: "Aston Martin",
            model: "DB9",
            year: 2011,
            price: "$49000",
            mileage: 123050,
            id: 77
        }
    ]


let test2 =
    [
        {
            maker: "Audi",
            model: "Q8",
            year: 2019,
            price: "$119000",
            mileage: 125000,
            id: 2185
        },
        {
            maker: "Lamborghini",
            model: "Huracan",
            year: 2020,
            price: "$299000",
            id: 207,
            mileage: 47880
        },
        {
            maker: "Porsche",
            model: "Panamera",
            year: 2015,
            price: "$46500",
            id: 2928,
            mileage: 246000
        },
        // {
        //     maker: "BMW",
        //     model: "Seria 1",
        //     year: 2007,
        //     price: "$5600",
        //     id: 2678,
        //     mileage: 255000
        // },
        // {
        //     maker: "Ferrari",
        //     model: "612",
        //     year: 2017,
        //     price: "$195000",
        //     mileage: 12000,
        //     id: 1490
        // },
        // {
        //     maker: "Aston Martin",
        //     model: "DB9",
        //     year: 2011,
        //     price: "$49000",
        //     mileage: 123050,
        //     id: 77
        // }
    ]
// console.log(intersection(test,test2)) intersectie doi vectori 
// console.log(byModel(test,"612")) filtrare model 
// console.log(byMinYear(test,2020)) filtrare ani 
// console.log(byMaxYear(test,2011))
// console.log(byMaker(test,"Audi"))
console.log(byMaxPrice(test,100000))

// console.log(filterAll(test,testObj))


// deschidem terminal nou in fisierul acesta si testam cu node fisier.js