const {getAllUsers,getUserByName,updateUserDetail,deleteUserDetail,createUser,login}=require("./user.controller");
const router=require('express').Router();
const {checkToekn}=require("../../auth/token_validation");

router.post("/",createUser);
router.post("/login",login);
router.get("/",getAllUsers);
router.get("/:fname",getUserByName);
router.patch("/",updateUserDetail);
router.post("/delete",deleteUserDetail);


module.exports=router;