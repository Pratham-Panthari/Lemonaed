import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <>
      <footer className='w-[80%] mx-auto bg-white'>
        <div className='px-4 py-4'>
          <ul className='flex items-center justify-center gap-4'>
            <h1 className='text-xl text-black font-normal'>&#169; LEMONAED, 2023</h1>
            <Link to='/refund-policy'><li className='text-md text-black '>Refund Policy</li></Link>
            <Link to='/washcare'><li className='text-md text-black '>Wash Care</li></Link>
            <Link to='/terms-of-service'><li className='text-md text-black '>Terms Of Service</li></Link>
          </ul>
          <h1 className='text-lg text-black text-center'><i>Created and Designed By Pratham Panthari</i></h1>
        </div>
      </footer>
    </>
  )
}

export default Footer
