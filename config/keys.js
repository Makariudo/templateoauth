//keys.js  dev ou prod keys
if (process.env.NODE_ENV === 'production')  {
  //on est en mode prod
  module.exports = require('./prod')
} else {
  //on est en dev
  module.exports = require ('./dev') //on require les keys dev et on les export direct
}
