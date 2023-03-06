//importaciones
import axios from "axios";
import React from "react";

import '../css/App.css'

//variables
let aux = []

function Character() {
  const URL = "https://rickandmortyapi.com/api/character"
  const [ estado, dispatch ] = React.useReducer(reducer, initialState)
  const searchInput = React.useRef(null)

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

  //actualizar buscador
  const update = () => {
    dispatch({type: actionType.search, payload:searchInput.current.value})
  }

  // const filtrar = estado.datos.filter((user) => {
  //   const dataFiltrar = user.name.toLowerCase()
  //   const buscador = estado.search.toLowerCase()
  //   return dataFiltrar.includes(buscador)
  // })

  //filtrar los datos
  const filtrar = React.useMemo(() =>
    estado.datos.filter((user) => {
      const dataFiltrar = user.name.toLowerCase()
      const buscador = estado.search.toLowerCase()
      return dataFiltrar.includes(buscador)
    }),
    [estado.datos, estado.search]
  )

  return (
    <>
      <input
        className="container-search"
        value={estado.search}
        ref={searchInput}
        onChange={update}
        placeholder='Escribe el nombre'
      />
      <div className="container">
        {filtrar.map(data => (
          <div className="container-rick" key={data.id}>
            <div className="container-rick__head">
              <h2>{data.name}</h2>
              <button onClick={() => add(data)}>
                Agreagar a favoritos
              </button>
            </div>
            <img
              className="container-rick__image"
              src={data.image}
              alt='imagenes'
            />
          </div>
        ))}
      </div>
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
    </>
  )
}

const initialState = {
  datos: [],
  favorite: [],
  search: ''
}

const actionType = {
  agregar: 'AGREGAR',
  favorites: 'FAVORITES',
  search: 'SEARCH'
}

const objectReduce = (state, payload) => ({
  [actionType.agregar]: {
    ...state,
    datos: payload
  },
  [actionType.favorites]: {
    ...state,
    favorite: payload
  },
  [actionType.search]: {
    ...state,
    search: payload
  }

})

function reducer(state, action) {
  return objectReduce(state, action.payload)[action.type] || state
}


export default Character