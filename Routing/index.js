const http = require('http');

const cursos = require('./cursos');

const servidor = http.createServer((req, res) => {
    
    switch (req.method)
    {
        case 'GET':
            return manejarSolicitudesGet(req, res);
        case 'POST':
            return manejarSolicitudesPost(req, res);
        case 'PUT':
            return manejarSolicitudesPut(req, res);
        case 'DELETE':
            return manejarSolicitudesDelete(req, res);
        default:
            res.end('Método no soportado');
    }
});

function manejarSolicitudesGet(req, res)
{
    const path = req.url;

    if (path === '/')
    {
        console.log("ERROR 404");
        res.httpCode = 404;
    }
    else if (path === '/cursos')
    {
        res.end(JSON.stringify(cursos.infoCursos));
    }
    else if (path === '/cursos/programacion')
    {
        res.end(JSON.stringify(cursos.infoCursos.programacion));
    }
    else if (path === '/cursos/matematicas')
    {
        res.end(JSON.stringify(cursos.infoCursos.matematicas));
    }
    else
    {
        res.end('Ruta no encontrada');
    }
}

function manejarSolicitudesPost(req, res) {
    
    const path = req.url;
    //res.statusCode = 200;

    if (path === '/cursos/programacion')
    {
        let body = '';

        req.on('data', (content) => {

            body += content.toString();
        })

        req.on('end', () => {

            console.log(typeof body, body);
            body = JSON.parse(body);
            console.log(typeof body, body.titulo);
            res.end('El servidor recibio una solicitud POST para ' + path);
        })
    }
    else
    {
        res.statusCode = 404;
        res.end('No existe ek curso indicado en la ruta ' + path);
    }
}

servidor.listen(3000, () => {

    console.log('Servidor escuchando peticiones en el puerto 3000');
});
