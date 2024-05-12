import { createContext , useContext, useState} from "react";
import { executeBasicAuthenticationService, executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
// 1. create a context 
export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext)

// 2. Share the created conext with other components
export default function AuthProvider({children}) {

    // 3. Put some state int the context
    // const [number , setNumber] = useState(10);
    const [isAuthenticated , setAuthenticated] = useState(false);
    const [username , setUsername] = useState(null)
    const [token , setToken] = useState(null);
    //setting interval 
    // setInterval( () => setNumber(number + 1) , 10000);

    // function login(username , password) {    
    //     if(username === 'abhijeet' && password === 'dummy'){
    //         setAuthenticated(true);
    //         setUsername(username);
    //         return true;

    //     }
    //     else{
    //         setAuthenticated(false);
    //         setUsername(null);
    //         return false;
    //     }
    // }

    // async function login(username , password) {    
    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)
        
    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)
    //         if(response.status == 200){
    //             setAuthenticated(true); 
    //             setUsername(username);
    //             setToken(baToken);
    //             // for adding tokens to all the rest api calls
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercrepting and adding a token')
    //                     config.headers.Authorization = baToken
    //                     return config
    //                 }
    //             )

    //             return true;
    //         }
    //         else{
    //             // setAuthenticated(false);
    //             // setUsername(null);
    //             // setToken(null);
    //             logout();
    //             return false;
    //         }
        
    //     }
    //     catch(error){
    //             // setAuthenticated(false);
    //             // setUsername(null);
    //             // setToken(null);
    //             logout();
    //             return false;
    //     }
    // }


    async function login(username , password) {    
        
        try{
            const response = await executeJwtAuthenticationService(username , password)
            if(response.status == 200){
                const jwtToken = 'Bearer ' + response.data.token
                setAuthenticated(true); 
                setUsername(username);
                setToken(jwtToken);
                // for adding tokens to all the rest api calls
                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('intercrepting and adding a token')
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )

                return true;
            }
            else{
                // setAuthenticated(false);
                // setUsername(null);
                // setToken(null);
                logout();
                return false;
            }
        
        }
        catch(error){
                // setAuthenticated(false);
                // setUsername(null);
                // setToken(null);
                logout();
                return false;
        }
    }

    function logout(){
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }
    return(

        <AuthContext.Provider value={ {isAuthenticated , setAuthenticated , login , logout , username , token} }>
            {children}
        </AuthContext.Provider>
    );
}
 
