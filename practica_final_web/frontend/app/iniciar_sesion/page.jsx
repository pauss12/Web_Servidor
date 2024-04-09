"use client"

import React from 'react';

import "../styles/inicioSesion.css"

function iniciar_sesion() {

    return (

        <div className="contenedor">

            <button
                className="absolute right-4 top-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                HOME
            </button>

            <div className=" min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in
                    </h2>
                </div>

                <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            Usuario
                            <div className="mt-2">
                                <input
                                    id="usuario"
                                    placeholder=" Usuario"
                                    name="usuario"
                                    type="usuario"
                                    autoComplete="usuario"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                Contraseña
                                <input
                                    id="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        ¿Has olvidado la contraseña?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                    
                                onClick={handleInicioSesion}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
    
}

export default iniciar_sesion;