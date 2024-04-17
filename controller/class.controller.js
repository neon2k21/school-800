const db = require('../config')



class ClassController{

    async createClass(req,res){
        
        const { name } = req.body
        const sql = (
            `insert into classsss (name) values (?);`
        )
        db.all(sql,[name], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   
    async getClassName(req, res) {
        const { class_id } = req.body
        const sql = (
            `select name from classsss where id=?;`
        )
        db.all(sql,[class_id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
    }

    async deleteClass(req,res){
        const { class_id} = req.body
        const sql = (
            `delete from classsss where id=?`
        )
        db.all(sql,[class_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }


}



module.exports = new ClassController()