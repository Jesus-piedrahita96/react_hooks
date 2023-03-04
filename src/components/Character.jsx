import axios from "axios";
import React from "react";

function Character() {
  const URL = "https://rickandmortyapi.com/api/character"
  const [estado, setEstado] = React.useState([])

  React.useEffect(() => {
    axios.get(URL)
      .then(response => setEstado(response.data.results))
      .catch(error => console.log(error))
      .finally(() => console.log('finalizando solicitud get'))

  }, [])

  return(
    <>
      <div>
        {estado.map(data => (
          <div key={data.id}>
            <h2>{data.name}</h2>
            <img src={data.image} alt='imagenes' />
          </div>
        ))}
      </div>
    </>
  )
}

export default Character