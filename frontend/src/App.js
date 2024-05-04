import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import Forgot from './pages/auth/Forgot'
import Sidebar from './components/Sidebar/Sidebar';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import AddProduct from './pages/addProduct/AddProduct';
import ProductDetail from './components/product/productDetail/ProductDetail';
import EditProduct from './pages/editProduct/EditProduct';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import Contact from './pages/contact/Contact';
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const checkLogin = async () => {
      const data = await getLoginStatus()
      if (data) {
        dispatch(SET_LOGIN(true))
      }
    }
    checkLogin()
  }, [])
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route path='/dashboard' element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        } />
        <Route path="/add-product" element={
          <Sidebar>
            <Layout>
              <AddProduct />
            </Layout>
          </Sidebar>
        } />
        <Route path="/product-details/:id" element={
          <Sidebar>
            <Layout>
              <ProductDetail />
            </Layout>
          </Sidebar>
        } />

        <Route path="/edit-product/:id" element={
          <Sidebar>
            <Layout>
              <EditProduct />
            </Layout>
          </Sidebar>
        } />

        <Route path="/profile" element={
          <Sidebar>
            <Layout>
              <Profile />
            </Layout>
          </Sidebar>
        } />

<Route path="/profile-update" element={
          <Sidebar>
            <Layout>
              <EditProfile />
            </Layout>
          </Sidebar>
        } />
        
<Route path="/contact-us" element={
          <Sidebar>
            <Layout>
              <Contact />
            </Layout>
          </Sidebar>
        } />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
