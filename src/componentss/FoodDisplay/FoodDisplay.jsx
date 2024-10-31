import React, {useContext, useEffect, useState} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import ProductService from "../../services/product.service.js";

const FoodDisplay = ({category}) => {
    const [foodList, setFoodList] = useState([]);

    const fetchList = async (category) => {
        if (category) {
          const res = await ProductService.getProductByCategory(category?.slug);
          setFoodList(res.docs);
        } else {
          const res = await ProductService.getAllProducts({});
          setFoodList(res.docs);
        }
    }

    useEffect(() => {
        fetchList(category);
    }, [category]);

    return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>   
        <div className="food-display-list">
            {foodList?.map((item, index)=>{
              return <FoodItem key={index} id={item._id} name={item.title} description={item.description} price={item.price} image={item.images[0]}/>
            })}
        </div>   
    </div>
  )
}

export default FoodDisplay
