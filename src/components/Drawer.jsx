import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Drawer({onClose, items=[], onRemove}) {    // дефолтное значение items, если ничего не прилетело
  return (
    <>
      <div className='overlay' >
        <div className='drawer d-flex flex-column'>
        
          <h2 className='mb-20 d-flex justify-between'>{items.length>0 ? "Корзина" : "Корзина пуста..."}<CancelIcon className='removeBtn cu-p' onClick={onClose}/></h2>
          <div className="items">
            {items.map((obj)=>(
              <div className="cartItem d-flex align-center mb-20" key={obj.id}>
                <img className='mr-20' width={99} height={121} src={obj.img} alt="" />
                <div className='mr-20'>
                  <p className='mb-5'>{obj.name}</p>
                  <b>{obj.price} руб.</b>
                </div>
                <CancelIcon className='removeBtn' onClick={()=>onRemove(obj.id)}/>
              </div>
            ))}
          </div>

          <div className="cartTotalBlock">
            <ul>
              <li className='d-flex'>
                <span>Итого:</span>
                <div></div>
                <b>23 399 руб.</b>
              </li>
              <li className='d-flex'>
                <span>Налог 5%:</span>
                <div></div>
                <b>1098 руб.</b>
              </li>
            </ul>
            <button className='greenButton'>Оформить заказ<ArrowForwardIcon className='arrow' /></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Drawer