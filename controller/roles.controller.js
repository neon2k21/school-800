const db = require('../config')



class TrackController{

    async createRole(req,res){
        
        const { name } = req.body
        const sql = (
            `insert into roles (name) values (?);`
        )
        db.all(sql,[name], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async deleteRole(req,res){
        const { role_id} = req.body
        const sql = (
            `delete from roles where id=?`
        )
        db.all(sql,[role_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async updateRole(req,res){
        const { role_id,name} = req.body
        const sql = (
            `update roles set name=? where id=?`
        )
        db.all(sql,[name, role_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }
}



module.exports = new TrackController()