require('dotenv').config();
const connection=require('../db')
const UQueries=require('../Queries/UpdateQueries.json')
const updateLifeInsuranceStatus = async (req, res) => {
    try {
        const { PolicyNo, status } = req.body; 
        
        if (!PolicyNo || !status) {
            return res.status(400).json({ message: "PolicyId and status are required" });
        }
       
        await connection.query(UQueries.updateLifeInsuranceStatus, [status, PolicyNo]);

        res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: "Error updating status", error });
    }
}
const updatepassword=async(req,res)=>{
    try{
        const{Password,Email}=req.body;
        if(!Password||!Email){
            return res.status(400).json({message:"All fields required"});
        }
        const hashpassword=await bcrypt.hash(Password,12)
        await connection.query(UQueries.Updatepassword[hashpassword,Email])
    }catch(error){
        console.error("Error while updating password",error);
        res.status(500).json({message:"Error updating password",error})
    }
}
module.exports={updateLifeInsuranceStatus,updatepassword}