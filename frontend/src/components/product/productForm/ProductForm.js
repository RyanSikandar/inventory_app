import React from 'react'
import "./ProductForm.scss"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Card from '../../Card/Card';
const ProductForm = ({ product, productImage, imagePreview, description, setDescription, handleInputChange, handleImageChange, saveProduct }) => {
    return (
        <div className='add-product'>
            <Card className={"card"}>
                <form onSubmit={saveProduct}>
                    <Card cardClass={"group"}>
                        <label>Product Image</label>
                        <code className='--color-dark'>
                            Supported Formats: jpg, jpeg, png
                        </code>
                        <input type="file" name="image" onChange={(e) => handleImageChange(e)}>
                        </input>
                        {imagePreview != null ? (<div className='image-preview'>
                            <img src={imagePreview}
                                alt='product'
                            />
                        </div>) : (<p>No Image set for this product</p>)}


                    </Card>
                    <label>
                        Product Name:
                    </label>
                    <input type='text' placeholder='Product Name' name='name' value={product?.name} onChange={handleInputChange}></input>


                    <label>
                        Category Name:
                    </label>
                    <input type='text' placeholder='Product category' name='category' value={product?.category} onChange={handleInputChange}></input>


                    <label>
                        Product Price:
                    </label>
                    <input type='text' placeholder='Product Price' name='price' value={product?.price} onChange={handleInputChange}></input>

                    <label>
                        Product Quantity:
                    </label>
                    <input type='text' placeholder='Product Quantity' name='quantity' value={product?.quantity} onChange={handleInputChange}></input>

                    <label>Product Description</label>
                    <ReactQuill value={description} onChange={setDescription} theme='snow' />

                    <div className='--my'>
                        <button type='submit' className='--btn --btn-primary'>
                            Save Product
                        </button>   

                    </div>
                </form>


            </Card>

        </div>
    )
}

export default ProductForm