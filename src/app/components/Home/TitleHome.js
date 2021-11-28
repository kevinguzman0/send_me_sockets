import React from 'react'
import IconLogin from '../../img/icon_login.png'

const TitleHome = () => {
    return (
        <div className="title">
            <img src={IconLogin} alt="icon_login" width="100%" />
            <h4>Send<strong>ME</strong></h4>
        </div>
    )
}

export default TitleHome