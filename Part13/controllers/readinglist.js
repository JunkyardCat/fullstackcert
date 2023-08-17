const { ReadingList } = require('../models')
const {tokenExtractor} = require('../util/middleware')

const router = require('express').Router()
router.get('/',async(req,res)=>{
    const list = await ReadingList.findAll({
        attributes: ['blogId','userId']
    })
    res.json(list)
})

router.put('/:id',tokenExtractor,async(req,res)=>{
    if(!req.decodedToken.id){
        return res.status(401).json({error: 'token invalid'})

    }
    
    const list = await ReadingList.findByPk(req.params.id)

    console.log('inside put reading list', req.decodedToken.id, list)
    if(list && list.userId===req.decodedToken.id){
        list.read=req.body.read
        await list.save()
        res.json(list)
    }else{
        res.status(400).end()
    }
})

module.exports = router