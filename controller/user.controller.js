const db = require('../config')



class UserController{

    async createUser(req,res){
        
        const {fio, login, password, token, grp, classs, age, corpus, misc } = req.body
        const sql = (
            `insert into users (fio, login, password, token, grp, class, age, corpus, misc ) values (?, ?, ?, ?,?,?,?,?,?);`
        )
        db.all(sql,[fio, login, password, token, grp, classs, age, corpus, misc ], (err,rows) => {
            if (err) return res.json(err)
            else return res.json(rows)     
        })
        
    }   

    async getUser(req,res){
        const { login, password} = req.body
        console.log(login, password)
        const sql = (
            `select * from users where (login=? AND pass=?);`
        )
        db.all(sql,[login, password], (err,rows) => {
            if (err) return res.json(err)
            if(rows.length === 0) return res.json('Данные не совпадают! Проверьте и повторите попытку')
            else res.json(rows)
    })
    }

    async getUserData(req,res){
        const { id } = req.body
       
        const sql = (
            `select * from users where id=?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async deleteUser(req,res){
        const { id } = req.body
        const sql = (
            `delete from users where id =?;`
        )
        db.all(sql,[id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
         })
    }    

    async setUserToken(req,res){
        const {user, token} =req.body
        const sql = (
            ` update users set token=? where id=?;`
        )

        db.all(sql,[token, user], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })
    }
   
    async setUserAvatar(req,res){
        const {id,avatar} =req.body
        const sql = (
            ` update users set avatar=? where id=?;`
        )

        db.all(sql,[avatar, id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })
    }

    async setUserIndividualPoints(req,res){
        const {user_id} =req.body
        const indi_points = countPointsForCompleteIndividualTasks(db,user_id)
        const sql = (
            ` update users set individual_points=? where id=?;`
        )

        db.all(sql,[indi_points, user_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })
    }

    async setUserGroupPoints(req,res){
        const {user_id, user_grp} =req.body
        const grp_points = countPointsForCompleteGroupTasks(db, user_id, user_grp)
        const sql = (
            ` update users set group_points=? where id=?;`
        )

        db.all(sql,[grp_points, user_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })
    }

    async setUserGrp(req,res){

        const { user_id, grp } =req.body

        const sql = (
            ` update users set grp=? where id=?;`
        )

        db.all(sql,[grp, user_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })

    }

    async getTotalUserPoints(req,res){
       
        const { user_id } =req.body

        const data = getDataForSum(db, user_id)

        res.json(data.individual_points+data.group_points)
    
    }

    async setIndividualUserCompleteTasks(req,res){
        const {user_id} = req.body
        const object =  countCompletedAndNotCompletedIndividualTasks(db,user_id)
        const sql = (
            ` update users set count_individual_tasks=? where id=?;`
        )

        db.all(sql,[object.completed_tasks, user_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })
    }

    async setGroupUserCompleteTasks(req,res){
        const {user_id, user_grp} = req.body
        const object =  countCompletedAndNotCompletedGroupTasks(db,user_id,user_grp)
        const sql = (
            ` update users set count_grp_tasks=? where id=?;`
        )

        db.all(sql,[object.completed_tasks, user_id], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
        })
    }

    async getAllStatisticsForUserByTracks(req,res){
        const {user_id} = req.body
        const object = await getAllInfoFromIndividualTasksByTracks(db)
        const tracks = await getAllTracks(db)
        let array = []
        for(let i = 0; i < tracks.rows.length; i++){
            let obj = { track: tracks.rows[i].name, completed_tasks: 0, notCompleted_tasks: 0}
            for(let j = 0; j < object.rows.length; j++){
                if(object.rows[i].user == user_id && object.rows[i].status == 1 && object.rows[i].track == tracks.rows[i].id+1) obj.completed_tasks++
                if(object.rows[i].user == user_id && object.rows[i].status == 0 && object.rows[i].track == tracks.rows[i].id+1) obj.notCompleted_tasks++
            }
            array.push(obj)
        }
        res.json(array)
    }

    async getAllStatisticsForUser(req,res){
        const {user_id} = req.body
        const object = await getAllInfoFromIndividualTasksByTracks(db)
        const tracks = await getAllTracks(db)
        let array = []
        for(let i = 0; i < tracks.rows.length; i++){
            let obj = { track: tracks.rows[i].name, completed_tasks: 0, notCompleted_tasks: 0}
            for(let j = 0; j < object.rows.length; j++){
                if(object.rows[i].user == user_id && object.rows[i].status == 1 && object.rows[i].track == tracks.rows[i].id+1) obj.completed_tasks++
                if(object.rows[i].user == user_id && object.rows[i].status == 0 && object.rows[i].track == tracks.rows[i].id+1) obj.notCompleted_tasks++
            }
            array.push(obj)
        }
        res.json(array)
    }

    async getAllUsersData(req,res){
        const sql = (
            `select * from users where role=1;`
        )
        db.all(sql,[], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }

    async getAllUsersDataByGrp(req,res){
        const {grp} = req.body
        const sql = (
            `select * from users where role=1 and grp=?;`
        )
        db.all(sql,[grp], (err,rows) => {
            if (err) return res.json(err)
            else res.json(rows)
    })
    }
}

async function getDataForSum(db, user_id) {

    return new Promise((resolve, reject) => {
        var responseObj;
        db.all(`select * from users where id=${user_id};`, (err, rows) => {
            if (err) {
                responseObj = {
                    'error': err
                };
                reject(responseObj);
            } else {
                responseObj = {
                    rows: rows
                };
                resolve(responseObj);
            }
        });
    });

}

async function countPointsForCompleteIndividualTasks(db,user_id){
    const object = await getAllInfoFromIndividualTasks(db)
    let summ = 0

    for(let i = 0; i < object.rows.length; i++){
        if(object.rows[i].user == user_id && object.rows[i].status == 1) object.rows[i].point++
    }
    return summ
}

async function countPointsForCompleteGroupTasks(db,user_id,user_grp){
    const object = await getAllInfoFromGroupTasks(db)
    let summ = 0

    for(let i = 0; i < object.rows.length; i++){
        if(object.rows[i].user == user_id && object.rows[i].status == 1 && object.rows[i].grp == user_grp ) object.rows[i].point
    }
    return summ
}

async function countCompletedAndNotCompletedIndividualTasks(db,user_id){
    const object = await getAllInfoFromIndividualTasks(db)
    let array = { completed_tasks: 0, notCompleted_tasks: 0}

    for(let i = 0; i < object.rows.length; i++){
        if(object.rows[i].user == user_id && object.rows[i].status == 1 ) array.completed_tasks++
        if(object.rows[i].user == user_id && object.rows[i].status == 0 ) array.notCompleted_tasks++
    }
    return array
}

async function countCompletedAndNotCompletedGroupTasks(db,user_id,user_grp){
    const object = await getAllInfoFromGroupTasks(db)
    let array = { completed_tasks: 0, notCompleted_tasks: 0}

    for(let i = 0; i < object.rows.length; i++){
        if(object.rows[i].user == user_id && object.rows[i].status == 1 && object.rows[i].grp == user_grp ) array.completed_tasks++
        if(object.rows[i].user == user_id && object.rows[i].status == 0 && object.rows[i].grp == user_grp) array.notCompleted_tasks++
    }
    return array
}

async function getAllInfoFromIndividualTasksByTracks(db) {

    return new Promise((resolve, reject) => {
        var responseObj;
        db.all(`SELECT individual_tasks.id, individual_tasks.name AS task_name, individual_tasks.description, 
        individual_tasks.date_of_creation, individual_tasks.date_of_deadline, 
        individual_tasks.point, individual_tasks.status, 
        track.name AS track_name
 FROM individual_tasks
 JOIN track ON individual_tasks.track = track.id;
 `, (err, rows) => {
            if (err) {
                responseObj = {
                    'error': err
                };
                reject(responseObj);
            } else {
                responseObj = {
                    rows: rows
                };
                resolve(responseObj);
            }
        });
    });

}

async function getAllInfoFromIndividualTasks(db) {

    return new Promise((resolve, reject) => {
        var responseObj;
        db.all(`select * from individual_tasks;`, (err, rows) => {
            if (err) {
                responseObj = {
                    'error': err
                };
                reject(responseObj);
            } else {
                responseObj = {
                    rows: rows
                };
                resolve(responseObj);
            }
        });
    });

}

async function getAllInfoFromGroupTasks(db) {

    return new Promise((resolve, reject) => {
        var responseObj;
        db.all(`select * from group_task;`, (err, rows) => {
            if (err) {
                responseObj = {
                    'error': err
                };
                reject(responseObj);
            } else {
                responseObj = {
                    rows: rows
                };
                resolve(responseObj);
            }
        });
    });

}

async function getAllTracks(db) {

    return new Promise((resolve, reject) => {
        var responseObj;
        db.all(`select * from track;`, (err, rows) => {
            if (err) {
                responseObj = {
                    'error': err
                };
                reject(responseObj);
            } else {
                responseObj = {
                    rows: rows
                };
                resolve(responseObj);
            }
        });
    });

}



module.exports = new UserController()