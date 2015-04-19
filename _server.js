'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 8080
const server= http.createServer()

server.on('request',onRequest)
server.on('listening',onListening)
server.listen(port)


function onRequest(req,res){
 // res.end('Hola io.js') 
 // let file = fs.readFileSync('public/index.html')
 /*   fs.readFile('public/index.html',function(err,file){
        if(err){
           return res.end(err.message)
        }
        res.end(file)
   })
 */
 /* 
    let index = path.join(__dirname,'public','index.html')
    fs.readFile(index, function(err,file){
      
      if(err) return res.end(err.message)
      res.setHeader('Content-Type','text/html')
      res.end(file)

   })
 */
 let index = path.join(__dirname,'public','index.html')
 res.setHeader('Content-Type','text/html')
 let rs = fs.createReadStream(index)
 rs.pipe(res)
 rs.on('error',function(err){
    res.end(err.message)

})


}

function onListening(req,resp){
  console.log(`Server Running in Port ${port}`)
}

