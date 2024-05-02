import React, { useEffect } from 'react'
import useRedirect from '../../customHook/useRedirect'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN, selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getAllProducts } from '../../redux/features/products/productSlice'
import ProductList from '../../components/product/productList/ProductList'

const Dashboard = () => {
    useRedirect('/login')
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const { products, isLoading, isError, message } = useSelector((state) => state.product)

    useEffect(() => {
        if (isLoggedIn === true) {
            dispatch(getAllProducts())
        }
        if (isError) {
            console.log(message)
        }
    }, [isLoggedIn, isError, message, dispatch])
    return (
        <div id='loader'>
            <h2>Dashboard</h2>
            <ProductList products = {products} isLoading={isLoading}/>
        </div>
    )
}

export default Dashboard