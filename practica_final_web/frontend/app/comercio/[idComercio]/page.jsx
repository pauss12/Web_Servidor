"use client"

import { useState, useEffect } from 'react';
import EditarComercio from '@/app/componentes/EditarComercio';
import CartaUsuario from '@/app/componentes/cartas/cartaUsuario.jsx';

import { useRouter } from 'next/navigation';


//Cargar el comercio --------------------------------------
async function loadComercio(idComercio) {

    const res = await fetch(`http://localhost:3000/api/comercios/${idComercio}`);

    const data = await res.json()

    return data.user
}

//Funcion PAGE -------------------------------------------------------------------------
function Page({ params }) {

    //Usamos el router -----------------------------
    const router = useRouter();

    //Const para el comercio ------------------------
    const [comercio, setComercio] = useState([]);

    //Const para la lista de usuarios ------------------------
    const [listaUsuarios, setListaUsuarios] = useState([]);

    //Obtener el Comercio -------------------------------------
    useEffect(() => {

        const fetchData = async () => {

            try {

                const comercio = await loadComercio(params.idComercio);

                setComercio(comercio);

            } catch (error) {

                console.error('Error al cargar el Comercio:', error);

            }

        };

        fetchData();

    }, []);

    //Obtener la lista de usuarios -------------------------------
    useEffect(() => {

        const obtenerUsuarios = async () => {

            try {

                const response = await fetch('http://localhost:3000/api/usuarios')

                const data = await response.json()

                setListaUsuarios(data.users)

            } catch (error) {

                console.log(error);
                alert("Ha habido un problema a la hora de obtener los Usuarios");
            }
        };

        obtenerUsuarios();

    }, []);

    const estilo = {

        height: '20vh',
        width: '20vw',
        marginLeft: '30px',
        marginTop: '45px',
        paddingLeft: '30px',
        paddingBottom: '30px',
        justifyContent: 'center',
        paddingRight: '30px',
        paddingTop: '30px',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px #ccc',

    };

    //ELIMINAR COMERCIO -------------------------------------
    const darseDeBajaComercio = async () => {

        try {

            const response = await fetch(`http://localhost:3000/api/comercios/${comercio.idComercio}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {

                console.log('Comercio dado de baja con éxito');
                alert('Comercio dado de baja con éxito');
            } else {

                console.error('Error al darse de baja');
                alert('Error al darse de baja');

            }

            router.push('/comercio')

        } catch (error) {

            console.error('Error en la solicitud de darse de baja:', error);
            alert('ERROR! ', error)

        }

    };

    //Mostrar los datos no modificables del comercio (puntuacion, foto, textos, numero de puntuaciones, reseñas)
    function showUnmodifiableData() {

        return (

            <div style={estilo}>
                <p>Puntuación: {comercio.puntuacion || 'N/A'} </p> 
                <br />
                <p>Reseñas: {comercio.comentarios || 'N/A'} </p>
                
                {mostrarFotos()}
            </div>
        );
    }

    function mostrarFotos() {
        if (!comercio.fotos || comercio.fotos.length === 0) {
            return <p>No hay fotos disponibles.</p>;
        }

        return (
            <div className="mt-10">
                <h3>Fotos del comercio:</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {comercio.fotos.map((foto, index) => (
                        <li key={index} style={{ marginBottom: '10px' }}>
                            <img src={foto} alt={`Foto ${index + 1}`} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }



    //MOSTRAR LISTA DE USUARIOS DE SU CIUDAD INTERESADOS EN SU ACTIVIDAD
    function mostrarListaUsuarios() {

        return (

            <div style={estilo}>

                <h3>Lista de usuarios interesados en su actividad:</h3>

                <ul className="flex flex-wrap mt-12">
                    {listaUsuarios &&
                        listaUsuarios
                            .filter((usuario) => usuario.ciudadUsuario === comercio.ciudadComercio && usuario.permiteOfertas)
                            .map((usuario) => (
                                <CartaUsuario key={usuario.idUsuario} usuario={usuario} onChange={null} />
                            ))}

                </ul>
            </div>
        );
    }


    return (

        <div className="flex flex-row bg-blue-200">

            <EditarComercio comercio={comercio} className="mr-5" showUnmodifiableData={showUnmodifiableData} />

            {showUnmodifiableData()}

            {mostrarListaUsuarios()}

            <button
                onClick={() => darseDeBajaComercio()}
                className="absolute right-4 top-12 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Darse de baja
            </button>

            <button
                onClick={() => router.push('/')}
                className="absolute right-20 top-12 bg-blue-500 hover:bg-blue-700 mr-20 text-white font-bold py-2 px-4 rounded">
                HOME
            </button>

        </div>
    )
}

export default Page;
