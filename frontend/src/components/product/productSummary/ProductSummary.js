import React, { useEffect } from 'react'
import "./ProductSummary.scss"
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4, BsCartX } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import InfoBox from '../../infoBox/InfoBox'
import { useDispatch, useSelector } from 'react-redux'
import { CALC_OUT_OF_STOCK, CALC_STORE_VALUE, selectOutOfStock, selectTotalStoreValue, CALC_CATEGORY, selectCategory } from '../../../redux/features/products/productSlice'

//Icons
const earningIcon = <AiFillDollarCircle size={40} color='#fff' />
const categoryIcon = <BiCategory size={40} color='#fff' />
const productIcon = <BsCart4 size={40} color='#fff' />

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch()
  const totalStoreValue = useSelector(selectTotalStoreValue)
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
  }, [dispatch, products])

  const outOfStock = useSelector(selectOutOfStock)
  useEffect(() => {
    dispatch(CALC_OUT_OF_STOCK(products))
  }, [dispatch, products])

  const allCategories = useSelector(selectCategory)
  useEffect(() => {
    dispatch(CALC_CATEGORY(products))
  }, [dispatch, products])

  return (
    <div className='product-summary'>
      <h3 className='--mt'>
        Inventory Stats
      </h3>
      <div className='info-summary'>
        <InfoBox icon={productIcon} title={"Total Product"} count={products.length} bgColor={"card1"} />
        <InfoBox icon={earningIcon} title={"Total Revenue"} count={totalStoreValue} bgColor={"card2"} />
        <InfoBox icon={productIcon} title={"Out of Stock"} count={outOfStock} bgColor={"card3"} />
        <InfoBox icon={productIcon} title={"All Categories"} count={allCategories.length} bgColor={"card4"} />
      </div>
    </div>
  )
}

export default ProductSummary