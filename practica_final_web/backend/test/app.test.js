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

        //console.log("TOKEN USUARIO desde el login de usuario " + token)

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
        
        //console.log("CIUDAD USUARIO de la respuesta " + response.body.ciudadUsuario)
        //expect(response.body.ciudadUsuario).toEqual('Madrid')

    })

    it('should update a user', async () => {
    
        //console.log("TOKEN USUARIO " + token)

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
        
        //console.log("NOMBRE USUARIO " + response.body.nombreUsuario)
        expect(response.body.user.nombreUsuario).toEqual('Menganito2')

        //console.log("TOKEN USUARIO antes de modificarlo ---------" + token)
        //console.log("TOKEN USUARIO antes de modificarlo RESPUESTA " + token)

        token = response.body.token
        id = response.body.user._id

        //console.log("TOKEN USUARIO al modificarlo" + token)
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

    var tokenComercio = ""
    var tokenAdmin = ""
    var id = ""

    it('should login a admin user', async () => {

        const response = await request(app)
         .post('/api/auth/login')
            .send({

                "emailUsuario": "usuario1@gmail.com",
                "passwordUsuario": "12345678"
            })
            .set('Accept', 'application/json')
            .expect(200)
    
        tokenAdmin = ""
        tokenAdmin = response.body.token

        //console.log("TOKEN USUARIO ADMIN desde el login de usuario " + token)
    })
    
    it('should create a merchant', async () => {

        //console.log("TOKEN USUARIO ADMIN " + tokenAdmin)

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
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        
        tokenComercio = response.body.token
        //id = response.body.dataComercio._id

        //console.log("TOKEN COMERCIO " + token)
        console.log("ID COMERCIO " + id)

    })

    it('should login a merchant', async () => {

        tokenComercio = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNjMGZjNDc2YjRlMWQ4YmQzZGQ2Y2EiLCJpYXQiOjE3MTUyMTIyMjgsImV4cCI6MTcxNTIxOTQyOH0.fFryOl1q786sFdKyFJ89WbmM52rIo7duEGUoeuiPInM"

        
        const response = await request(app)
            .post('/api/comercio/loginComercio')
            .send({

                "emailComercio": "comercio1@gmail.com",
                "passwordComercio": "hola12345"
            })
            .auth(tokenComercio, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)

        tokenComercio = response.body.token
        id = response.body.dataComercio._id

        //console.log("TOKEN USUARIO desde el login de usuario " + token)

    })


    it('should get the merchants', async () => {
        const response = await request(app)
            .get('/api/comercio')
            .set('Accept', 'application/json')
            .expect(200)
        
    })

    it('should get a merchant', async () => {

        id = "663c0fc476b4e1d8bd3dd6ca"

        const response = await request(app)
            .get('/api/comercio/' + id)
            .set('Accept', 'application/json')
            .expect(200)
        
        //expect(response.body.dataComercio.nombreComercio).toEqual('Comercio 1')
    })

    it('should update a merchant', async () => {

        /*tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNiYjc5ZDUyZjYwNmQ3YThmMWE3ZmYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTUyMTE2NzUsImV4cCI6MTcxNTIxODg3NX0.H-Bw2Tj283yrmb05dIniTh9mA7mn6zyXFdZvic1nYZ0"*/

        id = "663c0fc476b4e1d8bd3dd6ca"

        const response = await request(app)
            .put('/api/admin/' + id)
            .send({
                "nombreComercio": "COM",
                "cifComercio": "12345678",
                "direccionComercio": "Calle 1",
                "emailComercio": "com@gmail.com",
                "passwordComercio": "hola12345",
                "telefonoContacto": "611452480"
            })
            .auth(tokenAdmin, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        
        tokenComercio = response.body.token
        id = response.body.dataComercio._id
        
        //expect(response.body.dataComercio.nombreComercio).toEqual('Media Markt')

    })
})