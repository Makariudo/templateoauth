const mongoose = require('mongoose')
const Schema = mongoose.Schema  // en destrucrturing ca donne (const {Schema} = mongoose)

const userSchema = new Schema ({
  googleId: String
})

mongoose.model('users', userSchema) //on crée une nouvelle collection users qu'on exporte dans notre mongoose pour aller le chercher aprs quand on veut
//deux sur mongoose.model arguments on pull, un seul on fetch