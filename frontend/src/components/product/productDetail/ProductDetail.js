import React from 'react'
import "./ProductDetail.scss"
import useRedirect from '../../../customHook/useRedirect'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice'
import { useEffect } from 'react'
import { getAllProducts, getProductById } from '../../../redux/features/products/productSlice'
import Card from '../../Card/Card'
import { SpinnerImg } from '../../Loader/Loader'

const ProductDetail = () => {
    useRedirect("/login")
    const dispatch = useDispatch()

    const { id } = useParams()

    const isLoggedIn = useSelector(selectIsLoggedIn)

    const { product, isLoading, isError, message } = useSelector((state) => state.product);

    const stockStatus = (quantity) => {
        if (quantity > 0) {
            return <span className='--color-success'>In Stock</span>
        }
        return <span className='--color-danger'>Out of Stock</span>

    }

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getProductById(id))
        }
        if (isError) {
            console.log(message)
        }
    }, [isLoggedIn, isError, message, dispatch])

    return (
        <div className='product-detail'>
            <h3 className='--mt'>Product Detail</h3>
            <Card cardClass={"card"}>
                {isLoading && <SpinnerImg />}
                {
                    product && (
                        <div className='detail'>
                            <Card cardClass={"group"}>
                                {product?.image ? (<img src={product?.image.filePath} alt={product.image.fileName} />) : (<img src="https://via.placeholder.com/150" alt={product?.name} />)}

                            </Card>
                            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
                            <hr />
                            <h4>
                                <span className='badge'>Product Name:</span> {product.name}
                            </h4>
                            <p>
                                <b> Category: </b>{product.category}
                            </p>
                            <p>
                                <b> Description: </b>{product.description}
                            </p>
                            <p>
                                <b> Price: </b>{product.price}
                            </p>
                            <p>
                                <b> Quantity: </b>{product.quantity}
                            </p>
                            <p>
                                <b> Total Value: </b>{product.price * product.quantity}
                            </p>
                        </div>
                    )
                }

            </Card>

        </div>

    )
}

export default ProductDetail