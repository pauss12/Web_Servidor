
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


function Buscador(props) {
    
    const tasks = props.lista;
    const setTasks = props.setLista;

    const [originalTasks, setOriginalTasks] = useState([])

    const handleSearch = (searchTerm) => {
        
        if (searchTerm === '') {
            
            setTasks(originalTasks);

        } else {

            setOriginalTasks(tasks);
        
            const filteredTasks = tasks.filter((task) => {

                return (
                    
                    task.nombreComercio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.ciudadComercio.toLowerCase().includes(searchTerm.toLowerCase()) 

                );
            });

            setTasks(filteredTasks);
            
        }
    }; 


    return (


        <div className="input-group mb-3">

            <span className="fa-solid fa-magnifying-glass" style={{ marginRight: '3px' }}></span>
            <input
                type="text"
                className="form-control"
                id="floatingInputGroup1"
                placeholder="Buscador"
                value={props.searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
            />

        </div>
    );
}

export default Buscador;