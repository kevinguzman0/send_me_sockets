import React from 'react'
import { Link } from "react-router-dom"

const ButtonRedirect = ({children, ...props}) => {
    return (
        <Link {...props}>{children}</Link>
    )
}
export default ButtonRedirect