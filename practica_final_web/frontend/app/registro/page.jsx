"use client"

import React, { useState } from 'react';
import "../styles/Registro.css"
import DropdownSimple from '../componentes/DropdownSimple';

import { useRouter } from 'next/navigation';

import { v4 as uuidv4 } from 'uuid';

function registro_user() {

    const router = useRouter();

    //Depende del tipo de cliente que se registre, se guarda unos datos u otros
    const [DatosUsuario, setDatosUsuario] = useState({

        idUsuario: uuidv4(),
        nombreUsuario: "",
        emailUsuario: "",
        passwordUsuario: "",
        edadUsuario: "",
        ciudadUsuario: "",
        interesesUsuario: "",
        permiteOfertas: false,
        tipoUsuario: "",

    });


    const handleOpcionSeleccionadaChange = (nuevaOpcion) => {
        setDatosUsuario({ ...DatosUsuario, tipoUsuario: nuevaOpcion });
    };


    const handleCheckboxChange = (e) => {
        setDatosUsuario({ ...DatosUsuario, permiteOfertas: e.target.checked });
    };

    const handleEdad = (e) => {

        const inputValue = e.target.value;

        // Verificar si el valor ingresado es un número
        if (!isNaN(inputValue)) {

            setDatosUsuario({ ...DatosUsuario, edadUsuario: inputValue });
        } else {
            
            alert('Por favor, ingrese un número válido para la edad.');
        }
    };

    const handleSubmit = async () => {

        try {

            if (!DatosUsuario.tipoUsuario) {
                alert('Por favor, selecciona un tipo de usuario.');
                return;
            }

            const response = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(DatosUsuario),
            });

            if (response.ok) {

                alert('Datos guardados exitosamente');
                setDatosUsuario({
                    idUsuario: uuidv4(),
                    nombreUsuario: '',
                    emailUsuario: '',
                    passwordUsuario: '',
                    edadUsuario: '',
                    ciudadUsuario: '',
                    interesesUsuario: '',
                    permiteOfertas: false,
                    tipoUsuario: '',
                });

            } else {
                console.error(`HTTP error! Status: ${response.status}`);
                alert('Error al guardar los datos');
            }
        } catch (error) {
            console.error(error);
            alert('Error al guardar los datos');
        }

        window.location.href = '/iniciar_sesion';

    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen p-2">
            
            <button
                onClick={() => router.push('/')}
                className="absolute right-3 top-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                HOME
            </button>

            <div className="w-full max-w-md">
                <form className="space-y-6">
                    <h2 className="text-center pt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign up
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="usuario" className="block text-sm font-medium leading-6 text-gray-900">
                                Usuario
                            </label>
                            <input
                                id="usuario"
                                placeholder="Usuario"
                                autoComplete="username"
                                required
                                value={DatosUsuario.nombreUsuario}
                                onChange={(e) => setDatosUsuario({ ...DatosUsuario, nombreUsuario: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <label htmlFor="Email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <input
                                id="Email"
                                placeholder="Email"
                                autoComplete="off"
                                required
                                value={DatosUsuario.emailUsuario}
                                onChange={(e) => setDatosUsuario({ ...DatosUsuario, emailUsuario: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                        </div>

                        <div>
                            <label htmlFor="Edad" className="block text-sm font-medium leading-6 text-gray-900">
                                Edad
                            </label>
                            <input
                                id="Edad"
                                placeholder="Edad"
                                autoComplete="edad"
                                required
                                value={DatosUsuario.edadUsuario}
                                onChange={handleEdad}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <label htmlFor="Ciudad" className="block text-sm font-medium leading-6 text-gray-900">
                                Ciudad
                            </label>
                            <input
                                id="Ciudad"
                                placeholder="Ciudad"
                                autoComplete="ciudad"
                                required
                                value={DatosUsuario.ciudadUsuario}
                                onChange={(e) => setDatosUsuario({ ...DatosUsuario, ciudadUsuario: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <label htmlFor="Intereses" className="block text-sm font-medium leading-6 text-gray-900">
                                Intereses
                            </label>
                            <input
                                id="Intereses"
                                placeholder="Intereses"
                                autoComplete="intereses"
                                required
                                value={DatosUsuario.interesesUsuario}
                                onChange={(e) => setDatosUsuario({ ...DatosUsuario, interesesUsuario: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                placeholder="Contraseña"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={DatosUsuario.passwordUsuario}
                                onChange={(e) => setDatosUsuario({ ...DatosUsuario, passwordUsuario: e.target.value })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <DropdownSimple opcionSeleccionada={DatosUsuario.tipoUsuario} setOpcionSeleccionada={handleOpcionSeleccionadaChange} />

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="quieroOfertas"
                            className="form-checkbox text-blue-500 h-5 w-5"
                            checked={DatosUsuario.permiteOfertas}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="quieroOfertas" className="ml-2 text-sm leading-5">
                            Quiero recibir ofertas
                        </label>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default registro_user;