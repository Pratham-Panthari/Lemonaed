import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import { useAuth } from '../context/auth'

const AdminOrders = () => {

  const [auth, setAuth] = useAuth()

  const [orders, setOrders] = useState([])
  const [orderStatus, setOrderStatus] = useState()
  const [loading, setLoading] = useState(false)

  const status = ["Not Proccessed", "Proccessing", "Shipped", "Delivered", "Cancelled", "Returned"]

  const options = ["Not Proccessed", "Proccessing", "Shipped", "Delivered", "Cancel Request","Cancelled", "Return Request", "Returned"]

  const getAllOrder = async() => {
    try {
      setLoading(true)
      const res = await axios.get('https://lemonaed-server.onrender.com/api/v1/auth/admin-orders/get-all-orders')
      if(res.data){
        setOrders(res.data.orders)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllOrder()
  }, [])

  const updateOrder = async (oid, selectedValue) => {
    try {
      setLoading(true)
        const status = selectedValue
        const res = await axios.put(`https://lemonaed-server.onrender.com/api/v1/auth/admin-orders/update-order/${oid}`, { status })
       if(res.data){
        getAllOrder()
        setLoading(false)
       }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleChange = (oid, event) => {
    const selectedValue = event.target.value
    updateOrder(oid, selectedValue)
  }

  return (
    <>
      {
        loading && (<>
          <div className='w-full h-screen flex justify-center items-center'>
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>)
      }
      {
      auth?.token && auth?.role === 1 ? 
      (<>
        <section className='w-full h-full'>
        <div className='lg:flex w-full h-full'>
          <AdminMenu />
          <div className='w-[70%]'>
            <div className='px-4 py-4'>
              <h1 className='text-5xl text-black font-bold text-center mb-2'>Admin Orders</h1>
              <hr style={{color:'black', height:'3px'}}/>
              <div className='px-3 py-4 flex gap-2'>
                {
                  status.map((s, index) => 
                  
                    <div key={index} className='w-[16%] focus:border-2 focus:border-black hover:border-2 hover:border-black cursor-pointer' onClick={() => { setOrderStatus(s); console.log(orderStatus) }}>
                      <h1 className='text-lg text-black font-bold text-center'>{s}</h1>
                    </div>
                  )
                }
              </div>
              <div className='flex px-3 py-4'>
                <div className='w-[10%]'>
                  <h1 className='text-lg text-black text-center font-bold'>Order no</h1>
                </div>
                <div className='w-[30%]'>
                  <h1 className='text-lg text-black text-center font-bold'>Order Details</h1>
                </div>
                <div className='w-[30%]'>
                  <h1 className='text-lg text-black text-center font-bold'>Buyer Details</h1>
                </div>
                <div className='w-[30%]'>
                  <h1 className='text-lg text-black text-center font-bold'>Order Status</h1>
                </div>
              </div>
              <hr />
              {
                orders.map((o, index) => 
                
                  <div>
                    {
                      o.status === orderStatus ? 
                      (<>
                        <div key={o._id} className='flex px-3 py-4'>
                          <div className='w-[10%] border-r-2 border-black'>
                            <h1 className='text-lg text-black text-center'>{index}</h1>
                          </div>
                          <div className='w-[30%] px-4  border-r-2 border-black'>
                            {
                              o.products.map((p, index) => 
                              
                                <div key={index}>
                                    <h1 className='text-lg text-black '>{p.product.name}</h1>
                                    <h1 className='text-lg text-black '>{p.product.price}</h1>
                                    <h1 className='text-lg text-black'><b>Size:</b> {p.size} </h1>
                                    <h1 className='text-lg text-black '><b>Quantity</b> {p.quantity}</h1>
                                </div>
                              )
                            }
                            
                          </div>
                          <div className='w-[30%] px-4 border-r-2 border-black'>
                            <h1 className='text-lg text-black '>{o.buyer.name}</h1>
                            <p className='text-lg text-black '>{o.buyer.address}</p>
                            <h1 className='text-lg text-black '>{o.buyer.email}</h1>
                            <h1 className='text-lg text-black '>{o.buyer.phno}</h1>
                          </div>
                          <div className='w-[30%] flex justify-center items-center'>
                            <select className="rounded-xl h-fit " aria-label="Default select example" defaultValue={o.status} onChange={(event) => handleChange(o._id, event)}>
                              {
                                options.map((op, index) => 
                                  
                                      <option key={index} value={op}>{op}</option>
                                      
                                  )
                                
                              }
                            </select>
                          </div>
                        </div>
    
                      </>) :
                      (<>
                         
                      </>)
                    }
                  </div>
                  
                )
              }
            </div>
          </div>
        </div>
      </section>
      </>) :
      (<>
        <section className='mt-16 w-[80%] mx-auto'>
            <div className='px-4 py-4 h-[80vh]'>
              <h1 className='text-2xl text-black font-bold text-center' >UNAUTHORIZED ACCESS DENIED</h1>
              
            </div>
          </section>
        </>)
    }
    </>
    
  )
}

export default AdminOrders
