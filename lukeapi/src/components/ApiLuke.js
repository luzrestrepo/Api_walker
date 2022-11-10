import React, {useState} from 'react';

import axios from 'axios';

const menu = {
    people: ["name","gender","height","homeworld"], //lista de diccionarios de cada atributo
    films: ["title", "release_date", "episode_id", "director"],
    planets: ["name", "terrain", "population", "climate"],
    species: ["name", "language", "designation", "eye_colors"],
    vehicles: ["name",  "model",  "max_atmosphering_speed",  "vehicle_class"],
    starships: ["name",  "model", "starship_class", "max_atmosphering_speed"]

}

const ApiLuke = () => {


    const [walker, setWalker] = useState('');
    const[seleccionar, setSeleccionar] = useState('people'); //seleccionarCategoria
    const[estadoApi, setEstadoApi] = useState({})//[] diccionario vacio, estado que guarda la respuesta de la api

    const crearWalker = e => {
        e.preventDefault(); 
        console.log(walker);
        console.log(seleccionar);
        let url="https://swapi.dev/api/" 
        console.log(url);
        url += seleccionar + "/" + walker; // para ingresar el /, dependiendo de como lo pida la documentacion
        console.log(url)
    
        
        //Llamada a la api con Axios
        axios.get(url) // estructura del axios la variable ".get" se convierte en ".data" y ".data" se convierte en "result"(el nombre que desee)
        .then(result => result.data)
        .then(result => {
            console.log(result)
            if (seleccionar === "people") { // con el "if" seleccionar decimos que es categoria de "people"
                axios.get(result.homeworld) // traemos el resultado con "result" en la posicion "homeworld"
                .then(res => res.data)//se puede cualquier nombre en este caso "res", el data tiene que ser siempre "data"
                .then(res => {result.homeworld = res.name
                    setEstadoApi(result)})//cambiamos el nombre por "res" para que no tome el "result" anterior, lo igualamos a "res.name" para el nombre del planeta
                    
            }else {
            setEstadoApi(result) // mostramos el estado de la respuesta
        }


        })
        .catch(error => setEstadoApi({}))
    }

    
    
    


    return(
        
        <div className='app'>
            <form onSubmit={crearWalker}>
                    
                <div className='formulario'>
                        <div>
                            <select className='form-select' id="floatingSelectGrid" onChange={(e) => setSeleccionar(e.target.value)} value={seleccionar}>
                                        <option value="0">Search for</option>
                                        <option value="people">People</option>
                                        <option value="films">Films</option>
                                        <option value="planets">Planets</option>
                                        <option value="species">Species</option>
                                        <option value="vehicles">Vehicles</option>
                                        <option value="starships">Starships</option>
                            </select>
                        </div>
                        <div>
                            <input type="number" onChange={(e) => setWalker(e.target.value)} value={walker} />
                            <input type="submit" className="btn btn-success" value="Search" />
                        </div>
                </div>
            </form>
            <div className='border border-dark border border-5 rounded-3 p-3 mb-2'>
                {
                    seleccionar!== ""? //operador ternario 
                    menu[seleccionar].map((opcion) =>  //entre menu y map va la posicion del estado, opcion muestra cada uno de los atributos y el num muestra el numero de la posicion y pondriamos {num} en el <h5> para mostrar ese numero
                        <h5>{opcion} : {estadoApi[opcion]}</h5>) // respuesta "estadoApi" en la posicion "opcion"
                        
                        : null
                        
                        
                    }
                
                    
                
            </div>
            {
                Object.keys(estadoApi).length === 0?
                <h3>Estos no son los droides que está buscando</h3>
                
                
                : null
                
            }
            {
                Object.keys(estadoApi).length === 0?
                <img src="https://i0.wp.com/entretenimiento.news/img/2022/06/1655932174_Final-de-Obi-Wan-Kenobi-un-puente-entre-precuelas-que-tiene.jpg" alt="img"/>
                    
                    : null
                    
                }
        </div>
    )
}





export default ApiLuke;