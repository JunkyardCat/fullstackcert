require('dotenv').config()
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {

    test('get all blogs', async () => {
        //const temp = await api.get('/api/blogs')
        //console.log('api url: ',temp)
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    })

    test('verifies that the unique identifier property of the blog posts is named id', async () => {
        const temp = await api.get('/api/blogs')
        //console.log(temp.body)
        const ids = temp.body.map((blog) => blog.id)

        for (const id of ids){
            //console.log(id,ids)
            expect(id).toBeDefined()
        }
    })


})


describe('addition of a new blog', () => {
    let token = null
    beforeAll(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('12345', 10)
        const user = await new User({ username: 'name', passwordHash }).save()
        const userForToken = { username: 'name', id: user.id }
        return (token = jwt.sign( userForToken, process.env.SECRET ))

    })


    test('adding blog verify that the total number of blogs in the system is increased by one', async () => {
        //const initial = await api.get('/api/blogs')

        //console.log('initial',initial.body.length)
        const blog = {
            title: 'one blog',
            author: 'john cena',
            url: 'http://joker.com',
            likes: 10,
        }

        await api.post('/api/blogs').set('Authorization',`Bearer ${token}`).send(blog).expect(201).expect('Content-Type', /application\/json/)
        const end = await helper.blogsInDb()
        expect(end).toHaveLength(helper.initialBlogs.length+1)

        //expect(end.body).toHaveLength(initial.body.length + 1)


    })
    test('if the likes property is missing from the request, it will default to the value 0', async() => {
        const temp = {
            title: 'liketest',
            author: 'like author',
            url: 'www.liketest.com'
        }

        await api.post('/api/blogs').set('Authorization',`Bearer ${token}`).send(temp).expect(201).expect('Content-Type', /application\/json/)
        const end = await helper.blogsInDb()
        expect(end).toHaveLength(helper.initialBlogs.length+1)
        expect(end[end.length-1].likes).toBe(0)

    })

    test('if title and url properties are missing from the request data backend responds with status code 400 BAD Request', async () => {
        const blogStart = await Blog.find({}).populate('user')
        const temp = {
            likes: 32
        }

        await api.post('/api/blogs').set('Authorization',`Bearer ${token}`).send(temp)
        expect(400)
        const end = await Blog.find({}).populate('user')
        expect(end).toHaveLength(blogStart.length)
        expect(blogStart).toEqual(end)

    })

    test('fails with status code is 401 if token isnt supplied post and delete', async () => {
        const blogStart = await Blog.find({}).populate('user')
        const blogDelete = blogStart[0]
        token = null
        //console.log('type of token initial' , typeof(token))
        await api.delete(`/api/blogs/${blogDelete.id}`).set('Authorization',`Bearer ${token}`).expect(401)
        //console.log('inside delete without token')
        const end = await Blog.find({}).populate('user')
        expect(end).toHaveLength(blogStart.length)
        expect(blogStart).toEqual(end)

        await api.post('/api/blogs/').set('Authorization',`Bearer ${token}`).expect(401)
        const end2 = await Blog.find({}).populate('user')
        expect(end2).toHaveLength(blogStart.length)
        expect(blogStart).toEqual(end)
    })


})

describe('deletion of a blog', () => {

    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('12345', 10)
        const user = await new User({ username: 'name', passwordHash }).save()
        const userForToken = { username: 'name', id: user.id }
        token = jwt.sign( userForToken, process.env.SECRET)


        const newBlog = {
            title: 'some good title',
            author: 'so good author',
            url: 'best damn url'
        }

        await api.post('/api/blogs').set('Authorization',  `Bearer ${token}`).send(newBlog).expect(201).expect('Content-Type', /application\/json/)
        return token

    })

    test('deleting a single blog post', async () => {
        //const id = '64970e5708ca1b718124f6b9'
        //const temp = await api.get(`/api/blogs/${id}`)
        //console.log(temp)
        const blogStart = await Blog.find({}).populate('user')
        const blogDelete = blogStart[0]
        //console.log('deleting baby',blogStart,blogDelete)
        await api.delete(`/api/blogs/${blogDelete.id}`).set('Authorization',`Bearer ${token}`)
        expect(204)
        const end = await Blog.find({}).populate('user')
        expect(end).toHaveLength(blogStart.length-1)

    })

})

describe('updating a blog', () => {

    test('updating blog', async () => {
        const id = '5a422b3a1b54a676234d17f9'
        await api.put(`/api/blogs/${ id }`).send({ likes: 90 })
        expect(200)
        const end = await helper.blogsInDb()
        expect(end).toHaveLength(helper.initialBlogs.length)
        const updatedBlog = await Blog.findOne({ '_id': id }).populate('user')
        //console.log(updatedBlog)
        expect(updatedBlog.likes).toBe(90)

    })

})

afterAll(async () => {
    await mongoose.connection.close()
})