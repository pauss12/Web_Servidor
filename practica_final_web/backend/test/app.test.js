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
                "nombreUsuario": "Paula",
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

        expect(response.body.nombreUsuario).toEqual('Paula')

        city = response.body.ciudadUsuario

    })

    it('should get a user from a city', async () => {

        const response = await request(app)
            .get('/api/users/user/' + city)
            .set('Accept', 'application/json')
            .expect(200)
        
        expect(response.body[0].ciudadUsuario).toEqual(city)

    })

    it('should update a user', async () => {

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

        expect(response.body.user.nombreUsuario).toEqual('Menganito2')

        token = response.body.token
        id = response.body.user._id
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
    var idComercio = ""
    var idWeb = ""
    var city = ""

    it('should login a admin user', async () => {

        const response = await request(app)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .send({

                emailUsuario: "usuario1@gmail.com",
                passwordUsuario: "12345678"
            })
            .expect(200)
        expect(response.body.user.emailUsuario).toEqual('usuario1@gmail.com')
        expect(response.body.user.role).toEqual('admin')

        tokenAdmin = response.body.token
    })

    it('should create a merchant', async () => {

        const response = await request(app)
            .post('/api/admin/crearComercio')
            .set('Accept', 'application/json')
            .auth(tokenAdmin, { type: 'bearer' })
            .send({
                "nombreComercio": "Media Markt",
                "cifComercio": "12345678",
                "direccionComercio": "Calle 1",
                "emailComercio": "mediamarkt@gmail.com",
                "passwordComercio": "12345678",
                "telefonoComercio": "611452480",
            })
            .expect(200)

        tokenComercio = response.body.token
        idComercio = response.body.dataComercio._id

    })

    it('should login a merchant', async () => {

        const response = await request(app)
            .post('/api/comercio/loginComercio')
            .send({

                "emailComercio": "mediamarkt@gmail.com",
                "passwordComercio": "12345678"
            })
            .auth(tokenComercio, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)

        tokenComercio = response.body.token
        idComercio = response.body.dataComercio._id

    })


    it('should get the merchants', async () => {

        const response = await request(app)
            .get('/api/comercio')
            .set('Accept', 'application/json')
            .expect(200)
    })

    it('should get a merchant', async () => {

        const response = await request(app)
            .get('/api/comercio/' + idComercio)
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body.nombreComercio).toEqual('Media Markt')
    })

    it('should update a merchant', async () => {

        const response = await request(app)
            .put('/api/admin/' + idComercio)
            .set('Accept', 'application/json')
            .auth(tokenAdmin, { type: 'bearer' })
            .send({
                "nombreComercio": "COM",
                "cifComercio": "12345678",
                "direccionComercio": "Calle 1",
                "emailComercio": "com@gmail.com",
                "passwordComercio": "hola12345",
                "telefonoComercio": "611452480"
            })
            .expect(200)

        expect(response.body.dataComercio.nombreComercio).toEqual('COM')
        
        tokenComercio = response.body.token
        idComercio = response.body.dataComercio._id

    })

    it('should create a web page for the merchant', async () => {
    
        const response = await request(app)
            .post('/api/paginaComercio/createPage')
            .set('Accept', 'application/json')
            .auth(tokenComercio, { type: 'bearer' })
            .send({
                "titulo": "mediaMarkt Web",
                "ciudadComercio": "Madrid",
                "actividadComercio": "Electronica",
                "resumenComercio": "Venta de productos electronicos"
            })
            .expect(200)

        idWeb = response.body._id
        idComercio = response.body.idPagina
    })

    it('should create a web page for the merchant', async () => {

        const response = await request(app)
            .post('/api/paginaComercio/createPage')
            .set('Accept', 'application/json')
            .auth(tokenComercio, { type: 'bearer' })
            .send({
                "titulo": "mediaMarkt Web",
                "ciudadComercio": "Barcelona",
                "actividadComercio": "Electronica",
                "resumenComercio": "Venta de productos electronicos"
            })
            .expect(200)
        
        city = response.body.ciudadComercio

    })

    it('should get the merchants webpages', async () => {

        const response = await request(app)
            .get('/api/paginaComercio')
            .set('Accept', 'application/json')
            .expect(200)

    })

    it('should get a merchant', async () => {

        const response = await request(app)
            .get('/api/paginaComercio/' + idWeb)
            .set('Accept', 'application/json')
            .expect(200)

        expect(response.body._id).toEqual(idWeb)

    })

    it('should get a merchant from the city ', async () => {

        const response = await request(app)
            .get('/api/paginaComercio/search/' + city)
            .set('Accept', 'application/json')
            .expect(200)
        
        expect(response.body[0].ciudadComercio).toEqual(city)

    })

    it('should update a merchant webpage', async () => {

        const response = await request(app)
            .put('/api/paginaComercio/' + idWeb)
            .set('Accept', 'application/json')
            .auth(tokenComercio, { type: 'bearer' })
            .send({
                "titulo": "mediaMarkt Web",
                "ciudadComercio": "Madrid",
                "actividadComercio": "Electronica",
                "resumenComercio": "Venta de productos electronicos"
            })
            .expect(200)

        expect(response.body.pagina._id).toEqual(idWeb)

        idWeb = response.body.pagina._id
        idComercio = response.body.pagina.idPagina

    })

    it('should posts a text in a merchants webpage', async () => {

        const response = await request(app)
            .post('/api/paginaComercio/textos/' + idWeb)
            .set('Accept', 'application/json')
            .auth(tokenComercio, { type: 'bearer' })
            .send({

                "textos": [
                    
                    "El Media Markt de Madrid es el mejor de todos",
                    "Siempre tienen los mejores precios y productos"
                    
                ]

            })
            expect(response.body.acknowledged).toEqual(true)

    })

    /*it('should posts a foto in a merchants webpage', async () => {

        const response = await request(app)
            .post('/api/paginaComercio/fotos/' + idWeb)
            .set('Accept', 'application/json')
            .auth(tokenComercio, { type: 'bearer' })
            .contentDisposition('form-data', 'name="image"', 'filename="otra.png"')
            .contentType('image/png')
            .expect(200)
            expect(response.body.acknowledged).toEqual(true)

    })*/

    it('should delete a merchants webpage', async () => {
        const response = await request(app)
            .delete('/api/admin/deleteComercio/' + idWeb)
            .set('Accept', 'application/json')
            .auth(tokenAdmin, { type: 'bearer' })
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })

    it('should delete a merchant', async () => {
        const response = await request(app)
            .delete('/api/admin/deleteComercio/' + idComercio)
            .set('Accept', 'application/json')
            .auth(tokenAdmin, { type: 'bearer' })
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })
})