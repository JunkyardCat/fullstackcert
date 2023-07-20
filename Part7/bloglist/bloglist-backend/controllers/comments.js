const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments)
})

commentsRouter.post('/', async (request, response) => {
  const temp = request.body
  const comment = new Comment({
    comment: temp.comment,
    blog: temp.blog,
  })
  const result = await comment.save()
  response.status(201).json(result)
})

module.exports = commentsRouter
