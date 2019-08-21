const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => console.log( "server is up on port "+ port))
//Get Mongod running
///Users/BashHome/mongodb/bin/mongod --dbpath=/Users/BashHome/mongodb-data
