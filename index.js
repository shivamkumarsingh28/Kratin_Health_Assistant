const express = require('express');
const fs = require('fs');
const multer = require('multer')
const worker = require('tesseract.js');

const app = express()
const port = 3000
app.use('/static', express.static('static'));

app.set('view engine', 'ejs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  }, 
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage}).single("avatar");

app.get('/',(req, res) => {
    res.render('index',{ title: 'Kratin Health AI', message: 'Hello SaeeAM!' })
})

app.post('/upload',(req, res) => {
  upload(req, res, err => {
    fs.readFile(`./uploads/${req.file.originalname}`, (err, data) =>{
      if(err) return console.log('this is your error', err);
      worker
      .recognize(data, "eng", { logger:m => console.log(m)})
      .then(({ data: { text } }) => {
            // console.log(text);
            res.send(text);
      });
    });
  });
});

app.listen(port, ()=> {
    console.log(`Server start ${port}`)
})