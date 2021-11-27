import React from 'react'

class Client extends React.Component {

    render() {
        return (
            <div id="admin" className="animate__animated animate__fadeIn animate__slow">
                <iframe style={{width: '100%', height: '100vh'}} src={"http://localhost:3000/client"}/>
            </div>
        )
    }
}

export default Client