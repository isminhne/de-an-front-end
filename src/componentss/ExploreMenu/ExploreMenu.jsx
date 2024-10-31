import {useEffect, useState} from 'react'
import './ExploreMenu.css'
import ProductService from "../../services/product.service.js";

const ExploreMenu = ({category,setCategory}) => {
  const [list, setList] = useState([]);

  const fetchListCategories = async () => {
    const res = await ProductService.getCategories({});
    setList(res.docs);
  }

  useEffect(() => {
    fetchListCategories();
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>      
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes.</p>
      <div className="explore-menu-list">
        {list?.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev?._id===item?._id?null:item)} className='explore-menu_list-item' key={index}>
              <img className={category?._id===item?._id?"active":""} src={item?.thumbnail} alt="" />
              <p>{item?.title}</p>
              {/*<p>{item.description}</p>*/}
              {/* <div className='explore-menu-item-price'>
                <p>{menu.price}</p>
                <button>Add to cart</button>
              </div> */}
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
