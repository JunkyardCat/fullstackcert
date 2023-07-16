const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
//const User = require('../models/user')
require('dotenv').config()
require('express-async-errors')

/*
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ','')
    }
    return null
}
*/

blogsRouter.get('/', async (request, response) => {
    const blog = await Blog.find({}).populate('user', { username:1, name:1 })
    if (blog) {
        response.json(blog)
    } else {
        response.status(400).end()
    }
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    //try{
    //const blog = new Blog(request.body)
    //console.log("enter post blog")
    //console.log(decodedToken.id)
    if(!request.token || request.token==='null'){
        return response.status(401).json({ error: 'missing token' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!decodedToken.id){
        return response.status(401).json({ error: 'token invalid' })
    }
    //const user = await User.findById(decodedToken.id)
    const user = request.user
    //console.log(user)
    const blog = await new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    }).populate('user', { username: 1, name: 1 })

    //console.log("request", getTokenFrom(request))
    //console.log(request.token)
    //console.log(decodedToken)
    //const user = await User.findById(decodedToken.id)
    const result = await blog.save()
    response.status(201).json(result)
    //console.log(result)
    user.blogs = user.blogs.concat(result._id)
    await user.save()

    //}catch(error){
    //    next(error)
    //}
})


blogsRouter.delete('/:id', async (request, response) => {
    //try{
    //const user = request.user
    //console.log(request.token)
    //console.log(request)
    if(!request.token || request.token==='null'){
        return response.status(401).json({ error: 'missing token' })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if(!decodedToken.id){
        return response.status(401).json({ error: 'token invalid' })
    }

    //const user = await User.findById(decodedToken.id)
    const user = request.user

    //await Blog.findByIdAndRemove(request.params.id)
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() === user.id.toString()){
        await Blog.deleteOne({ _id:request.params.id })
        response.sendStatus(204).end()
    }else{
        response.status(401).json({ error: 'unauthorized operation' })
    }

    //response.status(204).end()
    //}catch(error){
    //    next(error)
    //}

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {username: 1, name:1})
    updatedBlog ? response.status(200).json(updatedBlog.toJSON()):response.status(404).end()

})

module.exports = blogsRouter