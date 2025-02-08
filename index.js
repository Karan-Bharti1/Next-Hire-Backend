const {databaseInitialiser}=require('./database/databaseConnection')
databaseInitialiser()
const express=require('express')
const app=express()
const cors=require('cors')
const corsOptions={
    origin:'*',
    credentials: true,
    optionsSuccessStatus:200
}
app.use(express.json())
app.use(cors(corsOptions))
const PORT=3000
const Jobs=require('./models/Jobsmodels')
const createJobData=async(jobData)=>{
    try {
        const newJobData=new Jobs(jobData)
        const saveData=await newJobData.save()
        return saveData
    } catch (error) {
        throw error
    }
}
app.post("/jobs",async(req,res)=>{
    try {
        const newJobData=await createJobData(req.body)
        if (newJobData){
        res.status(200).json({message:"Job post added to the database"})}
    } catch (error) {
        res.status(500).json({error:"Error while uploading job post ",error})
    }
})
app.listen(PORT,()=>{
console.log('App is running on PORT:',PORT)
})