const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')   //pour créer des cookies avexc passport et eviter de devoir se reconnecter()
const passport = require('passport')


require('./models/User')  //etabli un nouveau schema pour une collectou model attention à l'ordre des require
require('./services/passport')  //on appelle la config passport pour qu'il s'execute


mongoose.connect(keys.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})



const app = express() 

//mets en use les cookies
app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000, //(30j de durée max)
    keys: [keys.cookieKey]  //clé secret dans la config
  })
)
app.use(passport.initialize())  //init passport
app.use(passport.session())  // lui dit qu'il peut utiliser les cookies session


 

require('./routes/authRoutes')(app)  //on  appelle la fonction authRoutes avec l'argument app qu'on a besoin pour la fonction get
/* 
on aurait pu faire aussi :
const authRoutes = require('./routes/authRoutes')
authRoutes(app) 
*/


const PORT = process.env.PORT || 5000 //ecoute sur notre site de deploy(heroku ici) ou par defaut port 5000
app.listen(PORT)