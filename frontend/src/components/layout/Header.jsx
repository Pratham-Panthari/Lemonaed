import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assests/HOVS4.png'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/cart'
import axios from 'axios'
const Header = () => {

    const navigate = useNavigate()

    const [auth, setAuth] = useAuth()
    const [cart] = useCart()

    const [categories, setCategories] = useState([])
    const [showDiv, setShowDiv] = useState(false)
    const [open, setOpen] = useState(false)

    const navigationItems = [
        {
          key: 1,
          itemName : 'About',
          itemLink: '/about',
          active: 'true',
        },
      ]

      const handleClick = () => { 
        setOpen((prevState) => !prevState); 
      }

      const getAllCategories = async () => {
        try {
            const res = await axios.get('https://lemonaed-server.onrender.com/api/v1/category/get-all-category')
            if(res.data){
                setCategories(res.data.category)
            }
        } catch (error) {
            
        }
      }

      useEffect(() => {
        getAllCategories()
      }, [])

  return (
    <>
        <nav className='bg-white shadow-lg shadow-grey-500/50'>
            <div className='flex items-center justify-between md:w-[75%] w-[92%] mx-auto py-2'>
                <div>
                    <Link to='/'>
                        <img className='h-16 w-auto' src={logo} alt='Brand Logo' />
                    </Link>
                </div>
                {
                    auth?.role === 1 ? 
                    (<>
                        <div className={`nav-Links md:static absolute bg-white flex items-center md:w-auto w-full md:min-h-fit min-h-[60vh] left-0 ${open ? 'top-[9%]' : 'top-[-100%]'} px-5`}>
                            <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
                            {
                                navigationItems.map((items) => 
                                
                                    <li key={items.key} className='text-stone-400  hover:text-stone-800'>
                                        <Link to={items.itemLink}>{items.itemName}</Link>
                                    </li>
                                
                                )
                            }
                                    <li className='text-stone-400  hover:text-stone-800'>
                                        <button className="w-full h-full text-stone-400 hover:text-stone-800 group" type="button"  onClick={() => setShowDiv((prevState) => !prevState)}>
                                            Products
                                        </button>
                                        
                                        {showDiv && <div className="absolute top-15 rounded-xl bg-gray-100 ">
                                            <ul className="py-2 text-sm text-black ">
                                                {
                                                    categories?.map(c => 
                                                        <li key={c._id} onClick={() => setShowDiv(false)}>
                                                            <Link to={`/categories/${c.slug}`} className="block px-4 py-2 hover:bg-white ">{c.name}</Link>
                                                        </li>    
                                                    )
                                                }
                                            </ul>
                                        </div>}
                                    </li>
                                    <li className='text-stone-400  hover:text-stone-800'>
                                        <Link to='/admin'>Admin</Link>
                                    </li>
                            </ul>
                        </div>
                    </>) : 
                    (<>
                        <div className={`nav-Links md:static absolute bg-white flex items-center md:w-auto w-full md:min-h-fit min-h-[60vh] left-0 ${open ? 'top-[9%]' : 'top-[-100%]'} px-5`}>
                            <ul className='flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8'>
                            {
                                navigationItems.map((items) => 
                                
                                    <li key={items.key} className='text-stone-400  hover:text-stone-800'>
                                    <Link to={items.itemLink}>{items.itemName}</Link>
                                    </li>
                                
                                )
                            }
                                    <li className='text-stone-400  hover:text-stone-800'>
                                        <button className="w-full h-full text-stone-400 hover:text-stone-800 group" type="button"  onClick={() => setShowDiv((prevState) => !prevState)}>
                                            Products
                                        </button>
                                        
                                        {showDiv && <div className="absolute top-15 rounded-xl bg-gray-100 ">
                                            <ul className="py-2 text-sm text-black ">
                                                {
                                                    categories?.map(c => 
                                                        <li key={c._id} onClick={() => setShowDiv(false)}>
                                                            <Link to={`/categories/${c.slug}`} className="block px-4 py-2 hover:bg-white ">{c.name}</Link>
                                                        </li>    
                                                    )
                                                }
                                            </ul>
                                        </div>}
                                    </li>
                            </ul>
                        </div>
                    </>)
                }

                <div className='flex items-center gap-2'> 
                    <button className='border-0 bg-transparent' onClick={() => { navigate('/search') }}>
                        <svg xmlns="ht<tp://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                    {
                        auth?.token ?
                        (<>
                        
                            <button className='border-0 bg-transparent' onClick={() => { navigate('/profile') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-person-square" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                                </svg>
                            </button>
                        
                        </>) :
                        (<>
                        
                            <button className='border-0 bg-transparent' onClick={() => { navigate('/login') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-person-square" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                                </svg>
                            </button>
                        
                        </>)
                    }
                    <div>
                        <button className='border-0 bg-transparent relative py-1 pr-3' onClick={() => { navigate('/cart') }}>
                            <span className="absolute top-0 right-0 bg-black rounded-full px-2 py-0.5 text-xs font-medium text-white ">
                                {cart?.length}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="black" className="bi bi-bag" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                            </svg>
                                    
                        </button>
                        </div>
                   
                    <button type='button' className='cursor-pointer md:hidden' onClick={handleClick}>
                    {
                        open ? 
                        (<>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        </>) :
                        (<>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        </>)
                    }
                            
                    </button>
                </div>

            </div>
        </nav>
    </>
  )
}

export default Header
