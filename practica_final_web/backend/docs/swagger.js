const swaggerJsdoc = require("swagger-jsdoc");
const comercio = require("../models/nosql/comercio");
const { subirTextosComercio } = require("../controllers/paginaComercio");

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
                    required: ["nombreUsuario", "emailUsuario", "emailUsuario", "passwordUsuario", "edadUsuario", "ciudadUsuario", "interesesUsuario", "permiteOfertas"],
                    properties: {
                        id: {
                            type: "integer",
                            format: "int64",
                            example: 1,
                        },
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
                        },
                        role: {
                            type: "string",
                            example: "usuarioRegistrado"
                        },
                        
                    },
                },
                loginUser: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            example: "paula@gmail.com"
                        },
                        password: {
                            type: "string"
                        },
                    }
                },
                registerUser: {
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
                comercio: {
                    type: "object",
                    required: ["nombreComercio", "cifComercio", "emailComercio", "direccionComercio", "emailComercio", "passwordComercio", "telefonoContacto"],
                    properties: {
                        id: {
                            type: "integer",
                            format: "int64",
                            example: 1,
                        },
                        nombreComercio: {
                            type: "string",
                            example: "Media Markt"
                        },
                        cifComercio: {
                            type: "string",
                            example: "B-12345678"
                        },
                        direccionComercio: {
                            type: "string",
                            example: "Calle Gran Via, 23, Madrid"
                        },
                        emailComercio: {
                            type: "string",
                            example: "mediamarkt@gmail.com"
                        },
                        passwordComercio: {
                            type: "string"
                        },
                        telefonoContacto: {
                            type: "string",
                            example: "+34 915 426 879"
                        },
                    },
                },
                loginComercio: {
                    type: "object",
                    required: ["emailComercio", "passwordComercio"],
                    properties: {
                        emailComercio: {
                            type: "string",
                            example: "mediamarkt@gmail.com"
                        },
                        passwordComercio: {
                            type: "string"
                        },
                    }
                },
                crearPaginaComercio: {
                    type: "object",
                    required: ["titulo", "ciudadComercio", "actividadComercio", "resumenComercio", "textos", "fotos"],
                    properties: {
                        titulo: {
                            type: "string",
                            example: "Media Markt"
                        },
                        ciudadComercio: {
                            type: "string",
                            example: "Madrid"
                        },
                        actividadComercio: {
                            type: "string",
                            example: "Electronica"
                        },
                        resumenComercio: {
                            type: "string",
                            example: "Media Markt es una cadena de tiendas de electrónica, informática y electrodomésticos."
                        },
                    }
                },
                updatePaginaComercio: {
                    type: "object",
                    required: ["ciudadComercio", "actividadComercio", "textos", "fotos"],
                    properties: {
                        titulo: {
                            type: "string",
                            example: "Media Markt"
                        },
                        ciudadComercio: {
                            type: "string",
                            example: "Madrid"
                        },
                        actividadComercio: {
                            type: "string",
                            example: "Electronica"
                        },
                        resumenComercio: {
                            type: "string",
                            example: "Media Markt es una cadena de tiendas de electrónica, informática y electrodomésticos."
                        },
                    }
                },
                subirTextos: {
                    type: "object",
                    required: ["textos"],
                    properties: {
                        textos: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: ["Media Markt es una cadena de tiendas de electrónica, informática y electrodomésticos."]
                        }
                    }
                },
                subirFotos: {
                    type: "object",
                    required: ["fotos"],
                    properties: {
                        fotos: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: ["/test/foto.jpg"]
                        }
                    }
                },
                patchPaginaComercio: {
                    type: "object",
                    required: ["puntuacion", "comentarios"],
                    properties: {
                        puntuacion: {
                            type: "integer",
                            example: 5
                        },
                        comentarios: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            example: ["Me encanta Media Markt"]
                        }
                    }
                },
                updateUser: {
                    type: "object",
                    required: ["nombreUsuario", "emailUsuario", "edadUsuario", "ciudadUsuario", "interesesUsuario", "permiteOfertas"],
                    properties: {
                        nombreUsuario: {
                            type: "string",
                            example: "Paula"
                        },
                        emailUsuario: {
                            type: "string",
                            example: "paula@mail.com"
                        },
                        passwordUsuario: {
                            type: "string"
                        },
                        edadUsuario: {
                            type: "integer",
                            example: 20
                        },
                        sexoUsuario: {
                            type: "string",
                            example: "Mujer"
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