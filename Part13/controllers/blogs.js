//const jwt = require('jsonwebtoken')
const router = require('express').Router()
const {Blog, User} = require('../models')
//const { SECRET } = require('../util/config')
const { Op } = require('sequelize')
const {tokenExtractor} = require('../util/middleware')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    //console.log('inside blogFinder', req.params.id, req.blog)
    //console.log('inside blogFinder 02', req.blog.likes)
    next()
}
/*
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    //console.log('auth token: ',authorization, SECRET, authorization.substring(7))
    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        try{
            //console.log('im inside the try')
            //console.log('what the',jwt.verify(authorization.substring(7), SECRET))

            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
            console.log('im inside here extractor', req.decodedToken)
        }catch{
            return res.status(401).json({error: 'token invalid'})
        }
    }else{
        return res.status(401).json({error: 'token missing'})
    }
    next()
}
*/
/*
const errorHandler = (error, request, response, next) =>{
    console.error('inside error handler')
    console.error(error.message)
    next(error)
}
*/

router.get('/', async(req, res) => {
    //const where = {}
    /*
    if(req.query.search){
        where.title = {
            [Op.substring]: req.query.search,
        }
        where.user = {
            [Op.substring]: req.query.search
        }
    }
    */
    let where = {}
   if(req.query.search){
        where = {
            [Op.or]: [
                
                    {title:{[Op.substring]: req.query.search}},
                    {author:{[Op.substring]: req.query.search}}
                
            ]
        }
   }
    /*
    if(req.query.search){
        where: {
            [Op.or]: [
                {title: {[Op.substring]: req.query.search}},
                {name: {[Op.substring]: req.query.search}},
            ]
        }
    }
    */
    console.log('inside get', where)
    //const blogs = await sequelize.query("SELECT * FROM blogs", {type:QueryTypes.SELECT})
    const blogs = await Blog.findAll({
        attributes: {exclude:['userId']},
        include:{
            model: User,
            attributes:['name']
        },
        where,
        order:[['likes', 'DESC']]
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req,res,next) => {
    //console.log(req.body, typeof req.body)
    try{
        //const user = await User.findOne()
        //const blog = await Blog.create({...req.body, userId:user.id})
        const user = await User.findByPk(req.decodedToken.id)
        console.log('inside create blog', user, user.id)
        const blog = await Blog.create({...req.body, userId:user.id, date: new Date()})
        res.json(blog)
    }catch(error){
        //console.log('inside post error catch')
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

router.delete('/:id', tokenExtractor,blogFinder, async (req,res) => {
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

    //const user = req.username
    //const blog = await Blog.findByPk(req.params.id)
    /*
    const user = await User.findOne({
        where:{
            username: req.body.username
        }
    })
    */
    //req.blog.userId === req.body.username
    
    if(!req.decodedToken.id){
        return res.status(401).json({error: 'token invalid'})
    }

    console.log('inside delete',req.blog, req.decodedToken.id)

        if(req.blog.userId === req.decodedToken.id){
            console.log('user matched')
            await req.blog.destroy()
            res.status(204).end()
        }else{
            res.status(401).json({error: 'unauthorized operation'})
        }
    }

       /* 
    if(req.blog){
        await req.blog.destroy()
    }
    res.status(204).end()
    */
)

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
            //console.log('inside put if',req.blog, req.body)
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