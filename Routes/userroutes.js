const express=require('express');
const {userregister,login,appliylifeinsurance}=require('../Controller/user')
const{validaterole,validatetoken}=require('../Middleware/Security')
const router=express.Router();

router.post('/registeruser',userregister);
router.post('/login',login);
router.post('/applylifepolicy',validaterole(['User']),validatetoken,appliylifeinsurance);
module.exports=router