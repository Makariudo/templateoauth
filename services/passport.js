const passport = require('passport')  //import de passport pour loauth google
const GoogleStrategy = require('passport-google-oauth20').Strategy  //import de la strategie de google
const keys = require('../config/keys')
const mongoose = require('mongoose')


const User = mongoose.model('users')

passport.serializeUser(( user, done ) => {
  done (null, user.id )       //on utilise la methode de passport serialized popur genere un cooki d'idenbtifiaction avec comme id le user.id de mongo 
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
})

//passport -> Oauth google
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,  //on initialise une nouvelle instance passport avec la strategie google avec les deux arguments de la fonction
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'  //url de retour apres authentification
  }, 
  (accessToken, refreshToken, profile, done) => { //callback fonction avec les arguments token pour les cookies a venir, le profile et done pour dire à google qu'on a fin i avec notre requete
    User.findOne({ googleId: profile.id }).then( existingUser => {  //methode mongoose asynchrone avec des promesses donc
      if (existingUser){
        // si on a deja ce profil dans notre db
        done(null, existingUser) //renvoie à google done avec null(pasdepb) et le user trouve existing user
      } else {
        //nous n'avons pas ce user dans notre db
        new User({ googleId: profile.id })
          .save() //on crée une instance googleid avec la valeur du profile.id que google nous donne via oauth et on use la methode save pour la save sur mongodb
          .then( user => done( null, user ))  //juste user est le User après la promesse 
      }
    })
  
    //console.log('accessToken', accessToken) //nous donne l'autorisation de gerer les infos du compte google peut etre use un nbr de fois limit
    //console.log('refreshToken', refreshToken) //redonne un access token qd le premier est expire
    //console.log('profile:', profile) //donne les infos du profile
      //on regarde ce que nous renvoie google
  })
)  