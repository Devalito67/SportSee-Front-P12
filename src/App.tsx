import './App.css';
import './components/Router';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <div className='main-container'>
        <Sidebar />
        <Router/>
        </div>
    </div>
  </BrowserRouter>) 
}

export default App
