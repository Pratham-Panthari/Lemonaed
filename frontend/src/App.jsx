import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Product from './pages/Products'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Cart from './pages/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import ProductDetails from './pages/ProductDetails'
import Dashboard from './admin/Dashboard'
import ManageCategory from './admin/ManageCategory'
import ManageProducts from './admin/ManageProducts'
import AdminOrders from './admin/AdminOrders'
import Shipping from './pages/Shipping'
import Categories from './pages/Categories'
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact-us' element={<ContactUs />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/products/:slug' element={<ProductDetails />}></Route>
        <Route path='/admin' element={<Dashboard />}></Route>
        <Route path='/admin-manage-category' element={<ManageCategory />}></Route>
        <Route path='/admin-manage-product' element={<ManageProducts />}></Route>
        <Route path='/admin-orders' element={<AdminOrders />}></Route>
        <Route path='/shipping' element={<Shipping />}></Route>
        <Route path='/categories/:slug' element={<Categories />}></Route>
      </Routes>
    </>
  )
}

export default App
