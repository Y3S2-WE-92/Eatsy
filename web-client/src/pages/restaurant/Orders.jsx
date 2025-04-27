import React from 'react'
import { PageTitle } from "../../components";
import { styles } from "../../styles/styles";

function Orders() {
  return (
    <div className={`${styles.paddingX} flex flex-col`}>
      <PageTitle title='Orders' backLink='/restaurant' />
      <div className="card bg-base-300">
        <div className="card-body"></div>
      </div>
    </div>
  )
}

export default Orders