import React from 'react'

function RecentOrders() {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Recent Orders</li>
  
  <li className="list-row">
    <div>
      <div>Classic Cheeseburger (Small) x 1 </div>
      <div className="text-xs uppercase font-semibold opacity-60">REFMA0637C</div>
    </div>
    <div className="badge badge-soft badge-success">accepted</div>
  </li>
  
  <li className="list-row">
    <div>
      <div>Chicken Tandoori Pizza (Regular) x 2</div>
      <div className="text-xs uppercase font-semibold opacity-60">REFMA9667B</div>
    </div>
    <div className="badge badge-soft badge-info">ready</div>

  </li>
  
  <li className="list-row">
    <div>
      <div>Classic Cheeseburger (Large) x 1 </div>
      <div className="text-xs uppercase font-semibold opacity-60">REFM50697D</div>
    </div>
    <div className="badge badge-soft badge-warning">pending</div>

  </li>

  <li className="list-row">
    <div>
      <div>Chicken Tandoori Pizza (Regular) x 2</div>
      <div className="text-xs uppercase font-semibold opacity-60">REFM54627A</div>
    </div>
    <div className="badge badge-soft badge-success">accepted</div>

  </li>

  <li className="list-row">
    <div>
      <div>Classic Cheeseburger (Regular) x 2 </div>
      <div className="text-xs uppercase font-semibold opacity-60">REFMA3657F</div>
    </div>
    <div className="badge badge-soft badge-error">rejected</div>

  </li>
  
</ul>
  )
}

export default RecentOrders