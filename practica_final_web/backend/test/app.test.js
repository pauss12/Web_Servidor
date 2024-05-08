const request = require('supertest');
const app = require('../app')

describe('users', () => {

    var token = ""
    var id = ""

    it('should register a user', async () => {

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                "nombreUsuario": "Menganito1",
                "emailUsuario": "user261@test.com",
                "passwordUsuario": "HolaMundo.01",
                "edadUsuario": 20,
                "sexoUsuario": "Hombre",
                "ciudadUsuario": "Madrid",
                "interesesUsuario": ["futbol", "baloncesto"],
                "permiteOfertas": true
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.emailUsuario).toEqual('user261@test.com'),

        token = response.body.token
        id = response.body.user._id
    })
    
    /*it('should get a Unauthorized error', async () => {
        const response = await request(app)
            .get('/api/auth/users')
            .set('Accept', 'application/json')
            .expect(401)
    });*/
    
    it('should get the users', async () => {
        const response = await request(app)
            .get('/api/users')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.pop().nombreUsuario).toEqual('Menganito1')
    });

    it('should get a user', async () => {
        
        const response = await request(app)
            .get('/api/users/' + id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        
        expect(response.body.nombreUsuario).toEqual('Menganito1')
        
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