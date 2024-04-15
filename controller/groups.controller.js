const db = require('../config')



class GroupsController{

    async createGroup(req,res){
        
        const { name, description, track } = req.body
        const sql = (
            `insert into groupes (name, description, track) values (?, ?, ?);`
        )
        db.all(sql,[name, description, track], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async deleteGroup(req,res){
        const { group_id} = req.body
        const sql = (
            `delete from groupes where id=?`
        )
        db.all(sql,[group_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

}



module.exports = new GroupsController()