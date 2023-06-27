import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';


function Header(props) {
  
  return (
    <>
    <header className='d-flex justify-between align-center p-40'>
        <div className='d-flex align-center'>
          <img width={80} height={80} src="/img/logo_zero.png"/>
          <div>
            <h3 className='text-uppercase'>React Sneakers</h3>
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className='d-flex'>
          <li className='mr-30 d-flex align-center cu-p'>
            <FavoriteIcon className='mr-20'/>
            <ShoppingCartIcon className='mr-20' onClick={props.onClickCart} />
            <span>1200 руб.</span>
          </li>
          <li>
          <AccountCircleIcon/>
          </li>
        </ul>
      </header>
    </>
  )
}

export default Header