const router = require('express').Router()
const {User} = require('../models')
const {Blog} = require('../models')

router.get('/', async (req,res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: {exclude:['userId']}
        }
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