import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import VideoItem from './VideoItem'
import { useAlert } from 'react-alert'


const VideoDetail = ({ video, clients }) => {
    const [mensaje, setMensaje] = useState('')
    const alert = useAlert()

    const renderVideos = video.map((vid) => {
        return (
            <VideoItem key={vid.id.videoId} video={vid} />
        )
    })
    const renderClients = clients.map((client) => {
        return (
            <ul>
                <li>
                    <Field name="client" type="radio" value={client._id}/>
                    {client.name}
                </li>
            </ul>
        )
    })
    const activeAlert = () => {
        if (mensaje) {
            alert.show('Video emitido!')            
        }
    }
    const sendValues = (values) => {

        fetch('/enviarvideo', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setMensaje(data)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="content-render">
            <Formik
                initialValues={{ video: '', client: '' }}
                onSubmit={values => sendValues(values)}
            >
                <Form>
                    <div className="aviso-video">
                        <h5>Elija el video y el usuario</h5>
                    </div>
                    {renderVideos}
                    <div className="wow animate__animated animate__slideInUp animate__fast list-clients">
                        {renderClients}
                    </div>
                    <div className="content-btn-sendme">
                        <button className="btn-sendme" type="submit" onClick={() => {
                            activeAlert()}}>Enviar</button>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}
export default VideoDetail