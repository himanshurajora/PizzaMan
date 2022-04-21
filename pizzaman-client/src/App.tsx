import './App.css';
import {
  Link,
  Route,
  Routes
} from 'react-router-dom'
import Home from './components/home/Home';
import NotFound from './components/notfound/NotFound';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={Home()} />
        <Route path="*" element={NotFound()} />
      </Routes>
    </div>
  );
}

export default App;
