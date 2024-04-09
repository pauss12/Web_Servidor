import React from 'react';

function cartaUsuario({ usuario, onChange }) {
    
    return (

        <li className="bg-gray-200 rounded-2x1 ml-4 border border-black pl-4 pr-10 py-10 md:p-50 lg:px-30 my-2 shadow-md rounded">
            
            <h2><b>Nombre:</b>  {usuario.nombreUsuario}</h2>
            <p><b>ID: </b>       {usuario.idUsuario}</p>
            <p><b>Email:</b>  {usuario.emailUsuario}</p>
            <p><b>Edad:</b>  {usuario.edadUsuario}</p>
            <p><b>Ciudad:</b>  {usuario.ciudadUsuario}</p>
            <p><b>Intereses:</b>  {usuario.interesesUsuario}</p>
            <p><b>Permite ofertas:  </b>{usuario.permiteOfertas ? 'Sí' : 'No'}</p>
            <p><b>Tipo:</b> {usuario.tipoUsuario}</p>

                
            {onChange && (
                <button className="bg-red-500 text-white rounded-md px-4 py-1 mt-4"
                    onClick={() => onChange(usuario.idUsuario)}>
                    Editar Usuario
                </button>
            )}
        
            <hr></hr>
            
        </li>

    );
}

export default cartaUsuario;
