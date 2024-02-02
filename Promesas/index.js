const statusPedido = () => {
    const status = Math.random() < 0.8; //Simulamos un 80% de éxito
    //console.log("Status:", status);
    return status;
};
/*
for (let i = 0; i < 10; i++) {
    statusPedido();
}
*/

const miPedidoDePizza = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (statusPedido()) {
            resolve("Pedido exitoso, pizza en camino!");
        } else {
            reject("Ocurrió un error. Por favor, inténtelo nuevamente.");
        }
    }, 3000);
});
/*
const manejarPedido = (mensajeDeConfirmacion) => {
    console.log(mensajeDeConfirmacion);
}

const rechazarPedido = (mensajeDeError) => {
    console.log(mensajeDeError)
}

miPedidoDePizza.then(manejarPedido, rechazarPedido);

miPedidoDePizza
    .then((mensajeDeConfirmacion) => {
        console.log(mensajeDeConfirmacion);
    })
    .then(null, (mensajeDeError) => {
        console.log(mensajeDeError);
    });
*/
miPedidoDePizza
    .then((mensajeDeConfirmacion) => {
        console.log(mensajeDeConfirmacion);
    })
    .catch((mensajeDeError) => {
        console.log(mensajeDeError);
    });