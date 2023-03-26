import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getPokemonsTypes } from '../actions/index';
import styles from '../styles/form.module.css'


function validate(inputs){
    const stringRegExp = /^[a-zA-Z]{1,20}$/;
    const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
    const urlRegExp = /^(?=.{1,255}$)(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/; //Me fijo que no tenga más de 255 caracteres, ya que el modelo pokemon usa datatype varchar en la url.


    let errors = {};

    if(!inputs.Nombre){
        errors.Nombre = '*Ingrese un nombre.'
    }  else if (!stringRegExp.test(inputs.Nombre)) {
        errors.Nombre = '*Nombre inválido.';
    }

    if(!inputs.Imagen){
        errors.Imagen = '*Ingrese una URL para la imagen.';
        } else if (!urlRegExp.test(inputs.Imagen)){
        errors.Imagen = '*URL inválida.';
      }
  
  
      if(!inputs.Vida){
        errors.Vida = '*Ingrese una vida.';
        } else if (!numberRegExp.test(inputs.Vida)){
        errors.Vida = '*Vida inválida.';
      }

      if(!inputs.Ataque){
        errors.Ataque = '*Ingrese un valor de ataque.';
        } else if (!numberRegExp.test(inputs.Ataque)){
        errors.Ataque = '*Ataque inválido.';
      }

      if(!inputs.Defensa){
        errors.Defensa = '*Ingrese un valor de defensa.';
        } else if (!numberRegExp.test(inputs.Defensa)){
        errors.Defensa = '*Defensa inválida.';
      }
  
  
  
      if(inputs.tipos.length <= 0 || inputs.tipos.length > 2){
        errors.tipos = '*Seleccione uno o dos tipos';
      }
  
      return errors;
}

export default function Form(){

    const dispatch = useDispatch();

    const initialInputs = {
      Nombre: '',
      Imagen: '',
      Vida: 0,
      Ataque: 0,
      Defensa: 0,
      Velocidad: 0,
      Altura: '',
      Peso: '',
      tipos: [],
    }

    const[inputs, setInputs] = useState(initialInputs)

    const [disabler, setDisabler] = useState(true)

    const [errors, setErrors] = useState({});

    const types = useSelector(state => state.types);


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
  
      const newInputs = {
          ...inputs,
          [event.target.name]: newValue
      };
  
      //Hago todo esto porque el disabler estaba usando el estado anterior de errors.
      setInputs(newInputs);
  
      const newErrors = validate(newInputs);
      setErrors(newErrors);
  
      const hasErrors = Object.keys(newErrors).length > 0;
      setDisabler(hasErrors);
  }
  

    useEffect(() => {

        dispatch(getPokemonsTypes());

       
      }, [dispatch]);

    function handleSubmit(event){
        event.preventDefault();
        if(Object.keys(errors).length > 0){
            alert('El formulario no se llenó correctamente.');
        } else {
            dispatch(createPokemon(inputs));
            alert('Pokemon creado con éxito');
        }
    }


    return <div className={styles.back}>
      <h2 className={styles.title}>Crea tu propio pokemon:</h2>
        <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.field}>
            <label  className={styles.labels}>*Nombre: </label>
            <input className={styles.inputs}
                type="text" 
                name="Nombre"
                value={inputs.Nombre}
                placeholder="Nombre del nuevo pokemon..."
                onChange={handleInputChange}/>
            </div>
                {errors.Nombre && <span className={styles.error}>{errors.Nombre}</span>}


            <div className={styles.field}>
            <label className={styles.labels}>*Imagen: </label>
            <input className={styles.inputs}
                type="text" 
                name="Imagen"
                value={inputs.Imagen}
                placeholder="URL de la imagen del nuevo pokemon..."
                onChange={handleInputChange}/>
            </div>
                {errors.Imagen && <span className={styles.error}>{errors.Imagen}</span>}


            <div className={styles.field}>
            <label className={styles.labels}>Altura: </label>
            <input className={styles.inputs}
                type="number" 
                name="Altura"
                value={inputs.Altura}
                placeholder="Altura del nuevo pokemon..."
                onChange={handleInputChange}/>
                </div>
                {errors.Altura && <span className={styles.error}>{errors.Altura}</span>}


            <div className={styles.field}>
            <label className={styles.labels}>Peso: </label>
            <input className={styles.inputs}
                type="number" 
                name="Peso"
                value={inputs.Peso}
                placeholder="Peso del nuevo pokemon..."
                onChange={handleInputChange}/>
                </div>
                {errors.Peso && <span className={styles.error}>{errors.Peso}</span>}

            <div className={styles.field}>
            <label className={styles.labels}>*Vida: </label>
            <input className={styles.inputs}
                type="number" 
                name="Vida"
                value={inputs.Vida}
                placeholder="Vida del nuevo pokemon..."
                onChange={handleInputChange}/>
                </div>
                {errors.Vida && <span className={styles.error}>{errors.Vida}</span>}

            <div className={styles.field}>
            <label className={styles.labels}>*Ataque: </label>
            <input className={styles.inputs}
                type="number" 
                name="Ataque"
                value={inputs.Ataque}
                placeholder="Ataque del nuevo pokemon..."
                onChange={handleInputChange}/>
                </div>
                {errors.Ataque && <span className={styles.error}>{errors.Ataque}</span>}

            <div className={styles.field}>
            <label className={styles.labels}>*Defensa: </label>
            <input className={styles.inputs}
                type="number" 
                name="Defensa"
                value={inputs.Defensa}
                placeholder="Defensa del nuevo pokemon..."
                onChange={handleInputChange}/>
                </div>
                {errors.Defensa && <span className={styles.error}>{errors.Defensa}</span>}

            <div className={styles.field}>
            <label className={styles.labels}>Velocidad: </label>
            <input className={styles.inputs}
                type="number" 
                name="Velocidad"
                value={inputs.Velocidad}
                placeholder="Velocidad del nuevo pokemon..."
                onChange={handleInputChange}/>
                </div>
                {errors.Velocidad && <span className={styles.error}>{errors.Velocidad}</span>}


          <label className={styles.labels}>*Tipo/s: </label>
        <div className={styles.field}>

          <div className={styles.types}>
            {types.map((type) => (
                <label key={type} className={styles.type} >
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
            </div>

</div>
                {errors.tipos && <span className={styles.error}>{errors.tipos}</span>}

            <input className={styles.createBtn} type="submit" value='Crear' disabled={disabler}/>
            
            <label className={styles.message}>Los campos marcados con un * son obligatorios.</label>
        </form>
    </div>
}




