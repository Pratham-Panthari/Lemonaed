import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import StripeCheckout from 'react-stripe-checkout'
const Shipping = () => {

    const navigate = useNavigate()

    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()

    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("")
    const [loading, setLoading] = useState(false)


    const totalPrice = () => {
        let totalPrice = 0
        cart?.map((c) => {
          totalPrice = parseInt(c.product.price) + parseInt(totalPrice)
        })
        
        return totalPrice
      }
      

      const handlePayment = async() => {
        try {
          const res = await axios.post('https://lemonaed-server.onrender.com/api/v1/product/create-checkout-session', { cart }, {
            headers: {
              Authorization: auth?.token
            }
          })
          if(res.data.url){
            setCart([])
            localStorage.removeItem('cart')
            window.location.href = res.data.url
          }
        } catch (error) {
          
        }
      }
    
      useEffect(() => {
        
      }, [])
    
      

  return (
    <>
      {
        loading ? (<>
          <div className='w-full h-screen flex justify-center items-center'>
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>) :
        (<>
          <Layout>
              <section className='mt-16 w-[80%] mx-auto'>
                  <div className='lg:flex gap-2'>
                      <div className='lg:w-[60%] w-full px-3 py-4'>
                          <h1 className='text-3xl text-black font-semibold text-center mb-4'>Shipping Details</h1>
                          <hr/>
                          <h1 className='px-3 py-2 text-xl text-black font-bold'>Shipping Address: </h1>
                          <h1 className='px-3 py-2 text-black font-normal text-md'>Name: {auth?.name}</h1>
                          <h1 className='px-3 py-2 text-black font-normal text-md'>Phone No: {auth?.phno}</h1>
                          <p className='px-3 py-2 text-black font-normal text-md'>Address: {auth?.address}</p>
                          <h1 className='px-3 py-2 text-black font-normal text-md'>Email: {auth?.email}</h1>
                          <hr />
                          
                      </div>
                      <div className='lg:w-[40%] w-full h-fit px-2 py-2'>
                      <div className='w-full h-full bg-gray-50'>
                        <div className='px-4 py-4 '>
                          <h1 className='text-black text-3xl font-bold text-center mb-4'>Order Summary</h1>
                          <hr />
                          <div className='px-3 py-3 flex justify-around gap-4'>
                            <div className='w-[75%]'>
                              <h1 className='text-xl text-stone-700 font-normal '>Sub-Total</h1>
                            </div>
                            <div className='w-[25%]'>
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
                          <div>
                           
                            <button type='button' className='text-white text-xl bg-black px-4 py-3 font-normal' onClick={handlePayment}>Pay & Order</button>
                            
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </section>
          </Layout>
        </>)
      }
        
    </>
  )
}

export default Shipping
