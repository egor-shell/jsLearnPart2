// const http = require('http')
// const fs = require('fs')

// const server = http.createServer((req, res) => {
//     console.log(req.url)

//     const publicFolder = './public'

//     let body = null

//     try {
//         body = fs.readFileSync(`${publicFolder}${req.url}`)
//     } catch {
//         body = fs.readFileSync('./public/cart.html')
//     }

//     res.end(body)
// })

// const port = process.env.PORT || 3000
// server.listen(port)

// console.log(`Server started on port ${port}`)

const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.static('./public'))

app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/cart.html'); // change the path to your index.html
});

const port = process.env.PORT || 3000
app.listen(3000, () => {
    console.log(`Server started on port ${port}.`)
})

app.get('/itemsList/:page', (req, res) => {
    const page = req.params.page
    fs.readFile(`./public/database/page${page}.json`, 'utf8', (err, data) => {
        res.send(data)
    })
})