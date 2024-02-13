const express = require('express');

//Simulamos una base de datos con el archivo de cursos.js anterior
const { programacion } = require('../cursos.js').infoCursos;
const routerProgramacion = express.Router();

routerProgramacion.get('/', (req, res) => {

    res.send(JSON.stringify(programacion));
});

routerProgramacion.get('/:lenguaje', (req, res) => {

    const lenguaje = req.params.lenguaje;

    const data = programacion.filter((curso) => curso.lenguaje === lenguaje);

    if (data.length === 0) {
        res.status(404).send("ERROR 404: No se encontró el curso");
    }

    if (req.query.ordenar === 'vistas') {
        //Orden DESC, si lo queremos ASC, sería (a.vistas, b.vistas)
        res.send(JSON.stringify(data.sort((a, b) => b.vistas - a.vistas)));
    } else {
        res.send(JSON.stringify(data));
    }

})

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {

    const lenguaje = req.params.lenguaje;

    const nivel = req.params.nivel;

    const data = programacion.filter((curso) => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (data.length === 0) {

        res.status(404).send("ERROR 404: No se encontró el curso");
    }

    res.send(JSON.stringify(data))

})

module.exports = routerProgramacion;