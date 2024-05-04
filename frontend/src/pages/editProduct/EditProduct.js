import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/products/productSlice'
import { updateAProduct } from '../../redux/features/products/productService'
import { Loader } from '../../components/Loader/Loader'
import ProductForm from '../../components/product/productForm/ProductForm'
import { useState } from 'react'

const EditProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector(selectIsLoading)
    const productEdit = useSelector(selectProduct)

    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    const [description, setDescription] = useState("")


    useEffect(() => {
        dispatch(getProductById(id))

    }, [id, dispatch])

    useEffect(() => {
        setProduct(productEdit)
        setImagePreview(
            productEdit && productEdit.image ? productEdit.image.filePath : "https://via.placeholder.com/150"
        )
        setDescription(
            productEdit && productEdit.description ? productEdit.description : ""
        )
    }, [productEdit])

    const saveProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product?.name);
        formData.append('category', product?.category);
        formData.append('quantity', product?.quantity);
        formData.append('price', product?.price);
        formData.append('description', product?.description);
        if (productImage) {
            formData.append('image', productImage);
        }

        // Iterate over FormData entries and log each key-value pair
        console.log(...formData)
        await dispatch(updateProduct({ id, formData }))

        navigate('/dashboard')

    };


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }
    const handleImageChange = (e) => {
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))
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

export default EditProduct