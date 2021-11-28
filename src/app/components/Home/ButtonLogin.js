import React from 'react';

const ButtonLogin = ({children, ...props}) => {
    return (
        <button {...props}>{children}</button>
    )
}
export default ButtonLogin