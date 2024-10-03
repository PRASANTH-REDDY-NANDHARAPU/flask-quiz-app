import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar';
const root = ReactDOM.createRoot(document.getElementById('root'));
function App() {
  return (
    <div>
        <Navbar/>
    </div>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

