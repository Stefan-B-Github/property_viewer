import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyList from './components/PropertyList.js';
import PropertyAdd from './components/PropertyAdd';


function App() {
  return (
    <div className="App">
      <div class="container">
      <PropertyList/>
      <hr/>
      <PropertyAdd/>
      </div>
    </div>
  )
}

export default App;
