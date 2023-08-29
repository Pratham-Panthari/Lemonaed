import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/cart'

const ProductDetails = () => {

  const [cart, setCart] = useCart()

  const params = useParams()

  const [error, setError] = useState(false)
  const [product, setProduct] = useState(null)
  const [activeImg, setActiveImg] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [similarProducts, setSimilarProducts] = useState(null)
  const [cartItems, setCartItems] = useState(null)
  const [loading, setLoading] = useState(false)

  const size = ["XS", "S", "M", "L", "XL"]
  
  const getProduct = async () => {
    try {
      setLoading(true)
      const slug = params.slug
      const res = await axios.get(`https://lemonaed-server.onrender.com/api/v1/product/get-product/${slug}`)
      
      if (res.data) {
        setProduct(res.data.product)
        setActiveImg(res.data.product.photo[0]) // Set the active image initially
        getSimilarProducts(res.data.product._id, res.data.product.category._id)
        setLoading(false)
      }
      
    } catch (error) {
      setLoading(false)
    }
  }

  const getSimilarProducts = async (pid, cid) => {
    try {
      setLoading(true)
      const res = await axios.get(`https://lemonaed-server.onrender.com/api/v1/product/similar-products/${pid}/${cid}`)
      if(res?.data){
        setSimilarProducts(res.data.products)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleCart = () => {
    if(selectedSize === '') {
      return setError(true)
      
    }
    else{
      setLoading(true)
      const newItem = {
        product: product,
        size: selectedSize,
        quantity: quantity
      };
      setCart([...cart, newItem]);
      localStorage.setItem('cart', JSON.stringify([...cart, newItem]));
      window.scrollTo(0, 0)
      setLoading(false)
    }
  }
 
  useEffect(() => {
    getProduct()
    window.scrollTo(0, 0)
  }, [params.slug]) // Fetch product when slug changes
  
  return (
    <Layout>
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
        <section className='mt-24 w-[80%] mx-auto'>
          <div className='flex lg:flex-row flex-col gap-4'>
            <div className='lg:w-[10%] flex flex-row lg:flex-col'>
              {product &&
                product.photo.map(p => (
                  <img
                    key={p}
                    className='w-full h-[120px] object-contain mb-4 cursor-pointer self-center hover:border-2 hover:border-black border-0 '
                    src={p}
                    alt='product Photo'
                    onClick={() => {
                      setActiveImg(p)
                    }}
                  />
                ))}
            </div>
            <div className='lg:w-[70%] w-full lg:h-[90vh] h-[90vh]'>
              {activeImg && (
                <img
                  className='w-full h-full object-cover'
                  src={activeImg}
                  alt='Active - Image'
                />
              )}
            </div>
            <div className='border-2 border-black lg:w-fit w-fit self-center h-fit'>
            {product && (
                <div className='px-8 py-6'>
                  <h1 className='text-2xl text-black font-bold'>{product.name}</h1>
                  <h1 className='mt-2 text-md text-black font-normal'>{product.description}</h1>
                  <h1 className='mt-2 text-lg text-black font-bold'>Highlights:</h1>
                  <ul className='mt-2'>
                    <li className='text-lg text-stone-600 font-normal'>OverSized T-Shirt</li>
                    <li className='text-lg text-stone-600 font-normal'>100% French Terry Cotton</li>
                    <li className='text-lg text-stone-600 font-normal'>240 GSM</li>
                  </ul>
                  <h1 className='mt-2 text-xl text-black font-bold'>Rs. {product.price}</h1>
                  {error && <h1 className='mt-2 text-md text-red-500 font-bold'>Please Select Size to continue</h1> }
                  <h1 className='mt-2 text-lg text-black font-semibold'>Select Size:</h1>
                  <div className='mt-4 flex lg:gap-4 gap-2'>
                    
                    {
                      size.map((s, index) => 
                        <button key={index} className={`lg:px-4 py-4 px-3 py-1 lg:text-md text-sm ${selectedSize === s ? 'bg-black text-white font-semibold' : 'bg-white border-2 border-black text-black font-semibold hover:bg-black hover:text-white' }`} onClick={() => {setSelectedSize(s); setError(false)}}>{s}</button>
                      )
                    }
                  </div>
                  <h1 className='mt-2 text-lg text-black font-semibold'>Quantity:</h1>
                  <div className='mt-2 flex gap-3 '>
                    <button className='text-lg text-black border-2 border-black px-5 py-3 hover:bg-black hover:text-white disabled:bg-gray-300' onClick={() => {setQuantity((prevCount) => prevCount - 1)}} disabled={quantity === 1}>-</button>
                    <h1 className='px-5 py-3 self-center text-black text-lg font-normal bg-gray-100'>{quantity}</h1>
                    <button className='text-lg text-black border-2 border-black px-5 py-3 hover:bg-black hover:text-white disabled:bg-gray-300' onClick={() => {setQuantity((prevCount) => prevCount + 1)}} disabled={quantity === 10}>+</button>
                  </div>
                  <div className='mt-6'>
                    <button className='px-4 py-4 text-white font-semibold bg-black hover:bg-white hover:text-black hover:border-2 hover:border-black' onClick={handleCart}>Add To Cart</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className='mt-24 w-[80%] mx-auto'>
          <div className='w-full'>
            <h1 className='text-black text-3xl font-semibold'>Silimar Products</h1>
          </div>
          <div className='mt-6 px-4 py-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 cursor-pointer ' >
                      {
                          similarProducts?.map( p => 
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
        </section>
        </>)
      }
      
    </Layout>
  )
}

export default ProductDetails