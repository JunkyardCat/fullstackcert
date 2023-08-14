const router = require('express').Router()
const {User} = require('../models')
const {Blog} = require('../models')
const {sequelize} = require('../util/db')

router.get('/', async (req,res) => {
    //const blogs = await sequelize.query("SELECT * FROM blogs", {type:QueryTypes.SELECT})
    
    //attributes: {exclude:['userId']}
    const users = await User.findAll({
        attributes: [
            'name',
            [sequelize.fn('sum', sequelize.col('likes')),'totalLikes'],
            [sequelize.fn('COUNT', sequelize.col('title')),'totalBlogs']
        ],
        include: {
            model: Blog,
            attributes: []
        },
        group: ['user.id']
    })
    res.json(users)
})

router.post('/', async (req, res,next) => {
    try{
        const user = await User.create(req.body)
        res.json(user)
    }catch(error){
        //return res.status(400).json({error})
        next(error)
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(404).end()
    }
})

router.put('/:username', async(req, res, next)=> {
    try{

        const user = await User.findOne({
            where:{
                username: req.params.username
            }
        })
        console.log('inside user put:', user,req.body,req.params.username)
        if(user){
            user.username = req.body.username
            await user.save()
            res.json(user)
        }else{
            res.status(400).end()
        }
    }catch(error){
        next(error)
    }
})

module.exports = router