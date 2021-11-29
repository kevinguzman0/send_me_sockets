import React from 'react'
import BoxPrincipal from './BoxPrincipal'

class Client extends React.Component {
    render() {
        return (
            <BoxPrincipal>
                <iframe style={{ width: '100%', height: '100vh' }} src={"https://sendmeproject.herokuapp.com/client"} />
            </BoxPrincipal>
        )
    }
}

export default Client