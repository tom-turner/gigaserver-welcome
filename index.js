const express = require('express')
const app = express()
const port = 5000
const fs = require('fs')


let getFile = () => { 
  return fs.readFileSync('setup.json', 'utf8').split('\n')
}

let parseFile = (file) => {
  let services = []

  for ( let line of file ) {
    let split = line.split('=')
    let name = split[0]
    let url = split[1]
    services.push({
      name: name,
      url: url
    })
  }
  return services
}

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index.ejs', { services : parseFile( getFile() ) })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})