import React from 'react'
import BoxPrincipal from './BoxPrincipal'

class Client extends React.Component {
    render() {
        return (
            <BoxPrincipal>
                <iframe style={{ width: '100%', height: '100vh' }} src={"http://143.198.122.231:3000/client"} />
            </BoxPrincipal>
        )
    }
}

export default Client