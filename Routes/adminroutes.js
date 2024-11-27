const express=require('express');
const {adminagentregister,viewagents,viewusers, addPolicy,viewlifeapplications}=require('../Controller/admin')
const {validaterole,validatetoken}=require('../Middleware/Security')
const router=express.Router();
router.post('/registeradmin',validatetoken,validaterole(['Admin']),adminagentregister);
router.get('/allagents',validatetoken,validaterole(['Admin']),viewagents);
router.get("/allusers",validatetoken,validaterole(['Admin']),viewusers);
router.post('/addpolicy',validatetoken,validaterole(['Admin']),addPolicy)
router.get("/getapplications",validaterole(['Admin','Agent']),validatetoken,viewlifeapplications);
module.exports=router;
