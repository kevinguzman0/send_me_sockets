import React from "react";

const VideoItem = ({video}) => {
    const videoSRC = `https://www.youtube.com/embed/${video.id.videoId}`
    return (
        <div className="item-video row">
            <div className="col-md-6 wow animate__animated animate__slideInLeft animate__fast">
                <input type="radio" name="video" value={video.id.videoId} />
                <iframe src={videoSRC} allowFullScreen title="several video" />
            </div>
            <div className="col-md-6 wow animate__animated animate__slideInRight animate__fast">
                <h4>{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
            </div>
        </div>
    )
}
export default VideoItem