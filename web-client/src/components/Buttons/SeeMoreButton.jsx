import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import {Link} from "react-router-dom";

function SeeMoreButton({link=""}) {
  return (
    <Link to={link} className="btn btn-ghost border border-accent btn-circle">
      <FaArrowRight/>
    </Link>
  )
}

export default SeeMoreButton