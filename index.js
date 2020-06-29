const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
})

const PORT = process.env.PORT || 5000; //ecoute sur notre site de deploy(heroku ici) ou par defaut port 5000
app.listen(PORT);