import mongoose from 'mongoose'

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    searchCount: { type: Number, default: 0 }
})

const Planets = mongoose.model('planets',planetSchema)
export default Planets









