import React from 'react'
import logo from '../assests/HOVS4.png'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
const AdminMenu = () => {

    const [auth, setAuth] = useAuth()
    const navigate = useNavigate()

    

    const handleLogout = () => {
        
        setAuth({
            ...auth,
            id: null,
            name: null,
            email:null,
            address: null,
            phno: null,
            role: null,
            token: "",
         })
        localStorage.removeItem('auth')
        navigate('/')
    }
    

  return (
   <>
    <div className='lg:w-[25%] w-full bg-indigo-600 lg:h-full h-fit '>
        <div className='px-4 py-8'>
            <div className='flex justify-center'>
                <Link to='/'>
                    <img className='h-16 w-auto self-center' src={logo} alt='Company Logo' />
                </Link>
             </div>
            <div className='mt-10 w-full'>
                <Link to='/admin'>
                     <h1 className='text-white text-xl text-center font-bold mb-6'>Dashboard</h1>
                </Link>
                <Link to='/admin-manage-category'>
                    <h1 className='text-white text-xl text-center font-bold mb-6'>Manage Category</h1>
                 </Link>
                <Link to='/admin-manage-product'>
                                <h1 className='text-white text-xl text-center font-bold mb-6'>Manage Products</h1>
                </Link>
                <Link to='/admin-orders'>
                        <h1 className='text-white text-xl text-center font-bold mb-6'>Admin Orders</h1>
                </Link>
                <div className='cursor-pointer' onClick={handleLogout}>
                    <h1 className='text-white text-xl text-center font-bold mb-6'>Logout</h1>
                </div>

                
            </div>
        </div>
    </div>
   </>
  )
}

export default AdminMenu
