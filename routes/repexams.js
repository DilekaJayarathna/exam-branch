const express = require('express');
const router = express.Router();
const RepExam = require('../models/repexam');
const config = require('../config/database');

router.post("/repexam",(req,res)=>{

    const newRepExam = new RepExam({
        regno:req.body.regno,
        indexno:req.body.indexno,
        year:req.body.year,
        subcode:req.body.subcode,
        turn:req.body.turn
    });


    RepExam.saveRepExam(newRepExam, function (err,repexam) {
        if(err){
            res.json({success: false, msg: 'Exam not registered'});
        }
        if(repexam){
            res.json({success:true, msg:'Exam registered'});
        }
    });

});


router.get('/registered', (req, res) => {

    RepExam.find({}, (err, repexams) => {

        if (err)
            res.status(500).json({errmsg: err});
        res.status(200).json({msg: repexams});
    });

});


router.get('/repexam/:indexno',function(req,res,next){

    const indexno = req.params.indexno;
    RepExam.getSubjectByIndex(indexno, function(err,repexam){
        if(err){
            res.json({success:false,msg:'Fail to load'});
        }
        else{
            console.log(repexam);
            res.json({success:true,repexam:repexam});
        }
    });
});


module.exports = router;