//npm i express ,i socket.io, init -y ,i @faker-js/faker, i knex mysql/sqlite3, i ejs, i normalizr
const express=require('express')
const app= express()
const {createServer}= require('http')
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
const socketIo = require('socket.io')
const { dbSqlite } = require('./knex')
const{container}=require("../mockNormaliz/controller")
const server=createServer(app)
const io =socketIo(server)
const {faker}= require('@faker-js/faker')
const { ContenedorArchivo } = require('./controller/contenedorArchivos')
faker.locale='es'
const {normalize,schema,denormalize}=require('normalizr')
const { compress } = require('./compresion')
app.set('views', './public')
app.set('view engine', 'ejs')

const contenedorMensajes=new ContenedorArchivo("mensajes")
//const messageContainer= new container(dbSqlite,"mensajes")
const mensajes=[{
    
    author:{id:'nicholas@hotmail',
        nombre:"nicholas",
        apellido:"peterson",
        edad:22,
        alias:"nicho",
        avatar:"avatar1"},
    message:"hola",
    
},{
    author:{id:'mart@hotmail',
    nombre:"mart",
    apellido:"luz",
    edad:10,
    alias:"mar",
    avatar:"avatar2"},
message:"holas",   
},{
    author:{id:'nicholas@hotmail',
        nombre:"nicholas",
        apellido:"peterson",
        edad:22,
        alias:"nicho",
        avatar:"avatar1"},
    message:"como estas",
}]
//creo el schema de normalizr
const user= new schema.Entity('users')
const mensaje = new schema.Entity('mensajes', {
    message: user,
  });
  const article = new schema.Entity('articles', {
    author: user,
    message: [mensaje],
  });
  




let messages=[]
app.get('/',async (req,res)=>{
    res.render('form.ejs')
    
  
})
//se crean 5 productos usando faker
app.get('/api/productos-test',async (req,res)=>{
    const results= Array.from({length:5}).map(()=>({
    name:faker.commerce.product(),
    price:faker.finance.amount(),
    thumbnail:faker.image.business(),   
    }))
    
    res.json(results)
  
})

io.on('connection',async(client) => {
    //guardo todos los mensajes en una variable
    messages=await contenedorMensajes.getAll()
    console.log("cliente se conecto")
    const normalizedData=normalize(messages,article)//normalizo los mensajes
    client.emit("messages",normalizedData)//emito al cliente los mensajes y productos
   
    
    //escucho el nuevo mensaje recibido del cliente, lo guardo en una variable con el resto de los mensajes y lo emito a todos
    client.on("newMessage",async(msg)=>{
        await contenedorMensajes.save(msg)
        messages=await contenedorMensajes.getAll()
      
        io.sockets.emit("messageAdded",messages)
       
    })
   
 
 });
 server.listen(8080,(req,res)=>{
    console.log("funciona")
})