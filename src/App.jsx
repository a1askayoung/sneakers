import React from 'react';
import './index.css';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './components/pages/Home';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Card from './components/Card';


const arr=[
  {name: "Мужские кроссовки Nike Blazer Mid 77", price: 12999, img:"/img/blazer1.jpg", id:1},
  {name: "Мужские кроссовки Nike Blazer Mid 77", price: 10600, img:"/img/blazer2.jpg", id:2},
  {name: "Мужские кроссовки Nike Blazer Mid 77 JEEMBO", price: 9800, img: "/img/blazer3.jpg", id: 3},
  {name: "Мужские кроссовки Nike Blazer Mid 77", price: 11799,img: "/img/blazer4.jpg", id: 4 }
]

function App() {
  const [items, setItems]=useState([])
  const [cartItems, setCartItems]=useState([])
  const [favorites, setFavorites]=useState([]);
  const [cartOpened, setCartOpened]=useState(false)
  const [searchValue, setSearchValue]=useState('')

  useEffect(()=>{
    axios.get("https://64958bb0b08e17c9179246d1.mockapi.io/items").then((res)=>{   //! GET sneakers
      setItems(res.data)},
    axios.get("https://64958bb0b08e17c9179246d1.mockapi.io/cart").then((res)=>{     //! GET cart
      setCartItems(res.data)
    }),
    (axios.get("http://localhost:8000/liked").then((res)=>{
      setFavorites(res.data);
    }))
  )
  },[])

  const onAddToCart=(obj)=>{
    axios.post("https://64958bb0b08e17c9179246d1.mockapi.io/cart", obj) //! POST cart
      setCartItems((prev)=>[...prev, obj]);
  }

  const onAddToFavorites=(obj)=>{
    axios.post("http://localhost:8000/liked", obj)    //! POST favorites
      setFavorites((prev)=>[...prev, obj])
  }

  const onRemoveItem=(id)=>{
    axios.delete(`https://64958bb0b08e17c9179246d1.mockapi.io/cart/${id}`);  //! DELETE cart
    setCartItems((prev)=>prev.filter((item)=>item.id!==id))
  }

  const onChangeSearchInput=(event)=>{
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={()=>setCartOpened(false)} onRemove={onRemoveItem}/> }
      <Header onClickCart={()=>setCartOpened(true)} />
      

      <div className='content p-40'>
        <div className='d-flex mb-40 justify-between align-center'>
          <h1>{searchValue ? (`Поиск по запросу: "${searchValue}"`) : ("Все кроссовки")}</h1>
          <div className='search-block d-flex align-center'>
            <SearchIcon/>
            <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder='Поиск...' />  { /* value={searchValue} */ }
            {searchValue && <CancelIcon className='clear cu-p' onClick={()=> setSearchValue('')}/>}
          </div>
        </div>

        <div className='sneakers d-flex'>
          {
            items
            .filter((item)=>item.name.toLowerCase().includes(searchValue)) //! ПОИСК
            .map((item, index)=> 
              <Card key={index} 
              name={item.name} 
              price={item.price} 
              img={item.img} 
              onFavorite={(obj)=>onAddToFavorites(obj)} //! Передаем функции как пропсы
              onPlus={(obj)=>onAddToCart(obj)}
              onRemove={onRemoveItem}
              />   
            )
          }
        </div>

      </div>
    </div>
  );
}

export default App;
