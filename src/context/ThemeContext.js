import React from "react";
const DataContext = React.createContext()

function ThemeContext({children}) {
  const [color, setColor] = React.useState({
    red: 'red',
    green: 'green',
    black: 'black'
  })
  return(
    <DataContext.Provider
    value={
      color
    }
    >
      {children}
    </DataContext.Provider>
  )
}

function useColor() {
  const data = React.useContext(DataContext)
  return data
}

export {ThemeContext, useColor}