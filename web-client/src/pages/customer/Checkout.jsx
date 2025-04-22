import React from 'react'
import { PageTitle } from '../../components'
import { styles } from '../../styles/styles'

function Checkout() {
  return (
    <div className={`${styles.paddingX} flex flex-col`}>
      <PageTitle title='Checkout' backLink='/customer' />
    </div>
  )
}

export default Checkout