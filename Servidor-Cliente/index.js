const http = require('http');

const servidor = http.createServer((req, res) => {

    res.end('Hola Mundo');
});

servidor.listen(3000, () => {

    console.log('Servidor escuchando peticiones en el puerto 3000');
});