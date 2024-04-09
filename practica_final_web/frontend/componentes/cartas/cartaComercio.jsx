
function cartaComercio({ comercio, onDelete }) {

    return (
        <div className="bg-gray-200 rounded-2x1 ml-4 border border-black pl-4 pr-15 py-10 md:p-50 lg:px-30 my-2 shadow-md rounded">
            <h2>Nombre: {comercio.nombreComercio}</h2>
            <p>ID: {comercio.idComercio}</p>
            <p>CIF: {comercio.cifComercio}</p>
            <p>Ciudad: {comercio.ciudadComercio}</p>
            <p>Email: {comercio.emailComercio}</p>
            <p>Teléfono: {comercio.telefonoComercio}</p>
            <p>Puntuación: {comercio.puntuacion}</p>
            <p>Comentarios:{comercio.comentarios}</p>
            
            {onDelete && (
                <button className="bg-red-500 text-white rounded-md px-4 py-2 mt-4"
                    onClick={() => onDelete(comercio.idComercio)}>
                    Borrar Comercio
                </button>
            )}
            
            <hr></hr>
        </div>
    );
    
}

export default cartaComercio;
