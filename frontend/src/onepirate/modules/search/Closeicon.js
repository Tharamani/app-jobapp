import React from 'react';

const Closeicon = (props) => {
  return (
  	<div style={{float:"right"}}>
  	<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" cursor="pointer" width="25px" height="25px">
    <path fill="black" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/>
    <path fill="black" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)" cursor="pointer"/>
    </svg>
  	</div>
  )
}

export default Closeicon;
   