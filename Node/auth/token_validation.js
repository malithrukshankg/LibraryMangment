const {verify}= require("jsonwebtoken")

module.exports={
    checkToekn:(req,res,next)=>{
        let token=req.get("authorization");
        console.log(typeof token)
        if(token){
            token=token.slice(7);
            var decode=verify(token,"abc456",(err,decode)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Invalid token"
                    });
                    
                }else{
                    next();
                    console.log(decode)
                }
            })
            
        }else{
            res.json({
                successo:0,
                message:"Access denied unauthorized user"
            })
        }
    }
}