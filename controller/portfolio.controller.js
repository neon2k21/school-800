const db = require('../config')



class PortfolioController{

    async createPortfolio(req,res){
  
        const { user, name, level, place, track, image } = req.body
        const sql = (
            `insert into portfolio (user, name, level, place, track, image) values (?, ?, ?,?,?,?);`
        )
        db.all(sql,[user, name, level, place, track, image], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async deletePortfolio(req,res){
        const { id} = req.body
        const sql = (
            `delete from portfolio where id=?`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async setPortfolioScore(req,res){
        const { id, score} = req.body
        console.log(id,score)
        const sql = (
            `update portfolio set score=?, chacked=1 where id=?`
        )
        db.all(sql,[score, id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async getAllPortfolioForCheck(req, res){

        const sql = (
            `SELECT *
            FROM portfolio
            JOIN users ON portfolio.user = users.id
            where chacked=0;`
        )
        db.all(sql,[], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })

    }

}





module.exports = new PortfolioController()