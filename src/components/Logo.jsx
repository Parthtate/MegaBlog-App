import React from 'react'
import logoImg from '../assets/logoImg.webp'
function Logo({width = "100px"}) {
  return (
    <div>
       <img 
         src={logoImg} 
         alt="Logo" 
         style={{ 
           width, 
           borderRadius: '10%' 
         }} 
       />
    </div>
  )
}

export default Logo