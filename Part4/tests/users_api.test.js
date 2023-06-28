const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
        //console.log(user)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukai',
            name: 'Matti Luukainen',
            password: 'salainen'
        }

        await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        //console.log('users at the end', usersAtEnd, 'users at start', usersAtStart)
        //console.log('users count',usersAtEnd.len)
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username : 'root',
            name: 'Superuser',
            password: 'salainen',
        }
        console.log('newUser', newUser)
        //const resulttemp = await api.post('/api/users').send(newUser)
        //console.log('result',resulttemp)
        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        //await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        console.log('exited')
        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('creation fails if username is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'name',
            password: 'pass'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('username is required')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is missing', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'internet',
            name: 'name',
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password is required')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if username is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ne',
            name: 'name',
            password: 'welcome'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('username must be at least 3 character long')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation fails if password is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'netuerueoi',
            name: 'name',
            password: 'ti'
        }

        const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password must be at least 3 character long')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })


    afterAll(() => {
        mongoose.connection.close()
    })

})