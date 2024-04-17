const db = require('../config')
const { format, parse } = require('date-fns');



class GroupTaskController{

    async createTask(req,res){

        const today = new Date();
        const date_of_creation = format(today, 'yyyy-MM-dd');
        
        const { name, description, date_of_deadline, point, grp,track } = req.body
        const sql = (
            `insert into group_task (name, description, date_of_creation, date_of_deadline, point, grp, track) values (?, ?, ?, ?, ?, ?, ?);`
        )
        db.all(sql,[name, description, date_of_creation, date_of_deadline, point, grp, track], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async getTask(req,res){
        const { task_id } = req.body
        const sql = (
            `select * from group_task where id=?;`
        )
        db.all(sql,[task_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async deleteTask(req,res){
        const { task_id } = req.body
       
        const sql = (
            `delete from group_task where id=?;`
        )
        db.all(sql,[task_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async setTaskCompleted(req, res){

        const { task_id } = req.body

        const sql = (
            `update group_task set status=1 where id=?;`
        )
        db.all(sql,[task_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })

    }
    
    async getAllGroupTasks(req, res){
        const { grp } = req.body
        const sql = (
            `select * from group_task where grp=?;`
        )
        db.all(sql,[grp], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async getAllGroupTasksData (req,res) {
        const sql = (
            `select * from group_task;`
        )
        db.all(sql,[], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

}



module.exports = new GroupTaskController()