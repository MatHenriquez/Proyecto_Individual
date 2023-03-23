import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getPokemonsTypes } from '../actions/index';


function validate(inputs){
    const stringRegExp = /^[a-zA-Z]{1,20}$/;
    const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
    const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;

    let errors = {};

    if(!inputs.Nombre){
        errors.Nombre = 'Ingrese un nombre.'
    }  else if (!stringRegExp.test(inputs.Nombre)) {
        errors.Nombre = 'Nombre inválido.';
    }

    if(!inputs.Imagen){
        errors.Imagen = 'Ingrese una URL para la imagen.';
        } else if (!urlRegExp.test(inputs.Imagen)){
        errors.Imagen = 'URL inválida.';
      }
  
  
      if(!inputs.Vida){
        errors.Vida = 'Ingrese una vida.';
        } else if (!numberRegExp.test(inputs.Vida)){
        errors.Vida = 'Vida inválida.';
      }

      if(!inputs.Ataque){
        errors.Ataque = 'Ingrese un valor de ataque.';
        } else if (!numberRegExp.test(inputs.Ataque)){
        errors.Ataque = 'Ataque inválida.';
      }

      if(!inputs.Defensa){
        errors.Defensa = 'Ingrese un valor de defensa.';
        } else if (!numberRegExp.test(inputs.Defensa)){
        errors.Defensa = 'Defensa inválida.';
      }
  
  
  
      if(inputs.tipos.length === 0){
        errors.tipos = 'Seleccione algún tipo';
      }
  
      return errors;
}

export default function Form(){

    const dispatch = useDispatch();

    const[inputs, setInputs] = useState({
      Nombre: '',
      Imagen: '',
      Vida: 0,
      Ataque: 0,
      Defensa: 0,
      Velocidad: 0,
      Altura: '',
      Peso: '',
      tipos: [],
    })

    const [disabler, setDisabler] = useState(true)

    const [errors, setErrors] = useState({});

    const types = useSelector(state => state.pokemonTypes)

    // function handleInputChange(event){

    //     setInputs({
    //         ...inputs,
    //         [event.target.name]: event.target.value
    //     })
    //     setErrors(validate({
    //         ...inputs,
    //         [event.target.name]: event.target.value
    //     }))
        
    // }

    function handleInputChange(event) {

        let newValue;
      
        if (event.target.type === 'checkbox') {
          if (event.target.checked) {
            newValue = inputs.tipos.concat(event.target.value);
          } else {
            newValue = inputs.tipos.filter(tipo => tipo !== event.target.value);
          }
        } else {
          newValue = event.target.value;
        }
      
        setInputs({
          ...inputs,
          [event.target.name]: newValue
        });
      
        setErrors(validate({
          ...inputs,
          [event.target.name]: newValue
        }));
      }

    useEffect(() => {

        dispatch(getPokemonsTypes());

        // Verificar si hay errores en el formulario
        const hasErrors = Object.keys(errors).length > 0;
    
        // Actualizar el estado de "disabler"
        setDisabler(hasErrors);
      }, [errors]);

    function handleSubmit(event){
        event.preventDefault();
        if(Object.keys(errors).length > 0){
            alert('El formulario no se llenó correctamente.');
        } else {
            console.log(inputs);
            dispatch(createPokemon(inputs));
        }
    }


    return <div>
        <form onSubmit={handleSubmit}>

            <label >*Nombre: </label>
            <input 
                type="text" 
                name="Nombre"
                value={inputs.Nombre}
                placeholder="Nombre del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Nombre && <span>{errors.Nombre}</span>}
                <br />

            <label>*Imagen: </label>
            <input 
                type="text" 
                name="Imagen"
                value={inputs.Imagen}
                placeholder="URL de la imagen del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Imagen && <span>{errors.Imagen}</span>}
                <br />

            <label>Altura: </label>
            <input 
                type="number" 
                name="Altura"
                value={inputs.Altura}
                placeholder="Altura del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Altura && <span>{errors.Altura}</span>}
                <br />

            <label>Peso: </label>
            <input 
                type="number" 
                name="Peso"
                value={inputs.Peso}
                placeholder="Peso del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Peso && <span>{errors.Peso}</span>}
                <br />

            <label>*Vida: </label>
            <input 
                type="number" 
                name="Vida"
                value={inputs.Vida}
                placeholder="Vida del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Vida && <span>{errors.Vida}</span>}
                <br />

            <label>*Ataque: </label>
            <input 
                type="number" 
                name="Ataque"
                value={inputs.Ataque}
                placeholder="Ataque del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Ataque && <span>{errors.Ataque}</span>}
                <br />

            <label>*Defensa: </label>
            <input 
                type="number" 
                name="Defensa"
                value={inputs.Defensa}
                placeholder="Defensa del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Defensa && <span>{errors.Defensa}</span>}
                <br />

            <label>Velocidad: </label>
            <input 
                type="number" 
                name="Velocidad"
                value={inputs.Velocidad}
                placeholder="Velocidad del nuevo pokemon..."
                onChange={handleInputChange}/>
                {errors.Velocidad && <span>{errors.Velocidad}</span>}
                <br />

            <label>*Tipo/s: </label>

            {types.map((type) => (
                <label key={type} >
                <input
                type="checkbox"
                name="tipos"
                value={type}
                checked={inputs.tipos.includes(type)}
                onChange={handleInputChange}
                />
                {type}
                </label>
            ))}

                <br />
                {errors.tipos && <span>{errors.tipos}</span>}
                <br />

            <input type="submit" value='Crear' disabled={disabler}/>
            <br />
            <label>Los campos marcados con un * son obligatorios.</label>
        </form>
    </div>
}




