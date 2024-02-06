const http = require('http');

const servidor = http.createServer((req, res) => {
    //Lógica del proceso leyendo req
    const miURL = new URL('https://www.ejemplo.org/cursos/programacion?ordenar=vistas&nivel=1');
    
    console.log(miURL.host);
    console.log(miURL.pathname);
    console.log(miURL.searchParams.get('ordenar'));
    console.log(miURL.searchParams.get('nivel'));

    console.log(req.url);
    
    res.end('Hola Mundo');

});


servidor.listen(3000, () => {

    console.log('Servidor escuchando peticiones en el puerto 3000');
});
