const request = require('supertest');
const app = require('../app')

describe('\nUSUARIOS', () => {

    var token = ""
    var id = ""
    var city = ""

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

    it('should login a user', async () => {

        const response = await request(app)
            .post('/api/auth/login')
            .send({

                "emailUsuario": "user261@test.com",
                "passwordUsuario": "HolaMundo.01"
            })
            .set('Accept', 'application/json')
            .expect(200)

        token = response.body.token
        id = response.body.user._id

        console.log("TOKEN USUARIO desde el login de usuario " + token)

    })


    it('should get the users', async () => {

        const response = await request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect(200)

    })

    it('should get a user', async () => {
        
        const response = await request(app)
            .get('/api/users/' + id)
            .set('Accept', 'application/json')
            .expect(200)
        
        expect(response.body.nombreUsuario).toEqual('Menganito1')
        city = response.body.ciudadUsuario
        
    })

    it('should get a user from a city', async () => {
    
        const response = await request(app)
            .get('/api/users/user/' + city)
            .set('Accept', 'application/json')
            .expect(200)
        
        console.log("CIUDAD USUARIO de la respuesta " + response.body.ciudadUsuario)
        //expect(response.body.ciudadUsuario).toEqual('Madrid')

    })

    it('should update a user', async () => {
    
        console.log("ID USUARIO " + id)

        console.log("TOKEN USUARIO " + token)

        const response = await request(app)
            .put('/api/users/' + id)
            .send({
                "nombreUsuario": "Menganito2",
                "emailUsuario": "user26@test.com",
                "passwordUsuario": "HolaMundo.01",
                "edadUsuario": 20,
                "sexoUsuario": "Hombre",
                "ciudadUsuario": "Madrid",
                "interesesUsuario": ["futbol", "baloncesto"],
                "permiteOfertas": true
            })
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        
        console.log("NOMBRE USUARIO " + response.body.nombreUsuario)
        
        expect(response.token).toEqual(token)
    })

    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/users/' + id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })

})

describe('\nCOMERCIOS', () => {

    var token = ""
    var id = ""

    it('should login a admin user', async () => {

        const response = await request(app)
         .post('/api/auth/login')
            .send({

                "emailUsuario": "usuario3@gmail.com",
                "passwordUsuario": "1234578P"
            })
            .set('Accept', 'application/json')
            .expect(200)
    
        token = response.body.token

        //console.log("TOKEN USUARIO ADMIN desde el login de usuario " + token)
    })
    
    it('should create a merchant', async () => {

        //console.log("TOKEN USUARIO ADMIN " + token)

        const response = await request(app)
            .post('/api/admin/crearComercio')
            .send({

                "nombreComercio": "Media Markt",
                "cifComercio": "12345678",
                "direccionComercio": "Calle 1",
                "emailComercio": "mediamarkt@gmail.com",
                "passwordComercio": "12345678",
                "telefonoContacto": "4123456789FG"
            })
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        
        token = response.body.token
        //id = response.body.dataComercio._id

        id = "663bb3639d4a460b80e5ebf2"

        //console.log("TOKEN COMERCIO " + token)
        //console.log("ID COMERCIO " + id)

    })

    it('should get the merchants', async () => {
        const response = await request(app)
            .get('/api/comercio')
            .set('Accept', 'application/json')
            .expect(200)
        
    })

    it('should get a merchant', async () => {

        const response = await request(app)
            .get('/api/comercio/' + id)
            .set('Accept', 'application/json')
            .expect(200)
        
        //expect(response.body.dataComercio.nombreComercio).toEqual('Comercio 1')
    })
})