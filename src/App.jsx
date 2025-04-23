
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, deleteProduct } from './app/feature/productSlice';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function App() {
  const [addInput, setAddInput] = useState([{id : 1, value: ""}])
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const productList = useSelector((state) => state.product.productList);

  
  const onSubmit = (data) => {
    const product = {
      ...data,
      price : addInput.map(input => input.value)
    }
    dispatch(addProduct(product));
    reset();
  };

  const handleDelete = ((i) => {
    dispatch(deleteProduct(i))
  })

  const addNewInput = () => {
    setAddInput([...addInput, {id : addInput.length + 1, value : ""}])
  }

  const deleteInput = (id) => {
    let afterDelete = addInput.filter((i) => i.id !== id);
    setAddInput(afterDelete)
  }

  const handleInputChange = (id,value) => {
    setAddInput(addInput.map(input => (input.id === id ? { ...input, value } : input)));
  }

  return (
    <>
      <div>
        <h1 className='text-3xl font-semibold mb-2'>Product Form</h1>
        <div className='max-w-[350px] bg-gray-200 rounded-lg mx-auto p-3 mb-10'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=' text-start'>
              <label className='text-lg font-medium'>Product Name</label>
                <input className='w-[100%] bg-white p-1 mb-2 rounded-md '
                  {...register("name", { required: true })}
                  placeholder="Enter product name"
                /> 

              <label className='text-lg font-medium'>Price</label> 
              {addInput.map((input, key) => (
                <div className='flex mb-2 gap-3' key={key}>
                  <input className='w-[100%] bg-white p-1 rounded-md '
                  onChange={(e) => handleInputChange(input.id,e.target.value)}
                  placeholder="Enter price"
                  type="number"
                    />
                  {input.id === 1 ? (<button className='bg-blue-500 px-2 text-white rounded-md text-2xl' onClick={() => addNewInput()}>+</button>) : ( <button className='bg-blue-500 px-2 text-white rounded-md text-2xl' onClick={() => deleteInput(input.id)}>-</button>)}
                </div>
              ))}
              
                
                <label className='text-lg font-medium'>Description</label>
                <input className='w-[100%] bg-white p-1 mb-6 rounded-md'
                  {...register("description", { required: true })}
                  placeholder="Enter description"
                />

                <button type="submit" className='cursor-pointer bg-blue-500 w-[100%] rounded-lg py-2 px-7 mx-auto font-semibold text-white'>Submit</button>
            </div>
          </form>
        </div>

        {/* LIST WORK */}
        <h2 className='text-3xl font-semibold mb-4'> Product List</h2>
        <div>
          <table className='w-[80%] mx-auto border-2  '>
            <thead>
            <tr>
              <th className='border-1 text-md p-1'>Num</th>
              <th className='border-1 text-md p-1'>Product name</th>
              <th className='border-1 text-md p-1'>Product Price</th>
              <th className='border-1 text-md p-1'>Description</th>
              <th className='border-1 '></th>
          </tr>
            </thead>
            <tbody>
        {productList?.map((product, index) => (
            <tr key={index}>
              <td className='border-1  font-medium p-1 '>{index + 1}</td>
              <td className='border-1  font-medium p-1 '>{product.name }</td>
              <td className='border-1  font-medium p-1 '>{`${product.price},`}</td>
              <td className='border-1  font-medium p-1 '>{product.description}</td>
              <td className='border-1  font-medium p-1 '>
                <button onClick={() => handleDelete(index)} className='bg-red-600 text-white py-1 text-sm  px-4 rounded-md cursor-pointer'>
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

export default App;
