import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Search = () => {

  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async() => {
    try {
      setLoading(true)
      const res = await axios.get(`https://lemonaed-server.onrender.com/api/v1/product/search/${keyword}`)
    
      if(res.data){
        setResults(res.data.result)
        setLoading(false)
      }
     
    } catch (error) {
      setLoading(false)
    }
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
        <Layout>
            <section className='mt-16 w-[80%] mx-auto min-h-[80vh]'>
              <div className=' w-full flex gap-4 justify-center'>
                <input className='text-xl text-black font-normal px-2 py-3 w-[30%] rounded-xl' type='text' placeholder='Search Items' value={keyword} onChange={(e) => { setKeyword(e.target.value) }} />
                <button className='px-3 py-3 bg-black rounded-xl' onClick={handleSearch}>
                  <svg xmlns="ht<tp://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                  </svg>
                </button>
              </div>
              {
                results.length === 0 ? 
                (<>
                  <div className='mt-16 w-full'>
                    <h1 className='text-xl text-stone-500 font-semibold text-center'><i>No Products Found</i></h1>
                  </div>
                </>) :
                (<>
                  <div className='mt-16 w-full'>
                    <h1 className='text-2xl text-black font-semibold'>Search Results</h1>
                    <div className='mt-6 px-4 py-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 cursor-pointer' >
                      {
                          results.map( p => 
                              <Link key={p._id}  to={`/products/${p.slug}`}>
                                  <div className='cursor-pointer h-[600px]'>
                                      <div className='h-[500px] '>
                                          <img className='w-full h-full object-cover' src={p.photo[0]} alt='Product Photo' />
                                      </div>
                                      <div className='h-[100px] '>
                                          <h1 className='mt-4 text-xl text-stone-800 font-semibold text-center'>{p.name}</h1>
                                          <h1 className='mt-2 text-lg text-stone-800 font-semibold text-center'>Rs. {p.price}</h1>
                                      </div>
                                  </div>
                              </Link>
                          )
                      }
                    </div>
                  </div>  
                </>)
              }
            </section>
        </Layout>
    </>
  )
}

export default Search
