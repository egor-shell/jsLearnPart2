const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    console.log(req.url)

    // const body = fs.readFileSync('./public/cart.html')
    // const body = req.url === '/code.js'
    // ? fs.readFileSync('./public/code.js')
    // : fs.readFileSync('./public/cart.html')

    const publicFolder = './public'

    let body = null

    try {
        body = fs.readFileSync(`${publicFolder}${req.url}`)
    } catch {
        body = fs.readFileSync('./public/cart.html')
    }

    res.end(body)
})

const port = process.env.PORT || 3000
server.listen(port)

console.log(`Server started on port ${port}`)