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

module.exports = {
    errorHandler
}