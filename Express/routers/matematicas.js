const express = require('express');

//Simulamos una base de datos con el archivo de cursos.js anterior
const { matematicas } = require('../cursos.js').infoCursos;
const routerMatematicas = express.Router();

routerMatematicas.get('/', (req, res) => {

    res.send(JSON.stringify(matematicas));
});

routerMatematicas.get('/:tema', (req, res) => {

    const tema = req.params.tema;

    const data = matematicas.filter((curso) => curso.tema === tema);

    if (data.length === 0) {
        res.status(404).send("ERROR 404: No se encontró el curso");
    }

    res.send(JSON.stringify(data))

})

module.exports = routerMatematicas;