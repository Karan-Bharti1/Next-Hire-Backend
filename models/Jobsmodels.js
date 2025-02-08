const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"]
    },
    description: [{
        type: String
    }],
    qualifications: [{
        type: String
    }]
}, {
    timestamps: true
});

const Jobs = mongoose.model("Jobs", JobSchema);
module.exports = Jobs;
