const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const errorHandler = (error, request, response, next) => {
    //console.log('inside error handler middleware')
    //console.log(error)
    //console.error('---')
    //console.error(error.message)
    //console.error(error.name)
    //console.error('---')
    if(error.name === 'SequelizeValidationError'){
        return response.status(400).send({error: error.message})
    }
    if(error.name === 'SequelizeDatabaseError'){
        return response.status(400).send({error: error.message})
    }
    next(error)
}

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

module.exports = {
    errorHandler, tokenExtractor
}