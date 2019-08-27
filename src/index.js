const app = require('./app')
const port = process.env.PORT

app.listen(port, () => console.log( "server is up on port "+ port))
//Get Mongod running
///Users/BashHome/mongodb/bin/mongod --dbpath=/Users/BashHome/mongodb-data
