import React from 'react'
import BackButton from '../Buttons/BackButton'
import { styles } from '../../styles/styles'

function PageTitle({title="", backLink=""}) {
  return (
    <div className={`${styles.paddingX} pt-8 flex flex-row items-center gap-4 w-full`}>
        <BackButton link={backLink} />
        <h1 className='text-3xl font-bold'>{title}</h1>
    </div>
  )
}

export default PageTitle