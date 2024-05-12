import { apiClient } from "./ApiClient";
// export function retrieveHelloWorld(){
//     return axios.get('http://localhost:8080/hello-world');
// }

export const retrieveHelloWorld = () => apiClient('http://localhost:8080/hello-world');

export const retrieveHelloWorldPathVariable 
    = (username , token) => apiClient.get(`http://localhost:8080/hello-world/path-variable/${username}` 
    // { 
    //     headers: {
    //         Authorization: token
    // } 
);
 
