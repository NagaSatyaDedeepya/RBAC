const express=require('express');
const{updateLifeInsuranceStatus,updatepassword}=require('../Controller/agent')
const{validatetoken,validaterole}=require('../Middleware/Security')
const router=express.Router()
router.put('/updatestatus',validatetoken,validaterole(['Agent']),updateLifeInsuranceStatus);
router.put('/updatepassword',validatetoken,validaterole(['Agent','Admin','User']),updatepassword);
module.exports=router