import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate()

  const [auth, setAuth] = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllOrders = async() => {
    try {
      setLoading(true)
      const res = await axios.get('https://lemonaed-server.onrender.com/api/v1/auth/orders/get-all-orders', {
        headers : {
          Authorization: auth?.token
        }
      })
      if(res.data){
        setOrders(res.data.orders)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const cancleOrder = async (oid) => {
    try {
      setLoading(true)
      const status = "Cancelled"
      const res = await axios.put(`https://lemonaed-server.onrender.com/api/v1/auth/admin-orders/update-order/${oid}`, { status })
      if(res.data){
        getAllOrders()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const returnOrder = async (oid) => {
    try {
      setLoading(true)
      const status = "Returned"
      const res = await axios.put(`https://lemonaed-server.onrender.com/api/v1/auth/admin-orders/update-order/${oid}`, { status })
      if(res.data){
        getAllOrders()
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

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
            {
              auth?.token ? 
              (<>
                <div className='mt-4 flex justify-end'>
                  <div className='px-12'>
                    <button className='px-3 py-2 text-lg text-black font-bold' onClick={handleLogout}>Logout 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="bi bi-box-arrow-right inline ml-2 " viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <section className='mb-10 lg:w-[80%] w-full mx-auto h-fit'>
                  <div className='lg:flex gap-4'>
                    <div className='px-4 py-4 lg:w-[30%] w-full lg:border-r-2 lg:border-black'>
                      <h1 className='text-black text-2xl font-bold text-center mb-4'>Hi {auth?.name} !</h1>
                      <hr />
                      <div className='mt-4 '>
                        <h1 className='text-black text-lg'><b>Name:</b> {auth?.name}</h1>
                        <h1 className='text-black text-lg'><b>Email:</b> {auth?.email}</h1>
                        <h1 className='text-black text-lg'><b>Address:</b> {auth?.address}</h1>
                        
                      </div>
                    </div>
                    <div className='px-4 py-4 lg:w-[70%] w-full '>
                      <h1 className='text-black text-2xl font-bold text-center mb-4'>Your Orders</h1>
                      <hr />
                      
                      {
                        orders.map(o => 
                          
                          <div>
                            <div key={o._id} className='px-4 py-4 lg:flex gap-3 '> 
                              <div className='lg:w-[40%] w-full px-4 py-4'>
                                <h1 className='text-black text-lg font-bold text-center'>Order Details</h1>
                                <hr/>
                                  {
                                    o.products.map((p, index) => 
                                    
                                      <div key={index} className='px-2 py-4'>
                                          <h1 className='text-lg text-black '><b>Name:</b> {p.product.name}</h1>
                                          <h1 className='text-lg text-black '><b>Price:</b> {p.product.price}</h1>
                                          <h1 className='text-lg text-black'><b>Size:</b> {p.size} </h1>
                                          <h1 className='text-lg text-black '><b>Quantity</b> {p.quantity}</h1>
                                      </div>
                                    )
                                  }
                                
                              </div>
                              <div className='lg:w-[40%] w-full px-4 py-4'>
                                <h1 className='text-black text-lg font-bold text-center'>Shipping Details</h1>
                                <hr />
                                <div className='px-2 py-4'>
                                  
                                  <h1 className='text-lg text-black '><b>Phone No: </b> {auth?.phno}</h1>
                                  <h1 className='text-lg text-black '><b>Address: </b> {auth?.address}</h1>
                                </div>
                              </div>
                              <div className='lg:w-[20%] w-full px-4 py-4 '>
                                <h1 className='text-black text-lg font-bold text-center'>Order Status</h1>
                                <hr />
                                <h1 className='text-black text-md font-bold text-center self-center mt-4'>{o.status}</h1>
                              </div>
                            </div>
                            <div className='px-4 py-3'> 
                              {
                                o.status === 'Not Proccessed' || o.status === 'Proccessing' ?
                                (<>
                                  <button className='px-3 py-2 text-white bg-black text-md font-semibold' disabled={o.status === 'Cancelled' || o.status === 'Returned' } onClick={() => cancleOrder(o._id)}>Cancel Order</button>
                                </>) :
                                (<>
                                  <button className='px-3 py-2 text-white bg-black text-md font-semibold disabled:opacity-50' disabled={o.status === 'Returned' || o.status === 'Cancelled'} onClick={() => returnOrder(o._id)}>Return Order</button>
                                </>)
                              }
                            </div>
                          </div>
                        )
                      } 
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
        </>)
      }
        
    </>
  )
}

export default Profile
