const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Tracks - Express API with Swagger (OpenAPI 3.0)",
            version: "0.1.0",
            description:
                "This is a CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "u-tad",
                url: "https://u-tad.com",
                email: "paula.mendez@live.u-tad.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                },
            },
            schemas: {
                user: {
                    type: "object",
                    required: ["name", "age", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Menganito"
                        },
                        age: {
                            type: "integer",
                            example: 20
                        },
                        email: {
                            type: "string",
                            example: "miemail@google.com"
                        },
                        password: {
                            type: "string"
                        },
                    },
                },
                login: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "miemail@google.com"
                        },
                        password: {
                            type: "string"
                        },
                    }
                },
                register: {
                    type: "object",
                    required: ["nombreUsuario", "emailUsuario", "emailUsuario", "passwordUsuario", "edadUsuario", "ciudadUsuario", "interesesUsuario", "permiteOfertas"],
                    properties: {
                        nombreUsuario: {
                            type: "string",
                            example: "Paula"
                        },
                        edadUsuario: {
                            type: "integer",
                            example: 20
                        },
                        emailUsuario: {
                            type: "string",
                            example: "paula@gmail.com"
                        },
                        passwordUsuario: {
                            type: "string"
                        },
                        ciudadUsuario: {
                            type: "string",
                            example: "Madrid"
                        },
                        interesesUsuario: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: ["futbol", "baloncesto"]
                        },
                        permiteOfertas: {
                            type: "boolean",
                            example: true
                        }

                    }
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options)