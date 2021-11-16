import React, { useState } from 'react';
import { Form, Formik } from 'formik'

import ButtonLogin from './ButtonLogin'
import TextInput from './TextInput'
import IconLogin from '../img/icon_login.png'

import { useNavigate } from 'react-router-dom'



const Register = () => {
    const [enviado, setEnviado] = useState(false)
    const navigate = useNavigate()

    const enviar = (values) => {        
        fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Accept':  'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setEnviado(true)
            navigate('/')
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
                {enviado ? <div className="save_user"><h4>User saved</h4></div> : null}
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
            </div>
        </div>
    )
}
export default Register