const {databaseInitialiser}=require('./database/databaseConnection')
databaseInitialiser()
const fs=require('fs')
const Jobs=require('./models/Jobsmodels')
const jsonData=fs.readFileSync("jobs.json",'utf-8')
const jobsData=JSON.parse(jsonData)
async function seedJobsData(){
    try {
        for(const jobData of jobsData){
            const newJob=new Jobs({
                title:jobData.title,
                companyName: jobData.companyName,
        location: jobData.location,
        salary: jobData.salary,
        type: jobData.type,
        description: jobData.description,
        qualifications: jobData.qualifications
            })
            await newJob.save()
        }
        
    } catch (error) {
        console.log("Error while seeding the data",error) 
    }
}
seedJobsData()