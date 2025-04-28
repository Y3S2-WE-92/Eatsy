import React from 'react'

function TopOrders() {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Top Orders This Week</li>
  
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/></div>
    <div className="list-col-grow">
      <div>Double Beef Burger</div>
      <div className="text-xs uppercase font-semibold opacity-60">Burgers</div>
    </div>
    
  </li>
  
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp"/></div>
    <div className="list-col-grow">
      <div>Chicken Tandoori Pizza</div>
      <div className="text-xs uppercase font-semibold opacity-60">Pizza</div>
    </div>
    
  </li>
  
  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
    <div className="list-col-grow">
      <div>Classic Cheeseburger</div>
      <div className="text-xs uppercase font-semibold opacity-60">Burgers</div>
    </div>
    
  </li>

  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">04</div>
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
    <div className="list-col-grow">
      <div>Margherita Pizza</div>
      <div className="text-xs uppercase font-semibold opacity-60">Pizza</div>
    </div>
    
  </li>

  <li className="list-row">
    <div className="text-4xl font-thin opacity-30 tabular-nums">05</div>
    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp"/></div>
    <div className="list-col-grow">
      <div>BBQ Bacon Burger</div>
      <div className="text-xs uppercase font-semibold opacity-60">Burgers</div>
    </div>
    
  </li>
  
</ul>
  )
}

export default TopOrders;