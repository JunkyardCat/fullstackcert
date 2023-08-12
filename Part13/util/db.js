const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)
const connectToDatabase = async () => {
    console.log(DATABASE_URL)
    try{
        await sequelize.authenticate()
        console.log('connected to database')
    }catch(err){
        console.log('failed to connect to the database',err)
        return process.exit(1)
    }
    return null
}

module.exports = {connectToDatabase, sequelize}