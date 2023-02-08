//const { mensajes } = require("./server")

//serian los objetos sin normalizar

module.exports={
    compress:(data,original)=>{
         let originals=JSON.stringify(original).length
        let comprimido=JSON.stringify(data).length
        let porcentajeCompresion=((comprimido*100)/originals)-100
        
        return(Math.trunc(porcentajeCompresion*-1))
        
    }
}