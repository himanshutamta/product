
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct } from './app/feature/productSlice';
import { useForm } from 'react-hook-form';

function App() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const productList = useSelector((state) => state.product.productList);
  console.log(productList, "hi");

  const onSubmit = (data) => {
    const addNewTask = {
      ...data,
      id : Date.now()
    }
    dispatch(addProduct(addNewTask));
    reset();
  };


  const handleDelete = ((i) => {
    console.log(i)
    dispatch(deleteProduct(i))
  })

  return (
    <>
      <div>
        <h1 className='text-3xl font-semibold mb-2'>Product Form</h1>
        <div className='max-w-[400px] bg-gray-300 rounded-lg mx-auto p-3 mb-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=' text-start'>
                <label className='text-lg font-medium'>Product Name</label>
                <input className='w-[100%] bg-white p-2 mb-3 rounded-md text-lg'
                  {...register("name", { required: true })}
                  placeholder="Enter product name"
                />

                <label className='text-lg font-medium'>Price</label>
                <input className='w-[100%] bg-white p-2 mb-3 rounded-md text-lg'
                  {...register("price", { required: true })}
                  placeholder="Enter price"
                  type="number"
                />

                <label className='text-lg font-medium'>Description</label>
                <input className='w-[100%] bg-white p-2 mb-6 rounded-md text-lg'
                  {...register("description", { required: true })}
                  placeholder="Enter description"
                />

                <button type="submit" className='cursor-pointer bg-blue-500 w-[100%] rounded-lg py-3 px-7 mx-auto font-semibold text-white'>Submit</button>
            </div>
          </form>
        </div>

        {productList.lenght > 0 && <div>dsd</div>}
        <h2 className='text-3xl font-semibold mb-4'> Product List</h2>
        <div>
          <table className='w-[80%] mx-auto border-2  '>
            <thead>
            <tr>
              <th className='border-2 text-xl p-2'>Num</th>
              <th className='border-2 text-xl p-2'>Product name</th>
              <th className='border-2 text-xl p-2'>Product Price</th>
              <th className='border-2 text-xl p-2'>Description</th>
              <th className='border-2 '></th>
          </tr>
            </thead>
            <tbody>
        {productList?.map((product, index) => (
            <tr key={index}>
              <td className='border-1 text-2xl font-medium p-1 '>{index + 1}</td>
              <td className='border-1 text-md font-medium p-2 '>{product.name }</td>
              <td className='border-1 text-md font-medium p-2 '>{product.price}</td>
              <td className='border-1 text-md font-medium p-2 '>{product.description}</td>
              <td className='border-1 text-md font-medium p-2 '>
                <button onClick={() => handleDelete(product.id)} className='bg-red-600 text-white py-2  px-4 rounded-md cursor-pointer'>
                  Remove
                </button>
              </td>
          </tr>
        ))}
              </tbody>
          </table>
          </div>
      </div>
    </>
  )
}

export default App
