import { useEffect, useState } from "react";
import { retrieveAllTodosForUsername , deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodos(){

    const today = new Date();

    const authContext = useAuth();

    const username = authContext.username;

    const nevigate = useNavigate();

    const targetDate = new Date(today.getFullYear() + 12 , today.getMonth() , today.getDay());

    const [todos , setTodos] = useState([]);

    const [message , setMessage] = useState(null);

    // const todos = [
    //     // {id : 1 , description : 'Learn AWS Cloud' , done : false , tagetDate:targetDate},
    //     // {id : 2 , description : 'Learn Azure Cloud' , done : false , tagetDate:targetDate},
    //     // {id : 3 , description : 'Learn Devops' , done : false , tagetDate:targetDate},
    //     // {id : 4 , description : 'Learn Oracle' , done : false , tagetDate:targetDate},
    // ]

    useEffect (
        () => refreshTodos() , []
    )

    function refreshTodos() {
        retrieveAllTodosForUsername(username)
            .then(response => {
                console.log(response.data)
                setTodos(response.data)
            })
            .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        
        console.log('Clicked -> ' + id);
        deleteTodoApi(username , id)
            .then(
                //1. Display message to user
                //2. update todos LIst
                () => {
                    setMessage(`Delete Of Todo with id = ${id} Successfull`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    function updateTodo(id) {
        console.log('Clicked Update =>  ' + id);
        nevigate(`/todo/${id}`)
    }

    function addNewTodo(id) {
        nevigate(`/todo/-1`)
    }

    return (
        <div className='container'>
            <h1>You are Showing All the Todos ...!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
               <table className='table'>
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Done</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={ () => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={ () => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
               </table>
            </div>

            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    );
}


