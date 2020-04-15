const {getAllBooks,uploadBook,getImage,getOneBook,getBookHistory}=require("./Books.controllers");
const router=require('express').Router();
const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg'||file.mimetype=='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
    
    
}
const upload=multer({
    storage:storage,
    fileFilter:fileFilter

})

router.get("/",getAllBooks);
router.post("/image",getImage);
router.post("/book",getOneBook);
router.post("/history",getBookHistory);
router.post("/", upload.single('productImage'),uploadBook);

module.exports=router;