"use client";

import "../styles/usuarioRegistrado.css"

import React, { useState, useEffect } from 'react';

function EditarUsuario({ user }) {
    
    const [usuario, setUsuario] = useState(user);

    useEffect(() => {
       
        setUsuario(user);

    }, [user]);

    const handleInputChange = (event) => {

        const { name, value, type, checked } = event.target;

        const newValue = type === 'checkbox' ? checked : value;

        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: newValue,
        }));

    };

    //Estilo -----------------------------------------------------
    const estilo = {

        width: '35%',
        height: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
        marginLeft: '50px',
        paddingLeft: '30px',
        paddingRight: '30px',
        border: '1px solid black',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px #ccc',

    };


    //Actualizar el usuario -----------------------------------------------------
    const actualizarUsuario = async () => {

        try {

            console.log('Updating user:', usuario);

            const response = await fetch(`http://localhost:3000/api/usuarios/${usuario.idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });

            if (response.ok) {

                console.log('Usuario actualizado con éxito');
                alert('Usuario actualizado con éxito')

            } else {

                console.error('Error al actualizar el usuario');
                alert('Error al actualizar el usuario')

            }

        } catch (error) {

            console.error('Error en la solicitud de actualización:', error);
            
        }
    };

    return (

        <div style={estilo}>
        
            <div className="container mx-auto mt-8">
                
                <h2 className="text-2xl font-semibold mb-4">Editar Usuario</h2>
                <form className="max-w-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nombre:
                            <input
                                type="text"
                                name="nombreUsuario"
                                value={usuario.nombreUsuario}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Ciudad:
                            <input
                                type="text"
                                name="ciudadUsuario"
                                value={usuario.ciudadUsuario}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Intereses:
                            <input
                                type="text"
                                name="interesesUsuario"
                                value={usuario.interesesUsuario}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Recibir Ofertas:
                            <input
                                type="checkbox"
                                name="permiteOfertas"
                                checked={usuario.permiteOfertas}
                                onChange={handleInputChange}
                                className="mr-2 leading-tight"
                            />
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={actualizarUsuario}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Actualizar Usuario
                    </button>
                </form>
            </div>
            
        </div>
    );
}

export default EditarUsuario;
