/*
1- Crea un array de objetos de productos tal que:let products = [{nombre: "PC-Gaming" ,marca: "Asus",precio: 1200},{nombre: "Tablet",marca: "Samsung" ,precio: 300},{nombre: "Cámara-Reflex" ,marca: "Canon",precio: 650}]2.- Crea una función getProducts() que devuelva una Promesa con esos productos (simula la asincronía consetTimeout de 3000 ms).3.- Llama a getProducts() con .then() para obtener los productos.4.- Llama a getProducts() con await dentro de una función async para obtener los productos.
*/

const products = [
    { nombre: "PC-Gaming", marca: "Asus", precio: 1200 },
    { nombre: "Tablet", marca: "Samsung", precio: 300 },
    { nombre: "Cámara-Reflex", marca: "Canon", precio: 650 }
];

const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 3000);
    });
}

getProducts().then((products) => {

    console.log(products);
})





