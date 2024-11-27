const express=require('express');
const app= express();
const admin=require('./Routes/adminroutes')
const agent=require('./Routes/agentroutes')
const User=require('./Routes/userroutes')
app.use(express.json());

app.use('/admin',admin);
app.use('/agent',agent);
app.use('/user',User);
app.listen(5000,()=>{
    console.log("server running");
})