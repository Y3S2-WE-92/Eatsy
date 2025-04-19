import React from 'react'
import { RestaurantLandingNavbar } from '../../components'

function RestaurantLanding() {
  return (
    <div>
        <RestaurantLandingNavbar />
        <div className="relative flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mt-8">Eatsy for Restaurants</h1>
            <p className="mt-4">Manage your restaurant with ease.</p>
            <p className="mt-2">Sign up to get started!</p>
        </div>
    </div>
  )
}

export default RestaurantLanding