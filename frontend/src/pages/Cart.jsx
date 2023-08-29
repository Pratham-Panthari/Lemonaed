import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'

const Cart = () => {

  const navigate = useNavigate()

  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()

 

  const handleRemove = (pid) => {
    const myCart = [...cart]
    const index = myCart.findIndex(item => item._id === pid)
    myCart.splice(index,1)
    setCart(myCart)
    localStorage.setItem('cart', JSON.stringify(myCart))
    
  }

  const totalPrice = () => {
    let totalPrice = 0
    cart?.map((c) => {
      totalPrice = parseInt(c.product.price) + parseInt(totalPrice)
    })
    
    return totalPrice
  }

  
  
  return (
    <>
        <Layout>
          {
            auth?.token ? 
            (<>
             <section className='mt-16 w-[80%] mx-auto'>
                <div className='lg:flex w-full gap-3'>
                  <div className='lg:w-[60%] w-full px-2 py-3 '>
                    <h1 className='text-3xl text-black font-semibold text-center mb-4'>Your Cart</h1>
                    <hr />
                    {
                      cart?.length > 0 ? 
                      (<>
                        {
                          cart?.map((c, index) => 

                          <div key={index} className='px-4 py-8 flex gap-4 '>
                            <div className='w-[35%] lg:h-[300px] h-[150px] md:h-[300px]'>
                              <img className='w-full h-full object-contain' src={c.product.photo[0]} />
                            </div>
                            <div className='w-[60%]'>
                              <h1 className='px-2 py-3 lg:text-xl  md:text-xl text-md text-black font-semibold'>{c.product.name}</h1>
                              <h1 className='px-2 py-3 lg:text-md  md:text-md text-sm text-stone-500 font-normal inline border-r-2 border-black'>size: {c.size}</h1>
                              <h1 className='px-2 py-3 lg:text-md  md:text-md text-sm text-stone-500 font-normal inline'>Quantity: {c.quantity}</h1>
                              <h1 className='px-2 py-4 lg:text-xl  md:text-xl text-md text-black font-semibold'>Rs. {c.product.price}</h1>
                            </div>
                            <div className='w-[5%]'>
                              <div className='px-2 py-3 cursor-pointer' onClick={() => { handleRemove(c.product._id) }} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-trash" viewBox="0 0 16 16">
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                          )
                        }
                      </>) : 
                      (<>
                        <h1 className='text-xl text-stone-600 font-semibold'><i>No Items in Cart</i></h1>
                      </>)
                    }
                  </div>
                  <div className='lg:w-[40%] w-full h-fit px-2 py-2'>
                    <div className='w-full h-full bg-gray-50'>
                      <div className='px-4 py-4 '>
                        <h1 className='text-black text-3xl font-bold text-center mb-4'>Order Summary</h1>
                        <hr />
                        <div className='px-3 py-3 flex justify-around gap-4'>
                          <div className='lg:w-[75%] w-[60%]'>
                            <h1 className='text-xl text-stone-700 font-normal '>Sub-Total</h1>
                          </div>
                          <div className='lg:w-[25%] w-[40%]'>
                            <h1 className='text-lg text-stone-700 font-normal '>Rs. {totalPrice()}</h1>
                          </div>
                        </div>
                        <hr />
                        <div className='px-3 py-3 flex justify-around gap-4'>
                          <div className='w-[75%]'>
                            <h1 className='text-xl text-stone-700 font-normal '>Convience Fee</h1>
                          </div>
                          <div className='w-[25%]'>
                            <h1 className='text-lg text-stone-700 font-normal '>Rs. 10</h1>
                          </div>
                        </div>
                        <hr />
                        <div className='px-3 py-3 flex justify-around gap-4'>
                          <div className='w-[75%]'>
                            <h1 className='text-xl text-black font-semibold '>Order Total</h1>
                          </div>
                          <div className='w-[25%]'>
                            <h1 className='text-lg text-black font-semibold '>Rs. {totalPrice() + parseInt(10)}</h1>
                          </div>
                        </div>
                        <div className='px-3 py-3'>
                          <button className='px-8 py-4 text-white text-lg bg-black font-semibold disabled:bg-gray-400' onClick={() => { navigate('/shipping') }} disabled={cart?.length < 1}>Checkout</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>
            </>) :
            (<>
              <section className='mt-16 w-[80%] mx-auto'>
                <div className='px-4 py-4 h-[80vh]'>
                  <h1 className='text-2xl text-black font-bold text-center' >Please Login To Continue to access cart</h1>
                  <Link to='/login'><h1 className='text-xl text-indigo-700 font-bold hover:underline text-center'>LogIn</h1></Link>
                </div>
              </section>
            </>)
          }
          
        </Layout>
    </>
  )
}

export default Cart
