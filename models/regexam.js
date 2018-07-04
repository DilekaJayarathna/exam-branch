
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const config = require('../config/database');

const regexamSchema =new schema({

    regno:{type:String,required:true},
    indexno:{type:String,required:true},
    year: {type: String, required:true},
    subcode:{type:String,required:true}

});

const RegExam = module.exports = mongoose.model("RegExam",regexamSchema);

module.exports.saveRegExam = function (newRegExam, callback) {

    newRegExam.save(callback)

};

module.exports.getSubjectByIndex=function(indexno,callback){

    const query = {indexno:indexno}
    RegExam.find(query,callback);
};




