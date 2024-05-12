import { BrowserRouter ,Route , Routes ,Navigate} from 'react-router-dom'
import LogoutComponent from './LogoutComonnent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodos from './ListTodos';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext';
import './TodoApp.css'
import TodoComponent from './TodoComponent';

function AuthenticatedRoute({children}) {
    const authContext = useAuth();
    if(authContext.isAuthenticated)
        return children;
    return <Navigate to="/"/>;
}

export default function TodoApp () {
    return (
        <div className="TodoApp">

            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                        <Routes>
                            <Route path='/' element={<LoginComponent/>}></Route>
                            <Route path='/login' element={<LoginComponent/>}></Route>


                            <Route path='/welcome/:username' element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent/>
                                </AuthenticatedRoute>
                            }/>


                            <Route path='todos' element={
                                <AuthenticatedRoute>
                                    <ListTodos/>
                                </AuthenticatedRoute>
                            } />

                            <Route path='todo/:id' element={
                                <AuthenticatedRoute>
                                    <TodoComponent/>
                                </AuthenticatedRoute>
                            } />

                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent/>
                                </AuthenticatedRoute>
                            } />
                            
                            <Route path='*' element={<ErrorComponent/>}></Route>
                        </Routes>
                    <FooterComponent/>  
                </BrowserRouter>

            </AuthProvider>
        </div>
    );
}
