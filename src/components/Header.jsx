import React from "react";
import { useColor } from "../context/ThemeContext";

function Header() {
  const color = useColor()
  const [estado, setEstado] = React.useState(false)
  const handleClick = () => {
    setEstado(!estado)
  }
  return(
    <>
      <div>
        <h1>React Hooks</h1>
        <h3>Tipo de color: {color.green}</h3>
        <button onClick={handleClick}>
          {estado ?'activado' : 'desactivado'}
        </button>
      </div>
    </>
  )
}

export default Header