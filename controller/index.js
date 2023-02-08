const{dbMaria,dbSqlite}=require("../../baseDatos/knex")
class container{
    constructor(dbClient,table){
        this.dbClient= dbClient
        this.table= table
    }
    createElement= async(elementToAdd)=>{
        await this.dbClient(this.table).insert(elementToAdd)
    }
    readElements=async()=>{
        const elementsDb=(await this.dbClient(this.table).select("*")) || []
        return elementsDb
    }

}

module.exports={container}