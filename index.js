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
const readAllJobsData=async () => {
    try {
       const jobsData=await Jobs.find()   
       return jobsData
    } catch (error) {
        throw error
    }
}
app.get("/",async(req,res)=>{
  try {
    const jobsData=await readAllJobsData()
    if(jobsData && jobsData.length>0){
        res.status(200).json(jobsData)
    }else{
        res.status(404).json({error:"Jobs Data Not found"})
    }
  } catch (error) {
    res.status(500).json({error:"Error while fetching data ",error})
  }  
})
const getDataById=async(jobId)=>{
try {
   const jobData=await Jobs.findById(jobId) 
   return jobData
} catch (error) {
    throw error
}
}
app.get("/jobs/:jobId",async (req,res) => {
    try {
        const jobData=await getDataById(req.params.jobId)
        if(jobData){
            res.status(200).json(jobData)
        }else{
            res.status(404).json({error:"Job Data Not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Error while fetching data ",error})   
    }
})
const deleteJobDataById=async(jobId)=>{
    try {
       const jobData=await Jobs.findByIdAndDelete(jobId) 
       return jobData
    } catch (error) {
        throw error
    }
    }
    app.delete("/jobs/:jobId",async (req,res) => {
        try {
            const jobData=await deleteJobDataById(req.params.jobId)
            if(jobData){
                res.status(200).json({message:"Data deleted successfully"})
            }else{
                res.status(404).json({error:"Job Data Not found"})
            }
        } catch (error) {
            res.status(500).json({error:"Error while deleting data ",error})   
        }
    })
    
app.listen(PORT,()=>{
console.log('App is running on PORT:',PORT)
})