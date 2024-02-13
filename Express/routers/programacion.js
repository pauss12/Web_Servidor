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

//FUNCION POST --------------------------------
routerProgramacion.use(express.json());

routerProgramacion.post('/', (req, res) => {
    const cursoNuevo = req.body;//Aquí irían algunas comprobaciones de formato
    programacion.push(cursoNuevo);
    res.send(JSON.stringify(programacion));
});

//FUNCION PUT --------------------------------
routerProgramacion.put('/:id', (req, res) => {

    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    // Si no lo encuentra, devuelve -1
    if (indice >= 0) {
        programacion[indice] = cursoActualizado;
    }

    res.json(programacion);
});

//FUNCION PATCH (Modifica solo los campos que se le pasen) ----
routerProgramacion.patch('/:id', (req, res) => {

    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    // Si no lo encuentra, devuelve -1
    if (indice >= 0) {
        
        const cursoAModificar = programacion[indice];

        //Modifica solo algunas propiedades del objeto
        Object.assign(cursoAModificar, cursoActualizado)

    }

    res.json(programacion);
});

//Funcion DELETE --------------------------------
routerProgramacion.delete('/:id', (req, res) => {

    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        programacion.splice(indice, 1);
    }

    res.json(programacion);
});

module.exports = routerProgramacion;