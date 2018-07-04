
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const config = require('../config/database');

const examSchema =new schema({

    edate:{type:String,required:true},
    starttime:{type:String,required:true},
    endtime: {type: String, required: true},
    year: {type: String, required:true},
    code:{type:String,required:true},
    subject:{type:String,required:true},
    venue:{type:String,required:true},
    posted:{type:Date, default: Date.now()}
});

const Exam = module.exports = mongoose.model("Exam",examSchema);

module.exports.saveExam = function (newExam, callback) {

    newExam.save(callback)

};



