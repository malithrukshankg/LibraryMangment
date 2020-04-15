const {getBook,createBook,getBookByname,getHistory}=require("./Books.services")
const multer=require('multer');
const upload=multer({dest:'upload/'})


module.exports={

    getAllBooks:(req,res)=>{
        
        getBook((err,reults)=>{
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
    
    
    uploadBook:(req, res) => {
        const name=req.body.name;
        const path=req.file.path
        createBook(name,path,(err,reults)=>{
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

    getOneBook:(req, res) => {
        const name=req.body.name;
        
        getBookByname(name,(err,reults)=>{
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

    getBookHistory:(req, res) => {
        const name=req.body.name;
        
        getHistory(name,(err,reults)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                }); 
            }
            if(reults.length==0){
                
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            else{
            //  console.log(reults.length)
            return res.status(200).json({
                success:1,
                data:reults
            });
        }
        })

    },
    
    getImage:(req, res) => {
        
        // res.sendFile('C:/Users/User/Desktop/stuff/projects/library_mangment/Node/upload/adasd.jpg')
        // console.log(typeof res)
        const name=req.body.name;
        
        getBookByname(name,(err,reults)=>{
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
            // console.log(typeof reults.image_location)
            var old_l=reults.image_location;
            var new_l=old_l.replace(/\\/g, '/');

            console.log(new_l)
            // res.sendFile('C:/Users/User/Desktop/stuff/projects/library_mangment/Node/'+new_l)
            res.download(new_l)
            // return res.status(200).json({
            //     success:1,
            //     data:reults
            // });
        })
    }
    
}