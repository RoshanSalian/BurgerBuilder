import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-cf81f-default-rtdb.firebaseio.com/'
});

export default instance;
