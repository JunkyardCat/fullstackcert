const router = require('express').Router()
const {Blog} = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    console.log('inside blogFinder', req.params.id, req.blog)
    console.log('inside blogFinder 02', req.blog.likes)
    next()
}
/*
const errorHandler = (error, request, response, next) =>{
    console.error('inside error handler')
    console.error(error.message)
    next(error)
}
*/

router.get('/', async(req, res) => {
    //const blogs = await sequelize.query("SELECT * FROM blogs", {type:QueryTypes.SELECT})
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req,res,next) => {
    console.log(req.body, typeof req.body)
    try{
        const blog = await Blog.create(req.body)
        res.json(blog)
    }catch(error){
        console.log('inside post error catch')
        //return res.status(400).json({error})
        next(error)
    }
})

router.get('/:id', blogFinder, async (req,res) => {
    /*
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
        res.json(blog)
    }else{
        res.status(404).end()
    }
    */
    if(req.blog){
        res.json(req.blog)
    }else{
        res.status(404).end()
    }
})

router.delete('/:id', blogFinder, async (req,res) => {
    //console.log(req.params.id)
    /*
    const blog = await Blog.findByPk(req.params.id)
    //console.log(blog)
    if(blog){
        await blog.destroy()
        //console.log('deleting blog')
        //res.json(blog)
    }
    res.status(204).end()
    */
        
    if(req.blog){
        await req.blog.destroy()
    }
    res.status(204).end()
})

router.put('/:id', blogFinder, async (req,res,next) => {
    /*
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
        blog.likes = req.body.likes
        await blog.save()
        res.json(blog)
    }else{
        res.status(400).end()
    }
    */
    try{
        if(req.blog){
            console.log('inside put if',req.blog, req.body)
            req.blog.likes = req.body.likes
            await req.blog.save()
            res.json(req.blog)
        }else{
            res.status(400).end()
        }
    }catch(error){
        next(error)
    }
    
})

module.exports = router