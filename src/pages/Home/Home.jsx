import React from 'react'
import './Home.css'
import Header from '../../componentss/Header/Header'
import ExploreMenu from '../../componentss/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../componentss/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category, setCategory] = React.useState(null);

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}

export default Home
