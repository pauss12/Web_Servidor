const express = require('express');
const app = express();

//Simulamos una base de datos con el archivo de cursos.js anterior
const { infoCursos } = require('./cursos.js');

// Loading process.env
require('dotenv').config();

// Routing
app.get('/', (req, res) => { res.send('Hello World') })

// Listening
const port = process.env.PORT || 3000;

// UNA FORMA DE HACER EL GET ---------------------------------
app.get('/api/cursos/programacion', (req, res) => {
    res.send(JSON.stringify(infoCursos.programacion));
})

app.get('/api/cursos/matematicas', (req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas));
})

app.get('/api/cursos/', (req, res) => {
    res.send(JSON.stringify(infoCursos));
})

app.get('/api', (req, res) => {

    res.send("ERROR 404: No se encontró el curso");
})

// OTRA FORMA DE HACER EL GET DE PROGRAMACION ---------------------------------
app.get('/api/cursos/programacion/:lenguaje', (req, res) => {

    const lenguaje = req.params.lenguaje;

    const data = infoCursos.programacion.filter((curso) => curso.lenguaje === lenguaje);

    if (data.length === 0) {
        res.status(404).send("ERROR 404: No se encontró el curso");
    }

    res.send(JSON.stringify(data))
})

app.get('/api/cursos/programacion/:lenguaje/:nivel', (req, res) => {

    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;

    const data = infoCursos.programacion.filter((curso) => curso.lenguaje === lenguaje && curso.nivel === nivel);

    if (data.length === 0) {
        res.status(404).send("ERROR 404: No se encontró el curso");
    }

    res.send(JSON.stringify(data))
})

//CON MATEMATICAS, HACER UN FILTRO POR TEMA
app.get('/api/cursos/matematicas/:tema', (req, res) => {

    const tema = req.params.tema;

    const data = infoCursos.matematicas.filter((curso) => curso.tema === tema);

    if (data.length === 0) {
        res.status(404).send("ERROR 404: No se encontró el curso");
    }

    res.send(JSON.stringify(data))
})

// Listening ----------------------------------------------
app.listen(port, () => {

    console.log('Servidor iniciado en el puerto', port);
});