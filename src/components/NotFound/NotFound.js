import React from 'react'
import image from '../../images/Gameover.jpg'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className='notFound'>
        <img src={image} alt='Game Over' />
        <h1>~Error 404: Not Found~</h1>
    </div>
  )
}
