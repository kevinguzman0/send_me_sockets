import React from 'react';
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

import TextInput from './TextInput'
import IconLogin from '../img/icon_login.png'
import ButtonLogin from './ButtonLogin'
import ButtonRedirect from './ButtonRedirect'

const Login = () => {
    const navigate = useNavigate()

    const entrar = (values) => {
        fetch('/signin', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    navigate('/home-admin')
                }else{
                    navigate('/home-cliente')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div id="home" className="animate__animated animate__fadeIn animate__slow">
            <div className="login">
                <div className="title">
                    <img src={IconLogin} alt="icon_login" width="100%" />
                    <h4>Send<strong>ME</strong></h4>
                </div>
                <div className="form">
                    <Formik
                        initialValues={{ name: '', password: '' }}
                        onSubmit={values => entrar(values)}
                    >
                        <Form>
                            <TextInput name="name" placeholder="Nombre" />
                            <TextInput name="password" type="password" placeholder="Contraseña" />

                            <ButtonLogin type="submit">Entrar</ButtonLogin>
                            <ButtonRedirect to={'/register'} className="btn-register">Registrarse</ButtonRedirect>
                            {/* <Link to="/register" style={styles.regis}>Registrarse</Link> */}
                        </Form>
                    </Formik>
                </div>
            </div>

        </div>
    )
}

export default Login