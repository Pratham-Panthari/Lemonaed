import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from 'axios'
import slugify from 'slugify'
import { useAuth } from '../context/auth'
const ManageProducts = () => {

  const [auth, setAuth] = useAuth()

  const [products, setProducts] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [photo, setPhoto] = useState([])
  const [quanity, setQuanity] = useState('')
  const [fetchCategory, setFetchCategory] = useState()
  const [product, setProduct] = useState()
  const [updatedName, setUpdatedName] = useState('')
  const [updatedDescription, setUpdatedDescription] = useState('')
  const [updatedPrice, setUpdatedPrice] = useState('')
  const [updatedCategory, setUpdatedCategory] = useState('')
  const [updatedPhoto, setUpdatedPhoto] = useState('')
  const [updatedQuanity, setUpdatedQuanity] = useState('')
  const [pid, setPid] = useState('')
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showError, setShowError] = useState(false)

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const res = await axios.get('https://lemonaed-server.onrender.com/api/v1/product/get-all-products')
      if(res.data){
        setProducts(res.data.products)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const getSingleProduct = async (slug) => {
    try {
      setLoading(true)
      const res = await axios.get(`https://lemonaed-server.onrender.com/api/v1/product/get-product/${slug}`)
      if(res.data){
        setProduct(res.data.product)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const getCategory = async () => {
    try {
      setLoading(true)
      const slug = slugify(category).toLowerCase()
      const res = await axios.get(`https://lemonaed-server.onrender.com/api/v1/category/get-category/${slug}`)
      if(res.data){
        setFetchCategory(res.data.category)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const getUpdatedCategory = async () => {
    try {
      setLoading(true)
      const slug = slugify(updatedCategory).toLowerCase()
      const res = await axios.get(`https://lemonaed-server.onrender.com/api/v1/category/get-category/${slug}`)
      if(res.data){
        setFetchCategory(res.data.category)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handlePhoto = (event) => {
    const photoUrls = event.target.value.split(','); // Split input by comma
    setPhoto(photoUrls);
  };

  const handleUpdatedPhoto = (event) => {
    const photoUrls = event.target.value.split(','); // Split input by comma
    setUpdatedPhoto(photoUrls);
  }

  const handleCreate = async() => {
    
    try {
      setLoading(true)
      getCategory()
      const id = fetchCategory._id
      const res = await axios.post('https://lemonaed-server.onrender.com/api/v1/product/create-product', { name, description, price, category : id, photo, quanity })
      if(res?.data){
        getAllProducts()
        setOpenModal(false)
        setLoading(false)
      }
    } catch (error) {
      setShowError(true)
      setError(error.message)
      setLoading(false)
      
    }
  }

  const handleDelete = async (pid) => {
    try {
      setLoading(true)
      const res = await axios.delete(`https://lemonaed-server.onrender.com/api/v1/product//delete-product/${pid}`)
      if(res.data){
        getAllProducts()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleUpdate = async () => {
    try {
      setLoading(true)
      getUpdatedCategory()
      const id = fetchCategory?._id
      const res = await axios.put(`https://lemonaed-server.onrender.com/api/v1/product/update-product/${pid}`, { name: updatedName, description: updatedDescription, price: updatedPrice, category: id, photo: updatedPhoto, quanity: updatedQuanity  })
      if(res.data){
        setOpenUpdateModal(false)
        getAllProducts()
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  const handleOpenUpdateModal = (slug, id) => {
    getSingleProduct(slug)
    setOpenUpdateModal(true)
    setPid(id)
  } 

  useEffect(() => {
    getAllProducts()
  }, [])

  useEffect(() => {
    // Set initial values for input fields when the product state updates
    if (product) {
      setUpdatedName(product.name || '');
      setUpdatedDescription(product.description || '');
      setUpdatedPrice(product.price || '');
      setUpdatedCategory(product.category?.name || '');
      setUpdatedPhoto(product.photo.join(',') || '');
      setUpdatedQuanity(product.quanity || '');
    }
  }, [product]);

 
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
                <h1 className='text-5xl text-black font-bold text-center mb-6'>Manage Product</h1>
                <hr />
                <div className='flex w-full px-4 py-4 justify-end'>
                  <button className='bg-indigo-600 rounded-xl hover:bg-indigo-700 text-white text-xl font-bold px-3 py-2' onClick={() => setOpenModal(true)}>&#x2B; Create</button>
                </div>
                {
                  openModal && (
                    <div className='absolute w-[50%] mx-auto h-fit bg-white border-2 border-black'>
                      <div className='px-4 py-4 text-xl text-black font-semibold hover:underline cursor-pointer' onClick={() => { setOpenModal((prevState) => !prevState) }}>Close</div>
                      <hr/>
                      <h1 className='px-4 py-4 text-2xl text-black font-semibold'>Product Details:</h1>
                      <div className='px-4 py-2'>
                        <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                      </div>
                      <div className='px-4 py-2'>
                        <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                      </div>
                      <div className='px-4 py-2'>
                        <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Category Name' value={category} onChange={(e) => { setCategory(e.target.value) }} />
                      </div>
                      <div className='px-4 py-2'>
                        <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                      </div>
                      <div className='px-4 py-2'>
                        <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Photos Urls seperated by commas' onChange={handlePhoto} />
                      </div>
                      <div className='px-4 py-2'>
                        <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Quantity' value={quanity} onChange={(e) => { setQuanity(e.target.value) }} />
                      </div>
                      <div className='px-4 py-2'>
                        { showError && <h1 className='text-red-500 text-lg'>{error}</h1> }
                        <button className='text-white text-xl font-semibold px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl' onClick={handleCreate}>Create Product</button>
                      </div>
                    </div>
                  )
                }
                <div className='mt-6 px-4 py-4 mx-auto'>
                    <div className='flex mb-6 justify-center gap-6 '>
                      <div className='w-[10%]'>
                        <h1 className='text-lg text-black font-semibold text-center'>S.No</h1>
                      </div>
                      <div className='w-[50%]'>
                        <h1 className='text-xl text-black font-semibold text-center'>Product Name</h1>
                      </div>
                      <div className='w-[30%]'>
                        <h1 className='rounded-xl text-xl text-black font-semibold text-center'>Action</h1>
                      </div>
                    </div>  
                    <hr/>
                    {
                         openUpdateModal && (
                          <div className='absolute w-[50%] mx-auto h-fit bg-white border-2 border-black'>
                            <div className='px-4 py-4 text-xl text-black font-semibold hover:underline cursor-pointer' onClick={() => { setOpenUpdateModal((prevState) => !prevState) }}>Close</div>
                            <hr/>
                            <h1 className='px-4 py-4 text-2xl text-black font-semibold'>Product Details:</h1>
                            <div className='px-4 py-2'>
                              <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Name' value={updatedName} onChange={(e) => { setUpdatedName(e.target.value) }} />
                            </div>
                            <div className='px-4 py-2'>
                              <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Description' value={updatedDescription} onChange={(e) => { setUpdatedDescription(e.target.value) }} />
                            </div>
                            <div className='px-4 py-2'>
                              <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Category Name' value={updatedCategory} onChange={(e) => { setUpdatedCategory(e.target.value) }} />
                            </div>
                            <div className='px-4 py-2'>
                              <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Price' value={updatedPrice} onChange={(e) => { setUpdatedPrice(e.target.value) }} />
                            </div>
                            <div className='px-4 py-2'>
                              <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Photos Urls seperated by commas' value={updatedPhoto} onChange={handleUpdatedPhoto} />
                            </div>
                            <div className='px-4 py-2'>
                              <input className='px-3 py-2 text-lg text-black rounded-xl w-[70%]' type='text' placeholder='Enter Product Quantity' value={updatedQuanity} onChange={(e) => { setUpdatedQuanity(e.target.value) }} />
                            </div>
                      
                            <div className='px-4 py-2'>
                              <button className='text-white text-xl font-semibold px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl' onClick={handleUpdate}>Update</button>
                            </div>
                          </div>
                        )
                    }
                    {
                      products?.map((p, index) => 

                      <div key={index} className='mt-4 flex mb-6 justify-center gap-6 '>
                        <div className='w-[10%]'>
                          <h1 className='text-lg text-black font-semibold text-center'>{index + 1}</h1>
                        </div>
                        <div className='w-[50%]'>
                          <h1 className='text-xl text-black font-semibold text-center'>{p.name}</h1>
                        </div>
                        <div className='w-[30%] flex justify-center gap-4'>
                          <button className='px-3 py-2 rounded-xl text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-center' onClick={ () => {handleOpenUpdateModal(p.slug, p._id)}}>Update</button>
                          <button className='px-3 py-2 rounded-xl text-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-center' onClick={() => handleDelete(p._id)} >Delete</button> 
                        </div>
                      </div>  
                      )
                    }
                    
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

export default ManageProducts
