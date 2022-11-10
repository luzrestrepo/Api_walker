import { useParams} from "react-router-dom";
import React, { useEffect, useState} from 'react';
import axios from 'axios';

const people = ["name","gender","height"] //lista de diccionarios de cada atributo



const Id = props => {

    const {id} = useParams();
    
    const [nombres, setNombres] = useState([]);
    

    useEffect(()=>{
        
        let url="https://swapi.dev/api/people/" + id
        
            axios.get(url)  //atravez de get hacemos un llamado, un request
                .then(solucion => solucion.data)
                .then(data => {
                    let start = data; //depende a que informacion quiere entrar con el data.results o 
                    setNombres(start)
                console.log(start)
                
                })
    }, [id])
    
    return (
        <div>
            {
                people.map((item) => //el map es solo para listas
                <h5 key={item}>{item} : {nombres[item]}</h5> //los : es para el separador
                )

            } 
            
        </div>
    )

    
}



export default Id;