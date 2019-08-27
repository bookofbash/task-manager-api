const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneID, userOne, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name:'Bashir',
        email:'bashir@example.com',
        password: 'Mypass12345!'
    }).expect(201)

    //Assert that the database was changed correctly
    const user = User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Bashir',
            email: 'bashir@example.com'
        }
    })
    expect(user.password).not.toBe('Mypass12345!')
})



test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    
    //Assert that the token in the response matches users second token
    const user = await User.findById(userOneID)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non-existing user', async () => {
    await request(app).post('/users/login').send({
        email:'noname@example.com',
        password: '12345678'
    }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unathenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    
        //Validate user is removed
    const user = await User.findById(userOneID) 
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated users', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
    
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

        const user = await User.findById(userOneID)
        expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            name: 'Johnathan'
        })
        .expect(200)
        const user = await User.findById(userOneID)
        expect(user.name).toBe('Johnathan')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
        .send({
            location: 'Miami'
        })
        .expect(400)
})