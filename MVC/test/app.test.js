const request = require('supertest');
const app = require('../app')

describe('users', () => {

    var token = ""
    var id = ""

    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({ "name": "Menganito1", "age": 20, "email": "user261@test.com", "password": "HolaMundo.01", role: "user"})
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.name).toEqual('Menganito1')
        expect(response.body.user.email).toEqual('user261@test.com')
        expect(response.body.user.role).toEqual('user')

        token = response.body.token
        id = response.body.user._id
    })
    /*
        it('should get a Unauthorized error', async () => {
            const response = await request(app)
                .get('/api/auth/users')
                .set('Accept', 'application/json')
                .expect(401)
        });
    */
    it('should get the users', async () => {
        const response = await request(app)
            .get('/api/users')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.pop().name).toEqual('Menganito1')
    });

    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/users/' + id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    });

})