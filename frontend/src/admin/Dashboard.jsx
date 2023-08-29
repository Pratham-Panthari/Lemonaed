import React from 'react'

import AdminMenu from './AdminMenu'
import { useAuth } from '../context/auth'

const Dashboard = () => {
    const [auth, setAuth] = useAuth()
  return (
    <>
        {
            auth?.token && auth?.role === 1 ?
            (<>
            <section className='w-full h-full'>
                <div className='lg:flex w-full h-full'>
                    <AdminMenu />
                    <div className='w-[70%]'>
                        <div className='px-4 py-4'>
                            <h1 className='text-5xl text-black font-bold text-center mb-6'>Admin Details</h1>
                            <hr style={{color:'black', height:'3px'}}/>
                            <div className='mt-4 flex justify-around gap-4'>
                                <div className='px-4 py-2'>
                                    <h1 className='text-xl text-black font-semibold'>Name: {auth?.name} </h1>
                                    <h1 className='text-xl text-black font-semibold'>Email: {auth?.email} </h1>
                                    <h1 className='text-xl text-black font-semibold'>Phone No: {auth?.phno} </h1>
                                </div>
                                <div className='px-4 py-4'>
                                    <h1 className='text-xl text-black font-semibold'>Address: {auth?.address} </h1>
                                    <h1 className='text-xl text-black font-semibold'>Role: {auth?.role} </h1>
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
                  <h1 className='text-2xl text-black font-bold text-center' >UNAUTHORIZED ACCESS DENIED</h1>
                  
                </div>
              </section>
            </>)
        }
        
    </>
  )
}

export default Dashboard
