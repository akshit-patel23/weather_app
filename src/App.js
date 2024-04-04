
import './App.css';
import bg from './Assets/background.jpg';
import Weather from './components/Weather';

function App() {
  return (
    <div className="App" style={{backgroundImage:`url(${bg})`,height:"100vh",backgroundSize:"cover"}}>
     <Weather/>
    </div>
  );
}

export default App;
