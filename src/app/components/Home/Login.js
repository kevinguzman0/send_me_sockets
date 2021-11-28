import React, { useState } from 'react';
import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'

import TextInput from '../TextInput'
import ButtonLogin from './ButtonLogin'
import ButtonRedirect from './ButtonRedirect'
import Home from './Home';

const Login = () => {
    const navigate = useNavigate()
    const [errorMessage, setError] = useState(false)

    const entrar = (values) => {
        fetch('/signin', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json().catch(err => setError(true)))
            .then(data => {

                if (data == true) {
                    navigate('/home-admin')
                }
                if (data == false) {
                    navigate('/home-client')
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <Home>
            {errorMessage ? <div className="error-entrada">Datos erroneos</div> : null}
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
                    </Form>
                </Formik>
            </div>
        </Home>
    )
}

export default Login