require('dotenv').config()
const http=require('http');
var cors = require('cors')
const express=require('express');
const app=express();


const userRouter=require("./api/users/user.router");
const bookRouter=require("./api/Books/Books.routers");
const adminRouter=require("./api/Admin/admin.router");
const {createUserTable,createBookTable,createBarrowTable,createAdminTable}=require("./config/dataModel")



app.use(express.json(),
cors()
)
app.use("/api/users",userRouter);
app.use("/api/books",bookRouter);
app.use("/api/admin",adminRouter);




const port=process.env.APP_PORT||3000
app.listen(port,()=>{
    createUserTable ();
    createBookTable ();
    createBarrowTable (); 
    createAdminTable ();   
    console.log(`Listning on port ${port}`)}
    );