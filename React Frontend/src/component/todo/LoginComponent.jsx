import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
export default function LoginComponent(){
    const [username , setUsername] = useState('abhijeet');
    const [password , setPassword] = useState('');

    // const [sucess , setSucess] = useState(false);
    const [error , setError] = useState(false);

    const authContext = useAuth();

    const nevigate = useNavigate();

    function handleUserNameChange(event) {
        // console.log(event.target.value);
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        // console.log(event.target.value);
        setPassword(event.target.value);
    } 
   
    async function handleSubmit(){
        // console.log(username);
        // console.log(password);

        // HardCoded Authentication
        if(await authContext.login(username , password)){
            // To nevigate to another component from one Component use nevigate
            nevigate(`/welcome/${username}`);

        }
        else{
            setError(true); 
        }

    }
    // function SucessRendering() {
    //     if(sucess){
    //         return (
    //             <div className= "successMessage">Authenticated Successfully</div>
    //         );
    //     }
    //     return null; 

    // }

    // function ErrorRendering() {
    //     if(error){
    //         return (
    //             <div className= "errorMessage">Authentication Failed</div>
    //         );
    //     }
    //     return null;

    // }

    return (
        <div className="Login">

            {/* Alternate way to authorize user using javascript features 
            ( true && 'abhijeet') gives abhijeet and (false && 'abhijeet') gives false */}
            
            {error &&   <div className= "errorMessage">Authentication Failed</div>}

            {/* Complex ways of authorization */}
            {/* <SucessRendering /> */}
            {/* <ErrorRendering /> */}

            <div className="LoginForm">
                <div>
                    <input 
                        type="text" 
                        name="username"
                        value={username} 
                        onChange={handleUserNameChange}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handlePasswordChange}
                    />
                </div>
                <div>
                    <button 
                        type="button" 
                        name="login" 
                        onClick={handleSubmit} >
                            Login
                    </button>
                </div>
            </div>
        </div>
    );
}



