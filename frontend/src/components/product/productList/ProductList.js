import React, { useState } from 'react'
import "./ProductList.scss"
import { Loader, SpinnerImg } from '../../Loader/Loader'
import { AiOutlineEye } from 'react-icons/ai'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Search from '../../search/Search'
const ProductList = ({ products, isLoading }) => {
    const [search, setSearch] = useState('')
    return (
        <div className='product-list'>
            <hr />
            <div className='table'>
                <div className='--flex-between --flex-dir-column'>
                    <span>
                        <h3>Inventory Items</h3>
                    </span>
                    <span>
                        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                    </span>

                </div>


                {isLoading&&<SpinnerImg/>}
                <div className='table'>
                    {!isLoading&&products.length===0?(<h3>No products available</h3>):(
                        <table>
                            <thead>
                                <tr>
                                    <th>S/H</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Value</th>
                                   
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product,index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price}</td>
                                        <td>{product.price*product.quantity}</td>

                                
                                        <td className='icons'>
                                            <span>
                                                <AiOutlineEye size={25} color={"purple"}/>
                                            </span>
                                            <span>
                                                <FaEdit size={25} color={"green"}/>
                                            </span>
                                            <span>
                                                <FaTrashAlt size={25} color={"red"}/>
                                            </span>



                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    
                    )}

                </div>
            </div>

        </div>
    )
}

export default ProductList