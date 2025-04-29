import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

function BackButton({link}) {
  return (
    <Link to={link} className="btn border border-error btn-ghost rounded-full hover:btn-error">
        <FaArrowLeft/>
    </Link>
  )
}

export default BackButton