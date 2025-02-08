const mongoose=require('mongoose')
const JobSchema=new mongoose.Schema({
title:{
    type:String,
    required:true
},
companyName:{type:String,
    required:true},
location:{
    type:String,
    required:true
},
salary:{
    type:Number,
    required:true
},
type:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
qualifications:[{
    type:String,
    required:true
}]
},{
    timestamps:true
})
const Jobs=mongoose.model("Jobs",JobSchema)
module.exports=Jobs;