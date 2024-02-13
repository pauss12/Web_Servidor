const express = require('express');

//Simulamos una base de datos con el archivo de cursos.js anterior
const { matematicas } = require('../cursos.js').infoCursos;
const routerMatematicas = express.Router();

routerMatematicas.use(express.json());

routerMatematicas.get('/', (req, res) => {

    res.json(matematicas);
});

routerMatematicas.get('/:tema', (req, res) => {

    const tema = req.params.tema;

    const data = matematicas.filter((curso) => curso.tema === tema);

    if (data.length === 0) {
        res.status(404).send("ERROR 404: No se encontró el curso");
    }

    res.send(JSON.stringify(data))

})

//FUNCION POST --------------------------------

routerMatematicas.post('/', (req, res) => {
    const cursoNuevo = req.body;//Aquí irían algunas comprobaciones de formato
    matematicas.push(cursoNuevo);
    res.send(JSON.stringify(matematicas));
});

//FUNCION PUT --------------------------------
routerMatematicas.put('/:id', (req, res) => {

    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id == id);

    // Si no lo encuentra, devuelve -1
    if (indice >= 0) {
        matematicas[indice] = cursoActualizado;
    }
   
    res.json(matematicas);
});

//FUNCION PATCH --------------------------------
routerMatematicas.patch('/:id', (req, res) => {

    const cursoActualizado = req.body;
    const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id == id);

    // Si no lo encuentra, devuelve -1
    if (indice >= 0) {
        
        const cursoAModificar = matematicas[indice];
        
        //Modifica solo algunas propiedades del objeto
        Object.assign(cursoAModificar, cursoActualizado)
    }

    res.json(matematicas);
});

//FUNCION DELETE --------------------------------
//Splice => Elimina elementos de un array y, si es necesario, inserta nuevos elementos en su lugar, devolviendo los elementos eliminados.
routerMatematicas.delete('/:id', (req, res) => {

    const id = req.params.id;
    const indice = matematicas.findIndex(curso => curso.id == id);

    if (indice >= 0) {
        matematicas.splice(indice, 1);
    }

    res.json(matematicas);
});

module.exports = routerMatematicas;