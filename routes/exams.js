const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');
const config = require('../config/database');

router.post("/publishexam",(req,res)=>{

    const newExam = new Exam({
        edate:req.body.edate,
        starttime:req.body.starttime,
        endtime:req.body.endtime,
        year:req.body.year,
        code:req.body.code,
        subject:req.body.subject,
        venue:req.body.venue
    });


    Exam.saveExam(newExam, function (err,exam) {
        if(err){
            res.json({success: false, msg: 'Exam not published'});
        }
        if(exam){
            res.json({success:true, msg:'Exam published'});
        }
    });



});



router.get('/read', (req, res) => {
    Exam.find({},(err, exams) => {

        if(err)
            res.status(500).json({errmsg:err});
        res.status(200).json({msg:exams});
    });
});

router.put('/update',(req,res,next)=>{

    Exam.findById(req.body._id,(err,exam)=>{
       if(err){
           res.status(500).json({errmsg:err});
       }

       exam.edate=req.body.edate;
       exam.starttime=req.body.starttime;
       exam.endtime=req.body.endtime;
       exam.year=req.body.year;
       exam.code=req.body.code;
       exam.subject=req.body.subject;
       exam.venue=req.body.venue;

       exam.save((err,exam)=>{
           if(err)
               res.status(500).json({errmsg:err});
           res.status(200).json({msg:exam});
       });
    })

});

router.delete('/delete/:id',(req,res,next)=>{

    Exam.findOneAndRemove({_id:req.params.id}, (err,exam)=>{
        if(err)
            res.status(500).json({errmsg:err});
        res.status(200).json({msg:exam});
    })

});

module.exports = router;