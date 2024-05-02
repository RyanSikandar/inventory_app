import React, { useEffect, useState } from 'react'
import { createNewProduct, selectIsLoading } from '../../redux/features/products/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../components/Loader/Loader'
import ProductForm from '../../components/product/productForm/ProductForm'

const initialState = {
    name: "",
    category: "",
    quantity: '',
    price: ""
}
const AddProduct = () => {
    const dispatch = useDispatch()
    const [product, setProduct] = useState(initialState)
    const [productImage, setProductImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")
    const isLoading = useSelector(selectIsLoading)
    const navigate = useNavigate()

    const { name, category, quantity, price } = product


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }
    const handleImageChange = (e) => {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    };
    const generateSKU = (category) => {
        const sku = category.slice(0, 3).toUpperCase() + "-" + Date.now()
        return sku
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('quantity', quantity);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', productImage);
        formData.append('sku', generateSKU(category))

        // Iterate over FormData entries and log each key-value pair
        console.log(...formData)
        await dispatch(createNewProduct(formData))
        navigate('/dashboard')

    };

   

    return (
        <div id='loader'>
            {isLoading && <Loader />}
            <h3 className='--mt'>
                Add New Product
            </h3>
            <ProductForm product={product}
                productImage={productImage}
                imagePreview={imagePreview}
                description={description}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
                setDescription={setDescription}
            />

        </div>
    )
}
export default AddProduct