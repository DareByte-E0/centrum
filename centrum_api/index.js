const express = require('express');
const router = require('./routes/index.js')


const app = express()
const port = 5000;


app.use('/', router)


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  }
})
