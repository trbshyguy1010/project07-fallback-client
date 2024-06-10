import logo from './logo.svg';
import './App.css';
import Register from './pages/register';
import Chat from './pages/chat';
import Login from './pages/login';
import Welcum from './pages/welcum';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contacts from './components/contacts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/" element={<Welcum/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
