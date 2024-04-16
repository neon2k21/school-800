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
        const { portfolio_id} = req.body
        const sql = (
            `delete from portfolio where id=?`
        )
        db.all(sql,[portfolio_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async setPortfolioScore(req,res){
        const { portfolio_id, score} = req.body
        const sql = (
            `update portfolio set score=? where id=?`
        )
        db.all(sql,[score, portfolio_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }
}



module.exports = new PortfolioController()