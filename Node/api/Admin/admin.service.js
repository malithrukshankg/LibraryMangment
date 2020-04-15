const pool=require("../../config/database");

module.exports={
    getAdmin:(name,callback)=>{
        pool.query(
            'select name,password,role from admin where name=?',
            [name],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0])
            }
                
            
        );
    }
}