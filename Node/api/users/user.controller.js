const {getUsers,getUser,updateUser,deleteUser,createuser}=require("./user.service")
const {genSaltSync,hashSync,compareSync}=require("bcrypt")
const {sign}=require("jsonwebtoken")


module.exports={
    createUser:(req,res)=>{
        

        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt)
        createuser(body,(err,reults)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:reults
            });
        })
    },

    getAllUsers:(req,res)=>{
        
        getUsers((err,reults)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:reults
            });
        })
    },


    getUserByName:(req,res)=>{
        
        // console.log(process.env.APP_PORT)
        const name=req.params.fname
        console.log(name)
        getUser(name,(err,reults)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                }); 
            }
            if(!reults){
                
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            return res.status(200).json({
                success:1,
                data:reults
            });
        })
    },


    updateUserDetail:(req,res)=>{
        const body=req.body;
        const salt=genSaltSync(10);
        body.password=hashSync(body.password,salt)
        updateUser(body,(err,reults)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            if(!reults){
                
                return res.json({
                    success:0,
                    message:"Faild to update"
                });
            }
            return res.status(200).json({
                success:1,
                data:reults
            });
        })
    },

    deleteUserDetail:(req,res)=>{

        const body=req.body

        deleteUser(body,(err,reults)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                });
            }
            console.log(reults)
            return res.status(200).json({
                success:1,
                data:reults
            });
        })
    },

    login:(req,res)=>{
        const body=req.body;
        const name=body.fname
        
        getUser(name,(err,results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                }); 
            }
            if(!results){
                
                return res.json({
                    success:0,
                    message:"Invalid email or password"
                });
            }
            const result=compareSync(body.password,results.password)
            if(result){
                results.password=undefined;
                const jsonwebtoken=sign({result:results},"abc456",{
                   expiresIn:"1h" 
                });
                return res.status(200).json({
                    success:1,
                    message:"login successfully",
                    token:jsonwebtoken
                });
            }else{
                return res.json({
                    success:0,
                    message:"Invalid email or password"
                });

            }
            
        })
    },

    
    
}