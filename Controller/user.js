require('dotenv').config();
const connection = require('../db');
const Queries=require('../Queries/CreateQueries.json');
const SQueries=require('../Queries/SelectQueries.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userregister=async(req,res)=>{
    try{
    const{FirstName,LastName,Email,Password,MobileNo,Address}=req.body
    if(!FirstName||!LastName||!Email||!Password||!MobileNo||!Address){
        res.status(400);
        throw new Error("All fields required");
    } 
    const hashedPassword = await bcrypt.hash(Password, 12); 
  await connection.query(Queries.CreateUsersTable);
  const result = await connection.query(Queries.InsertUsers, [
    FirstName,
    LastName,
    Email,
    hashedPassword,
    MobileNo,
    Address,
]);
  res.status(200).send("user register sucessfully")
}
catch(error){
    console.error("error while adding user",error);
    res.status(500).json({message:"Error creating user",error})
}
}

const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        if (!Email || !Password) {
            return res.status(400).send("All fields are required");
        }

        // Query to fetch user by email
        const rows = await connection.query(SQueries.loginuser, [Email]);

        if (rows.length === 0) {
            return res.status(404).send({ error: "User not found." });
        }

        const user = rows[0][0];
        console.log(user);

        if (!user.Password) {
            console.error("Error: No hashed password found in database for user.");
            return res.status(500).json({ error: "Password is missing for this user." });
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(Password, user.Password);
        console.log('User Password:', user.Password);

        if (!match) {
            return res.status(401).json({ error: "Incorrect password." });
        }

        // Generate a JWT token with the user data
        const accessToken = jwt.sign(
            {
                user: {
                    Role: user.Role,
                    Email: user.Email,
                },
            },
            'jwtSecret',  // Use 'jwtSecret' here to sign the token (same as validation)
            { expiresIn: "1d" } // Token expiration time
        );

        console.log(accessToken, user);
        res.status(200).json({ token: accessToken, role: user.Role });

    } catch (Error) {
        console.error("Error in login", Error);
        res.status(500).json({ message: "Error while logging in", Error });
    }
};
const appliylifeinsurance=async(req,res)=>{

    try{
        const{PolicyId,PolicyName,nomineeName,PolicyNo,nomineeAge,nomineeRelation,nomineeAadharnumber}=req.body;
        if(!PolicyId||!PolicyName||!nomineeName||!PolicyNo||!nomineeAge||!nomineeRelation||!nomineeAadharnumber){
            res.status(400).json("All fields are required")
        }
        let newPolicyNo = "LIF000001";
        if (rows.length > 0) {
            const latestPolicyNo= rows[0].PolicyNo;
            const currentIdNumber = parseInt(latestPolicyNo.slice(-6));
            const newIdNumber = currentIdNumber + 1;
            newPolicyNo = `LIF${String(newIdNumber).padStart(6, '0')}`;
        } 
        await connection.query(Queries.createLifeinsurancetable);
        await connection.query(Queries.InsertLifeinsurancetable,[PolicyId,PolicyName,nomineeName,newPolicyNo,nomineeAge,nomineeRelation,nomineeAadharnumber])
        
    }
    catch(error){

    }
}
module.exports={userregister,login,appliylifeinsurance};

