const express = require('express');
const router = express.Router();
const RegExam = require('../models/regexam');
const config = require('../config/database');

router.post("/regexam",(req,res)=>{

    const newRegExam = new RegExam({
        regno:req.body.regno,
        indexno:req.body.indexno,
        year:req.body.year,
        subcode:req.body.subcode
    });


    RegExam.saveRegExam(newRegExam, function (err,regexam) {
        if(err){
            res.json({success: false, msg: 'Exam not registered'});
        }
        if(regexam){
            res.json({success:true, msg:'Exam registered'});
        }
    });

});


router.get('/registered', (req, res) => {

        RegExam.find({}, (err, regexams) => {

            if (err)
                res.status(500).json({errmsg: err});
            res.status(200).json({msg: regexams});
        });

});

router.get('/regexam/:indexno',function(req,res,next){

    const indexno = req.params.indexno;
    RegExam.getSubjectByIndex(indexno, function(err,regexam){
       if(err){
           res.json({success:false,msg:'Fail to load'});
       }
       else{
           console.log(regexam);
           res.json({success:true,regexam:regexam});
       }
    });
});


module.exports = router;