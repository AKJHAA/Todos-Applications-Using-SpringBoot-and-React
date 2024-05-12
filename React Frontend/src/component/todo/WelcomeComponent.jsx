import { useParams , Link } from "react-router-dom";
import { useState } from "react";
import { retrieveHelloWorld , retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";

export default function WelcomeComponent(){
    const {username} = useParams();

    const [message , setMessage] = useState(null);
    // console.log(username)
    
    const authContext = useAuth();
    
    function callHelloWorldRestApi() {
        console.log('called');


        retrieveHelloWorldPathVariable('Rahul' , authContext.token)
            .then((response) => sucessfulResponse(response))
            .catch( (error) => errorResponse(error))
            .finally( () => console.log('cleanup'))

        // retrieveHelloWorld()
        //     .then((response) => sucessfulResponse(response))
        //     .catch( (error) => errorResponse(error))
        //     .finally( () => console.log('cleanup'))
    }  

    function sucessfulResponse(response) {
        console.log(response)
        setMessage(response.data.message);
    }
    function errorResponse(error){  
        console.log(error);
    }

    return (
        <div className='WelcomeComponent'>
            <h1>Hello, Welcome {username} To Abhijeet Todo's Application....!</h1>
            <div>
                Manage Your Todos - <Link to='/list-todos'>Go Here (Click) </Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World
                </button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    );
}
