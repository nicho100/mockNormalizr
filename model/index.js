
const{dbSqlite}=require("../knex")
const createTable=async()=>{
    try{
        await dbSqlite.schema.dropTableIfExists("mensajes")
        await dbSqlite.schema.createTable("mensajes",(table)=>{
            table.increments("id")
            table.string("email",50).notNullable()
            table.date("date").notNullable()
            table.string("message",40).notNullable()
        })
    } catch(err){
        console.log(err.message)
    }finally{
        
        dbSqlite.destroy()
    }
} 

createTable()
