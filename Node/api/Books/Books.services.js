const pool=require("../../config/database");

module.exports={

    getBook:callBack=>{
        pool.query(
            'select name from book',
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
                
            
        );
    },

    getBookByname:(name,callback)=>{
        pool.query(
            'select name,image_location from book where name=?',
            [name],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results[0])
            }
                
            
        );
    },


    getHistory:(name,callback)=>{
        pool.query(
            'select u.fname,b.name,h.date_of_borrow,h.date_of_return from book as b,user as u,barrow as h where h.uid=u.uid and h.bid=b.bid and b.name=?',
            [name],
            (error,results,fields)=>{
                if(error){
                    return callback(error);
                }
                return callback(null,results)
            }
                
            
        );
    },    

    createBook:(name,path,callBack)=>{
        pool.query(
            'insert into book(name,image_location)values(?,?)',
            [
                name,
                path
                
               ],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results)
            }
                
            
        );
    },



}