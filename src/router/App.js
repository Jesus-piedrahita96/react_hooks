import '../css/App.css';
import Header from '../components/Header';
import Character from '../components/Character';
import { ThemeContext } from '../context/ThemeContext';

function App() {
  return (
    <ThemeContext>
      <div className="App">
        <h1>hola mundo</h1>
        <Header />
        <hr/>
        <Character />
      </div>
    </ThemeContext>
  );
}

export default App;