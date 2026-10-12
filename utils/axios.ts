import axios from "axios";


console.log(process.env.NEXT_PUBLIC_API_URL)
const api = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
timeout: 5000,                          // Request aborts if it takes longer than 5 seconds
withCredentials:true,  
headers: {
    
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

})



export default api;