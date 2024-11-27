require('dotenv').config();
const connection = require('../db');
const Queries=require('../Queries/CreateQueries.json');
const SQueries=require('../Queries/SelectQueries.json')
const bcrypt = require('bcrypt');


const adminagentregister=async(req,res)=>{
    try{
    const{FirstName,LastName,Email,Password,MobileNo,Role,Address}=req.body
    if(!FirstName||!LastName||!Email||!Password||!MobileNo||!Address){
        res.status(400);
        throw new Error("All fields required");
    } 
    const validRoles = ['Admin', 'Agent', 'User'];
    const userrole= Role && validRoles.includes(Role) ? Role : 'User';
    const hashedPassword = await bcrypt.hash(Password, 12); 
  await connection.query(Queries.CreateUsersTable);
  await connection.query(Queries.InsertUser[FirstName,
    LastName,
    Email,
    hashedPassword,
    MobileNo,
    userrole,
    Address]);
    res.status(200).send("user register sucessfully")
}
catch(error){
    console.error("error while adding user",error);
    res.status(500).json({message:"Error creating user",error})
}
}
const viewusers=async(req,res)=>{
    try{
        const[rows]=await connection.query(SQueries.viewusers)
        if(rows.length===0){
           res.json({message:"No user exists"}) 
        }
        res.status(200).send(rows);
    }
    catch(error){
       console.error("error while retreving users",error);
       res.status(500).json({message:"Error retreving user",error})
    }
}
const viewagents=async(req,res)=>{
    try{
        const[rows]=await connection.query(SQueries.viewagents)
        if(rows.length===0){
           res.json({message:"No user exists"}) 
        }
        res.status(200).send(rows);
    }
    catch(error){
       console.error("error while retreving users",error);
       res.status(500).json({message:"Error retreving user",error})
    }
}

const addPolicy=async(req,res)=>{
    try{
         const{PolicyId,PolicyName,Description,Premium,Coverage}=req.body;
         if(!PolicyId||!PolicyName||!Description||!Premium||!Coverage){
            res.status(400);
            throw new Error("All fields are required");
         }
         let newPolicyId = "PID000001";
         if (rows.length > 0) {
             const latestPolicyId = rows[0].PolicyId;
             const currentIdNumber = parseInt(latestPolicyId.slice(-6));
             const newIdNumber = currentIdNumber + 1;
             newPolicyId = `PID${String(newIdNumber).padStart(6, '0')}`;
         }
         await connection.query(Queries.CreatePolicyTable)
         await connection.query(Queries.InsertPolicy,[PolicyId,PolicyName,Description,Premium,Coverage])
    }
    catch(error){
       console.error("error while adding policy",error);
       res.status(500).json({message:"error",error})
    }
}
const viewlifeapplications=async(req,res)=>{
    try{
       const [rows]=await connection.query(SQueries.viewappliedpolicy)
       if(rows.length===0){
            res.json("application not there")
       }
       res.status(200).send(rows);
       
    }catch(error){
      console.log("Error while retreving applications");
      res.status(500).json({message:"error",error})
    }
}
module.exports={adminagentregister,viewusers,viewagents,addPolicy,viewlifeapplications};

