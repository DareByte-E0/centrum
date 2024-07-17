require("dotenv").config()
const express = require('express');
const connectDB = require('./utils/db');
const router = require('./routes/index.js')
const cors = require("cors");
const path = require('path');


const app = express()

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
      const mimeType = {
          '.pdf': 'application/pdf',
          '.doc': 'application/msword',
          '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          // add other MIME types as needed
      };
      const ext = path.substring(path.lastIndexOf('.'));
      if (mimeType[ext]) {
          res.setHeader('Content-Type', mimeType[ext]);
      }
  }
}));


app.use('/', router)

connectDB();


app.listen(process.env.PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started at port ${process.env.PORT}`)
  }
})
