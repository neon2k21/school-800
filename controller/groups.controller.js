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

    async getAllGroups(req,res){

        const sql = (
            `select (id, name) from groupes;`
        )
        db.all(sql,[], (err,rows) => {
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

    async setTaskforGroups(req,res){
        
        const { group_id, grp_task } = req.body
        const sql = (
            `update groupes set grp_task=? where id=?:`
        )
        db.all(sql,[grp_task, group_id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async getImageOfGroup(req, res){
        const { grp_id } = req.body

        const sql = (
            `select image from groupes where id=?`
        )
        db.all(sql,[grp_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

}



module.exports = new GroupsController()