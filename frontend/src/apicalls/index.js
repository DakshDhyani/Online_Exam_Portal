// Every time we get the json web token then we will move it to header

import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
         Authorization : `Bearer ${localStorage.getItem('token')}`
    }
});

export default axiosInstance;