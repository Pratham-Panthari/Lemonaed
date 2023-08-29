import React from 'react'

const NewsLetter = () => {
  return (
    <>
        <section className='bg-black w-full'>
            <div className='lg:w-[70%] mx-auto'>
                <div className='px-8 py-32'>
                    <h1 className='text-3xl text-white font-bold text-center mb-3'>Subscribe to Our  Newsletter to get <br/> latest updates On Fashion </h1>
                    <div className='flex justify-center items-center'>
                        <input type='email' className='w-[50%] border-none rounded-xl inline mx-2 px-2 py-3' placeholder='Enter Your Email' />
                        <button className='mt-1 bg-white px-3 py-2 border-2 rounded-full border-white text-black text-xl font-bold hover:text-white hover:bg-black'>Subscribe</button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default NewsLetter
