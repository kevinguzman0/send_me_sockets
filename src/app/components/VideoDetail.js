import { Form, Formik } from "formik";
import React from "react";
import VideoItem from './VideoItem'

const VideoDetail = ({ video, clients }) => {

    const renderVideos = video.map((vid) => {
        return (
            <VideoItem key={vid.id.videoId} video={vid} />
        )
    })
    const renderClients = clients.map((client) => {
        return (
            <ul>
                <li>
                    <input type="radio" name="client" value={client.id} />
                    {client.name}
                </li>
            </ul>
        )
    })
    const sendValues = (values) => {
        console.log(values);
    }
    return (
        <div className="content-render">
            <Formik
                initialValues={{ video: '', client: '' }}
                onSubmit={values => console.log(values)}
            >
                <Form>
                    <div className="aviso-video">
                        <h5>Elija el video que desea enviar y a quien</h5>
                    </div>
                    {renderVideos}
                    <div className="wow animate__animated animate__slideInUp animate__fast list-clients">
                        {renderClients}
                    </div>
                    <div className="content-btn-sendme">
                        <button className="btn-sendme" type="submit">Enviar</button>
                    </div>
                </Form>
            </Formik>
        </div >
    )
}
export default VideoDetail