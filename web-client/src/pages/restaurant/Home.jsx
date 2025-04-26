import React from 'react'
import { AvailabilityToggleButton } from '../../components'
import { styles } from '../../styles/styles'

function Home() {
  return (
    <div className={`${styles.paddingX} relative flex flex-col`}>
      <AvailabilityToggleButton />
      
    </div>
  )
}

export default Home