import React from 'react'
import { styles } from '../../styles/styles'

function Footer() {
    const currentyear = new Date().getFullYear()
  return (
    <div className={`${styles.primaryFont} footer sm:footer-horizontal footer-center bg-base-300 text-base-content/60 p-4 flex justify-between mt-8 fixed bottom-0 w-full px-4 py-2 text-[11px] z-20`}>
        <small>
            &copy; Eatsy | Food Ordering & Delivery System - {currentyear} | All Rights Reserved
        </small>
        <small className='text-right'>
            Developed By Y3S2-WE-92
        </small>
    </div>
  )
}

export default Footer