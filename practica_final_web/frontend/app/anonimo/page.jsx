"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CartaComercio from '../componentes/cartas/cartaComercio.jsx';

import "../styles/anonimo.css"

function anonimo() {

    //Variable para el router
    const router = useRouter();

    //Variable para guardar los comercios que estan en el TXT ----
    const [comercios, setComercios] = useState([]);

    //Variable para la lista original ---
    const [originalTasks, setOriginalTasks] = useState([]);

    //Obtener Comercios ---------------------------------------------------------------------
    const obtenerComercios = async () => {

        try {

            const response = await fetch('http://localhost:3000/api/comercios')

            const data = await response.json()

            //Actualizo las dos variables
            setComercios(data.comercios)
            setOriginalTasks(data.comercios)

        } catch (error) {

            console.log(error);
            alert("Ha habido un problema a la hora de obtener los comercios");
        }
    };

    useEffect(() => {

        obtenerComercios();

    }, []);

    //Hacer la busqueda ---------------------------------------------------------------------
    const handleSearch = (searchTerm) => {

        if (searchTerm === '') {

            setComercios(originalTasks);

        } else {

            setOriginalTasks(comercios);

            const filteredTasks = originalTasks.filter((task) => {

                return (

                    task.nombreComercio.toLowerCase().includes(searchTerm.toLowerCase()) || 
                    task.ciudadComercio.toLowerCase().includes(searchTerm.toLowerCase()) 

                );
            });

            setComercios(filteredTasks);
        }
    };


    return (

        <>
            
            <button
                onClick={() => router.push('/')}
                className="absolute right-4 top-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                HOME
            </button>

            <button className="absolute right-20 top-12 bg-white hover:bg-white-700 hover:scale-110 text-black font-bold py-2 px-4 rounded ">
                <Link href="../registro">Registrarse</Link>
            </button>

        
            <div className="contenedorBuscadores">
                
                <div className="busqueda">

                    <span className="fa-solid fa-magnifying-glass" style={{ marginRight: '3px' }}></span>
                    <input
                        type="text"
                        className="form-control"
                        id="floatingInputGroup1"
                        style={{ border: 'none', background: 'none' }}
                        placeholder="Buscador"
                        onChange={(e) => handleSearch(e.target.value)} 
                    />

                </div>

            </div>

            <div className="flex">

                {comercios.length > 0 ? (

                    comercios.map((comercio) => (

                        <CartaComercio key={comercio.idComercio} comercio={comercio} onDelete={null}
                            className="w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-100"

                        />

                    ))

                ) : (
                    <div className="bg-gray-200 p-8 hidden rounded-md shadow-md md:w-96">
                        <p>No hay Comercios</p>
                    </div>
                )

                }

            </div>

        </>

    );
}

export default anonimo;