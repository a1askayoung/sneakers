import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from "./Card.module.css";
import { useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// console.log(styles);   //! Уникальные названия классов для каждой карточки

function Card({img, name, price, onFavorite, onPlus}) {
    // console.log(props);
    
    const [isAdded, setIsAdded]=useState(false)
    const [isLiked, setIsLiked]=useState(false)

    const onClickPlus=()=>{
      onPlus({name, img, price})
      setIsAdded(!isAdded)
    }

    const onClickLike=()=>{
      onFavorite({name, img, price})
      setIsLiked(!isLiked)
    }

  return (
    <>
      <div className={styles.card}>     {/* Присваиваем уникальное название класса */}
          <div className={styles.favorite}>
            {isLiked ? <FavoriteIcon onClick={()=>onClickLike()} style={{fill: "#f73378"}}/> : <FavoriteBorderIcon onClick={()=>{onClickLike()}} style={{fill: "#f73378"}}/>}
          </div>
          <img width={133} height={162} src={img} alt=''/>
          <h5>{name}</h5>
          <div className={styles.price}>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {isAdded ? (<CheckBoxIcon onClick={()=>{onClickPlus()}} className={styles.checked} style={{fill: "#9dd558"}}/>): (<AddBoxIcon onClick={()=>{onClickPlus()}} className={styles.plus}/>)}
              {/* При нажатии получаем функции, находящиеся в пропсах */ }
          </div>
      </div>
    </>
  )
}

export default Card