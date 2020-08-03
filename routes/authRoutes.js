const passport = require('passport')

//on export une fonction flechée avc l'argument app à recevoir
module.exports = app => {
//Passport routes
//qd on aura un get sur cet url, execute la fonction derriere
  app.get('/auth/google', passport.authenticate('google', { //initialise l'authentification avec la strategie google
    scope: ['profile', 'email'] //on demande à google les infos de son profile et son email
  })
  )    

  app.get('/api/logout', (req, res) => {
    req.logout() //passport kill le cookie 
    res.send(req.user) //verifie qu'on soit deco
  })


  app.get('/auth/google/callback', passport.authenticate('google')) //gère le callback de google apres le signin
  app.get('/api/current_user', ( req, res ) => {
    res.send (req.user) 
  })
  //<-Passport
}