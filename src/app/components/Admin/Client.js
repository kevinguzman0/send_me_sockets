import React from 'react'
import BoxPrincipal from './BoxPrincipal'

class Client extends React.Component {
    render() {
        return (
            <BoxPrincipal>
                <h1>Pruebaaa socioio</h1>
                <iframe src="https://sendmeproject.herokuapp.com/client" />
            </BoxPrincipal>
        )
    }
}

export default Client