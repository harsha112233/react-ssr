// import logo from './logo.svg';
import './App.css'
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <>
     
     <h1>App</h1>
     
    
         <Routes>
           <Route  path="/" element={<Home />} />

         
          </Routes>
          
     
    </>
  );
}

export default App;
