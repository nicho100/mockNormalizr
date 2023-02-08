const socket=io()
//recibo los mensajes y lo inserto en el html con el formato pedido
socket.on("messages",data=>{
let html=""
const user= new schema.Entity('users')
const mensaje = new schema.Entity('mensajes', {
    message: user,
  });
  const article = new schema.Entity('articles', {
    author: user,
    message: [mensaje],
  });
const denormalizedData=denormalize(data.result,article,data.entities)
denormalizedData.forEach(message => {
 html= `${html}
<li><b style="color:blue">${message.author.id}</b>[<em style="color:brown">${message.date}</em>]:<em style="color:green">${message.message}</em></li>`
});

document.getElementById("chatContent").innerHTML=`<ul>${html}</ul>`//inserto en el chat.ejs
document.getElementById('compresion').innerHTML= `<h1 style="color:blue">compresion:${compress(data,denormalizedData)}%</h1>`//compresor de normlizr
})


//escucho el ultimo mensaje enviado por el servidor,le doy formato y lo agrego al html
socket.on("messageAdded",(message)=>{
    let html=""
    html=`${html}<li><em>${message.email}</em>:${message.text}</li>`
    console.log(message)
    document.getElementById("chatContent").innerHTML=html
    
})

//creo una funcion para crear un objeto mensaje apartir del formulario de chat.ejs y lo emito al servidor
function sendMessage(that){
    const message={
        author:{id:that.email.value,
            nombre:that.nombre.value,
            apellido:that.apellido.value,
            edad:that.edad.value,
            alias:that.alias.value,
            avatar:that.avatar.value},
        message:that.message.value,
        date:new Date().toLocaleString()
    }
    socket.emit("newMessage",message)
}
