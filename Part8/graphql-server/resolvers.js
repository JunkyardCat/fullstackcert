require('dotenv').config()
const { UserInputError, AuthenticationError } = require('@apollo/server')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async (root, args) => {
      return Author.find({})
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate('author')
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        //return Book.find({ author: { $exists: args.author } })
        return Book.find({ author: { $in: author.id } }).populate('author')
      }
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate('author')
      }
      return Book.find({}).populate('author')
    },
  },
  Author: {
    bookCount: async (root) =>
      //books.filter((book) => book.author === root.name).length,
      await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log('inside addBook server mutation', args, context.currentUser)
      let author = await Author.findOne({ name: args.author })
      console.log('inside addBook server mutation 02', author)
      if (!author) {
        console.log('inisde !author')
        author = new Author({ name: args.author })
        try {
          await author.save()
          console.log('passed saving author')
        } catch (error) {
          console.log('inside author error', error.message)
          throw new UserInputError(error.message)
        }
      }
      const book = await new Book({ ...args, author: author.id }).populate(
        'author'
      )
      console.log('after getting new book', book)
      try {
        await book.save()
        console.log('pass saving books')
      } catch (error) {
        console.log('inside book error', error.message)
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      console.log('inside addBook server mutation 03 final step', book)
      const temp = await book.populate('author')
      console.log('inside final 04', temp)
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
      //return temp
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      console.log('inside editAutho server', author)
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const test = await User.find({})
      console.log('login 01', user, args.username)
      if (!user || args.password !== '1234') {
        console.log('inside login error', error.message)
        throw new UserInputError('wrong credentials')
      }
      const userToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userToken, process.env.SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
}

module.exports = resolvers
