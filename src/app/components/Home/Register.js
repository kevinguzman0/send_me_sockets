import React, { useState } from 'react';
import { Form, Formik } from 'formik'

import ButtonLogin from './ButtonLogin'
import TextInput from '../TextInput'

import { useNavigate } from 'react-router-dom'
import Home from './Home';


const Register = () => {
    const [errorMessage, setError] = useState('')
    const navigate = useNavigate()

    const enviar = (values) => {
        fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    navigate('/')
                } else {
                    setError(data.errors[0].text)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Home>
            {errorMessage != '' ? <div className="error-entrada">{errorMessage}</div> : null}
            <div className="form">
                <Formik
                    initialValues={{ name: '', password: '', confirmPassword: '' }}
                    onSubmit={values => enviar(values)}
                >
                    <Form>
                        <TextInput name="name" placeholder="Nombre" />
                        <TextInput name="password" type="password" placeholder="Contraseña" />
                        <TextInput name="confirmPassword" type="password" placeholder="Confirmar contraseña" />

                        <ButtonLogin type="submit">Crear</ButtonLogin>
                    </Form>
                </Formik>
            </div>
        </Home>
    )
}
export default Register