const {getAdmin}=require("./admin.service")
const {genSaltSync,hashSync,compareSync}=require("bcrypt")
const {sign}=require("jsonwebtoken")



module.exports={

 login:(req,res)=>{
    const body=req.body;
    const name=body.name
 
    getAdmin(name,(err,results)=>{
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
                message:"Invalid admin name or password"
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
                message:"Invalid admin name or password"
            });

        }
        
    })
},

}