import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import SetAvatars from './pages/SetAvatars';
function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/setavatars" element={<SetAvatars/>}/>
        <Route exact path="/" element={<Chat/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
