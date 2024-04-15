const express = require('express')
const classRouter = require('./routes/class.routes')
const corpusRouter = require('./routes/corpus.routes')
const group_tasksRouter = require('./routes/group_tasks.routes')
const groupsRouter = require('./routes/groups.routes')
const individual_tasksRouter = require('./routes/individual_tasks.routes')
const portfolioRouter = require('./routes/portfolio.routes')
const rolesRouter = require('./routes/roles.routes')
const trackRouter = require('./routes/track.routes')
const userRouter = require('./routes/user.routes')

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080

const app = express()

app.use(bodyParser.json({limit: '500mb'}))

app.use('/api', classRouter)
app.use('/api', corpusRouter)
app.use('/api', group_tasksRouter)
app.use('/api', groupsRouter)
app.use('/api', individual_tasksRouter)
app.use('/api', portfolioRouter)
app.use('/api', rolesRouter)
app.use('/api', trackRouter)
app.use('/api', userRouter)

var admin = require("firebase-admin");

var serviceAccount = require("./vuzappcursovaya-firebase-adminsdk-e8ymi-717a6727ea.json");

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});



app.listen(PORT, () => console.log(`Сервер запущен с портом: ${PORT}`))


