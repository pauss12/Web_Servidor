"use client"

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function CrearComercio({datosComercio, setDatosComercio, obtenerComercios}) {

    const handleCrearComercio = async (e) => {

        e.preventDefault();
           
        try {

            const response = await fetch('http://localhost:3000/api/comercios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosComercio),
            });

            const data = await response.json();

            if (response.ok)
            {
                alert('Datos guardados exitosamente');

                setDatosComercio({
                    idComercio: uuidv4(),
                    nombreComercio: '',
                    cifComercio: '',
                    fotos: [],
                    textos: '',
                    ciudadComercio: '',
                    emailComercio: '',
                    telefonoComercio: '',
                    puntuacion: '',
                    comentarios: '',
                });

                obtenerComercios()

            } else {
                console.error(`HTTP error! Status: ${response.status}`);
                alert('Error al guardar los datos');
            }
        }
        catch (error) {
            console.log(error);
            alert("Error al guardar los datos");
        }
        
    };

    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Crear Comercio
                    </h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <div className="mt-2">
                                Nombre Comercio
                                <input
                                    id="Nombre Comercio"
                                    name="Nombre Comercio"
                                    autoComplete="Nombre Comercio"
                                    placeholder=" Nombre Comercio"
                                    value={datosComercio.nombreComercio}
                                    onChange={(e) => setDatosComercio({ ...datosComercio, nombreComercio: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                CIF
                                <input
                                    id="CIF"
                                    name="CIF"
                                    autoComplete="CIF"
                                    placeholder=" CIF"
                                    value={datosComercio.cifComercio}
                                    onChange={(e) => setDatosComercio({ ...datosComercio, cifComercio: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                Ciudad
                                <input
                                    id="ciudad"
                                    name="ciudad"
                                    autoComplete="ciudad"
                                    placeholder=" ciudad"
                                    value={datosComercio.ciudadComercio}
                                    onChange={(e) => setDatosComercio({...datosComercio, ciudadComercio: e.target.value})}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                Email
                                <input
                                    id="Email"
                                    name="Email"
                                    autoComplete="Email"
                                    placeholder=" Email"
                                    value={datosComercio.emailComercio}
                                    onChange={(e) => setDatosComercio({ ...datosComercio, emailComercio: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                />
                            </div>
                        </div>

                        <div>
                            <div className="mt-2">
                                Telefono
                                <input
                                    id="Telefono"
                                    name="Telefono"
                                    autoComplete="username"
                                    placeholder=" Telefono"
                                    value={datosComercio.telefonoComercio}
                                    onChange={(e) => setDatosComercio({ ...datosComercio, telefonoComercio: e.target.value })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div name="puntuacion" value={datosComercio.puntuacion}></div>
                        <div name="comentario" value={datosComercio.comentarios}></div>

                        <div>
                            <button
                                type="submit"
                                onClick={handleCrearComercio}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Crear Comercio
                            </button>
                        </div>


                    </form>

                </div>
            </div>
        </>
    );
}

export default CrearComercio;