const {login}=require("./admin.controller");
const router=require('express').Router();
const {checkToekn}=require("../../auth/token_validation");

router.post("/",login);


module.exports=router;