import axios from "axios"
const KEY = 'AIzaSyCrs01jsr_RPwJdR6hvZF2RsjbLGUaOPGQ'

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})