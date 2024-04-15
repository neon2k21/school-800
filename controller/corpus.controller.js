const db = require('../config')



class CorpusController{

    async createCropus(req,res){
        
        const { name,address } = req.body
        const sql = (
            `insert into corpus (name,address) values (?, ?);`
        )
        db.all(sql,[name,address], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async deleteCorpus(req,res){
        const { corpus_id} = req.body
        const sql = (
            `delete from corpus where id=?`
        )
        db.all(sql,[corpus_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }


}



module.exports = new CorpusController()