import React from 'react'
import './Cardcss.css';

function Card({card,handlechoice,flipped,disabled}) {

    const handleclick=()=>{
      if(!disabled)
        handlechoice(card)
    }
  return (
    <div className="card">
    <div className={flipped ? 'flipped' : ''}>
      <img src={card.src}  alt="front card" className="front" />
      <img src='/img/cover.png' onClick={handleclick} alt="back card" className="back" />

    </div>

    </div>
  )
}

export default Card