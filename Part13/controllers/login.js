const jwt = require('jsonwebtoken')
const router = require('express').Router()

const {SECRET} = require('../util/config')
const User = require('../models/user')
const { response } = require('express')

router.post('/', async (req, res) => {
    const body = req.body
    //console.log('inside login', req.body)
    const user = await User.findOne({
        where: {
            username: body.username
        }
    })
    const passwordCorrect = body.password === 'secret'
    if(!(user && passwordCorrect)){
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }
    
    const userForToken = {
        username: user.username,
        id: user.id
    }
    //console.log('secret ', SECRET)
    const token = jwt.sign(userForToken, SECRET)
    
    res.status(200).send({token, username: user.username, name: user.name})
})

module.exports = router

