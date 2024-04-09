"use client"

import { useState, useEffect } from "react";
import "../styles/comercio.css"

import { useRouter } from 'next/navigation';

function comercio() {

    const router = useRouter();

    const [comercios, setComercios] = useState([]);

    // Funcion para obtener los comercios de la "BBDD" ------------------------
    useEffect(() => {

        const obtenerComercios = async () => {

            try {

                const response = await fetch('http://localhost:3000/api/comercios');

                const data = await response.json()

                setComercios(data.comercios)

            } catch (error) {

                console.log("Error:", error);

                alert("There was a problem obtaining Comercios");
                
            }
        };

        obtenerComercios();

    }, []);


    //Funcion para editar un usuario ----------------------------------------
    const handleChange = async (comercio) => {

        router.push(`/comercio/${comercio.idComercio}`)

    };


    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <button
                onClick={() => router.push('/')}
                className="absolute right-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                HOME
            </button>

        <ul className="flex">
            {comercios && comercios.map((comercio) => (
                <li key={comercio.idComercio} className="bg-gray-200 rounded-2x1 ml-4 border border-black pl-4 pr-20 py-10 md:p-50 lg:px-30 my-2 shadow-md rounded">
                    <h2>Nombre: {comercio.nombreComercio}</h2>
                    <p>ID: {comercio.idComercio}</p>
                    <p>CIF: {comercio.cifComercio}</p>
                    <p>Ciudad: {comercio.ciudadComercio}</p>
                    <p>Actividad: {comercio.actividadComercio}</p>
                    <p>Fotos: {comercio.fotos}</p>
                    <p>Email: {comercio.emailComercio}</p>
                    <p>Teléfono: {comercio.telefonoComercio}</p>
                    <p>Puntuación: {comercio.puntuacion}</p>
                    <p>Comentarios:{comercio.comentarios}</p>

                    <button className="bg-red-500 text-white rounded-md px-4 py-2"
                        onClick={() => handleChange(comercio)}
                    >
                        Editar Comercio
                    </button>

                </li>
            ))}
        </ul>
            
        </div>
    );
}

export default comercio;