const pool=require("../../config/database");

module.exports={
    createuser:(data,callBack)=>{
        pool.query(
            'insert into user(fname,lname,email,Gender,password,telephone)values(?,?,?,?,?,?)',
            [
                data.fname,
                data.lname,
                data.email,
                data.Gender,
                data.password,
                data.telephone
                
               ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
                
            
        );
    },

    getUsers:callBack=>{
        pool.query(
            'select fname,lname,email,Gender,password,telephone from user',
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
                
            
        );
    },

    getUser:(name,callback)=>{
        pool.query(
            'select fname,lname,email,Gender,password,telephone,role from user where fname=?',
            [name],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0])
            }
                
            
        );
    },

    updateUser:(data,callback)=>{
        pool.query(
            'update user set fname=?,lname=?,email=?,Gender=?,telephone=? where uid=?',
            [data.fname,
             data.lname,
             data.email,
             data.Gender,
             data.telephone,
             data.id
            ],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0])
            }
                
            
        );
    },

    deleteUser:(data,callback)=>{
        pool.query(
            'delete from user where fname=?',
            [
             data.name
            ],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0])
            }
                
            
        );
    },

    
}