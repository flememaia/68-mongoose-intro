// importar
const {model, Schema} = require('mongoose')

const dogSchema = new Schema({
    name: {type: String, required: true},
    breed: {type: String, default: 'mixed'},
    color:{type: String, enum: ['black', 'yellow', 'white', 'colorful']},
    age: {type: Number, min: 0},
    weight: {type: Number, min: 0, max: 100},
    size: {type: String, enum: ['small', 'medium', 'large']},
    gender: {type: String, enum: ['female', 'male']}
})

const DogModel = model('Dog', dogSchema)

module.exports = DogModel