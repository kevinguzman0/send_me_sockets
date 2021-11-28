import React from 'react';
import TitleHome from './TitleHome'

const Home = ({children}) => {
    return (
        <div id="home" className="animate__animated animate__fadeIn animate__slow">
            <div className="login">
                <TitleHome />
                {children}
            </div>
        </div>
    )
}
export default Home