// importar  mongoose
const mongoose = require('mongoose')

// importa DogModel
const DogModel = require('./models/Dog.models')

//importa minha lista de cachorros
const dogList = require('./data')

// inicia a conexão
async function init(){
    try
    {
       const connection = await mongoose.connect('mongodb://localhost:27017/dogDB',
        {
            useNewUrlParser:true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Conectado ao banco", connection.connections[0].name)

    //***************ATENÇAO - LIMPAR NOSSO BANCO DE DADOS  */
        connection.connections[0].dropDatabase()

        // Guarda cada conexão ativa dentro de uma array. Como temos apenas 1 conexão, indice 0

        // CREATE one
        const dogCreated = await DogModel.create({
            name: 'Pluto',
            breed: "bloodhound",
            color: 'yellow',
            age: 92,
            weight: 12,
            size: 'medium',
            gender: 'male'
        })
        console.log("dogCreated", dogCreated)

        // CREATE Many
        const dogListCreated = await DogModel.insertMany(dogList)

        console.log("dogListCreated", dogListCreated)

        // READ All
        const allDogs = await DogModel.find()

        console.log("allDogs", allDogs)

        // READ filtered
        const filteredDogs = await DogModel.find({color: "colorful"})

        console.log("filteredDogs", filteredDogs)

        // READ filtered
        const filteredDogs2 = await DogModel.find({color: {$ne: "colorful"}})

        console.log("filteredDogs2", filteredDogs2)

        // READ one -  sem parâmetros => retorna a primeira ocorrência 
        const oneDog = await DogModel.findOne({color:  "colorful"})

        console.log("oneDog", oneDog)

        // UPDATE one 
        const updatedDog = await DogModel.findOneAndUpdate(
            {_id: allDogs[0]._id},
            {$set: {age: 10}},
            {new: true}
            )

        console.log("updatedDog", updatedDog)

        // UpdateMany
        const updateAllDogs = await DogModel.updateMany({},{gender: 'male'})

        console.log("updateAllDogs", updateAllDogs)

        // DeleteOne

        const deletedDog = await DogModel.deleteOne({name: 'Bia'})

        console.log("deletedDog", deletedDog)

    }
    catch(error){
        console.log(error)
    }

}

init()