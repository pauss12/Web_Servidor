

/* EJERCICIO 3 */
function mostrarTema(tema)
{
    console.log("El tema es " + tema);
}

function sumar(a, b)
{
    console.log(a + b);
}

console.log("Antes")
//Esperar 2 segundos para ejecutar la función mostrarTema
setTimeout(mostrarTema, 2000, "Programación");

console.log("Después")
//Esperar 3 segundo mas para ejecutar la función sumar
setTimeout(sumar, 5000, 5, 3);
