import React from 'react'
import BackButton from '../Buttons/BackButton'

function PageTitle({title="", backLink=""}) {
  return (
    <div className={`py-4 md:py-8 flex flex-row items-center gap-4 w-full`}>
        <BackButton link={backLink} />
        <h1 className='text-3xl font-bold'>{title}</h1>
    </div>
  )
}

export default PageTitle