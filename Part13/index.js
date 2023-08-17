//require('dotenv').config()
//const {Sequelize, QueryTypes, Model, DataTypes} =  require('sequelize')
const express = require('express')
const middleware = require('./util/middleware')
const app = express()

const {PORT} = require('./util/config')
const {connectToDatabase} = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const readingListRouter = require('./controllers/readinglist')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/readinglists', readingListRouter)

const start = async () =>{
    await connectToDatabase()
    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`)
    })
}

app.use(middleware.errorHandler)

start()

/*
const sequelize = new Sequelize(process.env.DATABASE_URL)

class Blog extends Model {}
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
},{
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})

app.get('/api/blogs', async(req, res) => {
    //const blogs = await sequelize.query("SELECT * FROM blogs", {type:QueryTypes.SELECT})
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.post('/api/blogs', async (req,res) => {
    console.log(req.body, typeof req.body)
    try{
        const blog = await Blog.create(req.body)
        return res.json(blog)
    }catch(error){
        return res.status(400).json({error})
    }
})

app.delete('/api/blogs/:id', async (req,res) => {
    console.log(req.params.id)
    const blog = await Blog.findByPk(req.params.id)
    console.log(blog)
    if(blog){
        blog.destroy()
        console.log('deleting blog')
        //res.json(blog)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
*/