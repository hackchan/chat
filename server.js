'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')

const port = process.env.PORT || 8080
const server= http.createServer(onRequest4)

server.on('request',onRequest4)
server.on('listening',onListening)
server.listen(port)

function onRequest1(req, res){
 /*No usar! porque se realiza una opracion Syncrona y esto lo que hace
  *   es Bloquear el hilo de ejecucion de iojs mientras carga el archivo 
  *   del sistema y mientras termina de cargar las demas peticones las va 
  *   encolar.
  *
  */

   let file = fs.readFileSync('public/index.html')
   res.end(file)
}


function onRequest2(req,res){
/*Aun estamos usando rutas absolutas como un String :(
 * esto puede que funcione en un sistema operativo peri si asamos nuestra aplicacion a otro sistema operativo la ruta absoluta fallaria, recomendado usar la libreria path*/
fs.readFile('public/index.html', function(err, file){
  if(err){
      return res.end(err.message)
   }
  res.end(file)

})

}

function onRequest4(req, res){
  let index = path.join(__dirname,'public','index.html')
  res.setHeader('Content-Type','text/html')
  let rs = fs.createReadStream(index)
  rs.pipe(res)
  rs.on('error',function(err){
    res.end(err.message)

 })
  
}

function onRequest3(req, res){
/i**/
  let index= path.join(__dirname,'public','index.html')
  fs.readFile(index,function(err, file){
  if(err){
    return res.end(err.message)
 }
  res.setHeader('Content-Type','text/html')
  res.end(file)
})

}
function onListening(){
  console.log('Server Running in port ' + port)
}


