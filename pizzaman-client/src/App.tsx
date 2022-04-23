import './App.css';
import {
  Link,
  Route,
  Routes
} from 'react-router-dom'
import Home from './components/home/Home';
import NotFound from './components/notfound/NotFound';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import SelectSize from './components/sections/select-size/SelectSize';
import SelectIngredients from './components/sections/select-ingredients/SelectIngredients';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={Home()} />
        <Route path="/select-size" element={SelectSize()}/>
        <Route path="/select-ingredients" element={SelectIngredients()} />
        <Route path="*" element={NotFound()} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
