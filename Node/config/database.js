const {createPool}=require('mysql');
require('dotenv').config()

const pool=createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB,
    connectionLimit:10
    
})



module.exports=pool;


// module.exports={
//     createTable:(callBack)=>{
//         pool.query(
//             `create table if not exists todos(
//                 id int primary key auto_increment,
//                 title varchar(255)not null,
//                 completed tinyint(1) not null default 0
//             )`,
//             [],
//             (error,results,fields)=>{
//                 if(error){
//                     return callBack(error);
//                 }
//                 return callBack(null,results)
//             }
                
            
//         );
//     },
// }