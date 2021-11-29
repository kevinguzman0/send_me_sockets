import React from 'react'
import BoxPrincipal from './BoxPrincipal'

class Client extends React.Component {
    render() {
        return (
            <BoxPrincipal>
                <iframe style={{ width: '100%', height: '100vh' }} src={"https://www.facebook.com/"} />
            </BoxPrincipal>
        )
    }
}

export default Client