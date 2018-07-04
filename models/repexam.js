
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const config = require('../config/database');

const repexamSchema =new schema({

    regno:{type:String,required:true},
    indexno:{type:String,required:true},
    year: {type: String, required:true},
    subcode:{type:String,required:true},
    turn:{type:String,requires:true},

});

const RepExam = module.exports = mongoose.model("RepExam",repexamSchema);

module.exports.saveRepExam = function (newRepExam, callback) {

    newRepExam.save(callback)

};
module.exports.getSubjectByIndex=function(indexno,callback){

    const query = {indexno:indexno}
    RepExam.find(query,callback);
};




