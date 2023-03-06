//importaciones
import axios from "axios";
import React from "react";

//variables
let aux = []

function Character() {
  const URL = "https://rickandmortyapi.com/api/character"
  const [ estado, dispatch ] = React.useReducer(reducer, initialState)

  //Solicitud de ajax (get)
  React.useEffect(() => {
    axios.get(URL)
      .then(response => dispatch({type: actionType.agregar ,payload: response.data.results}))
      .catch(error => console.log(error))
      .finally(() => console.log('finalizando solicitud get'))

  }, [])

  //agregar favoritos
  const add = (object) => {
    aux.push(object)
    dispatch({type: actionType.favorites, payload: aux})
  }

  //eliminar favoritos
  const eliminar = (id) => {
    let uid = aux.findIndex(data => data.id === id)
    aux.splice(uid, 1)
    dispatch({type: actionType.favorites, payload: aux})
  }

  return (
    <>
      <div>
        {estado.datos.map(data => (
          <div key={data.id}>
            <div>
              <h2>{data.name}</h2>
              <button onClick={() => add(data)}>
                Agreagar a favoritos
              </button>
            </div>
            <img src={data.image} alt='imagenes' />
          </div>
        ))}
        <hr/>
        <h1>Favoritos</h1>
        {estado.favorite.map((data, index) => (
          <div key={index}>
            <div>
              <h2>{data.name}</h2>
              <button onClick={() => eliminar(data.id)}>Eliminar</button>
            </div>
            <img src={data.image} alt='imagenes' />
          </div>
        ))}
      </div>
    </>
  )
}

const initialState = {
  datos: [],
  favorite: []
}

const actionType = {
  agregar: 'AGREGAR',
  favorites: 'FAVORITES'
}

const objectReduce = (state, payload) => ({
  [actionType.agregar]: {
    ...state,
    datos: payload
  },
  [actionType.favorites]: {
    ...state,
    favorite: payload
  }
})

function reducer(state, action) {
  return objectReduce(state, action.payload)[action.type] || state
}


export default Character