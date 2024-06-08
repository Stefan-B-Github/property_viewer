import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditPage from './EditPage';
import HomePage from './HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="edit_property/:id" exact={false} element={< EditPage />} />
    </Routes>
  </BrowserRouter>


  );
}

export default App;
