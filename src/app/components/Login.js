import React from 'react';
import { Form, Formik } from 'formik'
import TextInput from './TextInput'
import IconLogin from '../img/icon_login.png'

const validate = (values) => {
    const errors = {}

    if (!values.name) {
        errors.name = 'Requerido'
    } else if (values.name.length < 5) {
        errors.name = 'El nombre es corto'
    }

    if (!values.password) {
        errors.password = 'Requerido'
    } else if (values.password.length < 5) {
        errors.lastname = 'La contraseña es corta'
    }

    return errors
}

const Login = () => {
    return (
        <div className="login">
            <div className="title">
                <img src={IconLogin} alt="icon_login" width="100%" />
                <h4>Send<strong>ME</strong></h4>
            </div>
            <div className="form">
                <Formik
                    initialValues={{ name: '', password: '' }}
                    validate={validate}
                    onSubmit={values => console.log(values)}
                >
                    <Form>
                        <TextInput name="name" place="Nombre" />
                        <TextInput name="password" place="Contraseña" />
                        <button type="submit">Enviar</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login