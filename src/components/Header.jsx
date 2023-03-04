import React from "react";

function Header() {
  const [estado, setEstado] = React.useState(false)

  const handleClick = () => {
    setEstado(!estado)
  }
  return(
    <>
      <div>
        <h1>React Hooks</h1>
        <button onClick={handleClick}>
          {estado ?'activado' : 'desactivado'}
        </button>
      </div>
    </>
  )
}

export default Header