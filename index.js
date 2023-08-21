const express = require('express');

const imgext = require('tesseract.js');

imgext.recognize('https://upload.wikimedia.org/wikipedia/commons/1/17/Text_entropy.png',
  'eng',{ logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
  })

const app = express()
const port = 3000

app.get('/',(req, res) => {
    res.send("Hello SaeeAM") 
})

app.listen(port, ()=> {
    console.log(`Server start ${port}`)
})