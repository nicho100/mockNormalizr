const knex= require("knex")

const dbSqlite=knex({
    client:"sqlite3",
    connection:{
        filename:"./baseDatos/DB/ecommerce.sql"
    },
    useNullAsDefault:true,
})

module.exports={dbSqlite}