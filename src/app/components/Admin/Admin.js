import { Form, Formik } from 'formik'
import React from 'react'
import TextInput from '../TextInput';
import VideoDetail from './VideoDetail'
import youtube from '../../apis/youtube';
import BoxPrincipal from './BoxPrincipal';


class Admin extends React.Component {
    state = {
        videos: [],
        clients: []
    }

    buscarVideo = async (values) => {
        const response = await youtube.get("/search", {
            params: {
                q: values.searching
            }
        })
            .then(res => {
                this.setState({
                    videos: res.data.items
                })
                this.listClients()
            })
            .catch(err => console.log(err))
    }

    listClients = async () => {
        fetch('/list-clients', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json(res))
            .then(data => {
                this.setState({
                    clients: data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <BoxPrincipal>
                <Formik
                    initialValues={{ searching: '' }}
                    onSubmit={values => this.buscarVideo(values)}
                >
                    <Form>
                        <div className="content-search">
                            <TextInput type="text" name="searching" placeholder="Search in Youtube" className="form-control bar-search-video" aria-label="Search" aria-describedby="search-addon" />
                            <button className="input-group-text btn-search-video" type="submit"><ion-icon name="search" id="search-addon"></ion-icon></button>
                        </div>
                    </Form>
                </Formik>
                <div className="videos-details">
                    {this.state.videos.length != 0 ?
                        <VideoDetail video={this.state.videos} clients={this.state.clients} /> :
                        null
                    }
                </div>
            </BoxPrincipal>
        )
    }
}
export default Admin