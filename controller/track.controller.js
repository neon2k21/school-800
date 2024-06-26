const db = require('../config')



class TrackController{

    async createTrack(req,res){
        
        const { name, image } = req.body
        const sql = (
            `insert into track (name, image) values (?, ?);`
        )
        db.all(sql,[name, image ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async deleteTrack(req,res){
        const { track_id} = req.body
        const sql = (
            `delete from track where id=?`
        )
        db.all(sql,[track_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async updateTrack(req,res){
        const { track_id,name} = req.body
        const sql = (
            `update track set name=? where id=?`
        )
        db.all(sql,[name, track_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async getTrackName(req,res){
        const {id} = req.body
        const sql = (
            `select * from track where id=?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)
        })

    }
    
}



module.exports = new TrackController()