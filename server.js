const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

const PERSONNAGES_FILE = path.join(__dirname, './src/data/personnages.json');

app.get('/api', function (req, res) {
  res.send('API on fleek !')
})

app.get('/api/personnages', function (req, res) {
  fs.readFile(PERSONNAGES_FILE, (err, data) => {
    res.json(JSON.parse(data))
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
