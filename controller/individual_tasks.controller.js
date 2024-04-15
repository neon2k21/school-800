const db = require('../config')
const { format, parse } = require('date-fns');



class IndividualTaskController{

    async createTask(req,res){

        const today = new Date();
        const date_of_creation = format(today, 'yyyy-MM-dd');
        
        const { name, description, date_of_deadline, point, student, track } = req.body
        const sql = (
            `insert into individual_task (name, description, date_of_creation, date_of_deadline, point, student, track) values (?, ?, ?, ?, ?, ?, ?);`
        )
        db.all(sql,[name, description, date_of_creation, date_of_deadline, point, student, track], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async getTask(req,res){
        const { task_id } = req.body
        const sql = (
            `select * from individual_task where id=?;`
        )
        db.all(sql,[task_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async deleteTask(req,res){
        const { task_id } = req.body
       
        const sql = (
            `delete from individual_task where id=?;`
        )
        db.all(sql,[task_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }


    async setTaskCompleted(req, res){

        const { task_id } = req.body

        const sql = (
            `update individual_task  set status=1 where id=?;`
        )
        db.all(sql,[task_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })

    }




}



module.exports = new IndividualTaskController()