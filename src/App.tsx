import './App.css';
import './components/Router'
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';

function App() {


  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Router/>
    </div>
  </BrowserRouter>) 
}

export default App
