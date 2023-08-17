const Blog = require('./blog')
const ReadingList = require('./readinglist')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)
//Blog.sync({alter: true})
//User.sync({alter: true})

User.belongsToMany(Blog, {through: ReadingList, as: 'reading'})
Blog.belongsToMany(User, {through: ReadingList})

module.exports = {Blog, User, ReadingList}