"use client"

import { useState, useEffect } from "react";
import CartaUsuario from '../componentes/cartas/cartaUsuario.jsx';
import { useRouter } from 'next/navigation';

import Buscador from '../componentes/Buscador.jsx';

import "../styles/usuarioRegistrado.css"




function usuario_registrado() {

    const router = useRouter();

    //Variable para almacenar los usuarios que esten en la BBDD ------------
    const [usuarios, setUsuarios] = useState([]);

    //Variable para almacenar los comercios que esten en la BBDD ------------
    const [comercios, setComercios] = useState([]);

    useEffect(() => {

        const obtenerUsuarios = async () => {

            try {

                const response = await fetch('http://localhost:3000/api/usuarios')

                const data = await response.json()

                setUsuarios(data.users)

            } catch (error) {

                console.log(error);
                alert("Ha habido un problema a la hora de obtener los Usuarios");
            }
        };

        obtenerUsuarios();

    }, []);

    //Funcion para editar un usuario ----------------------------------------
    const handleChange = async (usuario) => {

        router.push(`/usuario_registrado/${usuario.idUsuario}`)
    
    };

    //OBTENER COMERCIO ---------------------------------------------------------
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
    
    return (

        <>

            <button
                onClick={() => router.push('/')}
                className="absolute right-4 top-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                HOME
            </button>
        
            <ul className="flex flex-wrap mt-5">
                {usuarios && usuarios.map((usuario) => (

                    <CartaUsuario
                        key={usuario.idUsuario}
                        usuario={usuario}
                        onChange={() => handleChange(usuario)} />

                ))}
            </ul>

            <div className="busquedaComercios">
                <Buscador lista={comercios} setLista={setComercios} />
            </div>
            

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
            
        </>
    );
}

export default usuario_registrado;