import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Home/auth/Login';
import Register from './pages/Home/auth/Register';
import Reset from './pages/Home/auth/Reset';
import Forgot from './pages/Home/auth/Forgot';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
