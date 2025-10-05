
import './App.css'
import Home from './pages/Home';
import {Routes ,Route} from "react-router-dom"
import Login from './pages/Login';
import Singup from './pages/Singup';
import Auth from './middleware/Auth';
import { Toaster } from 'react-hot-toast';

function App() {


  return (
    <>
  <Toaster/>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/singup' element={<Singup/>}/>
    <Route element={<Auth/>}>

    <Route path='/' element={<Home/>}/>
    </Route>
  </Routes>
    </>
  )
}

export default App;
