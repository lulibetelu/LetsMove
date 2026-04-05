import {useState} from "react";
import type {LoginCredentials} from "../types/userTypes.ts";
import {loginUser} from "../api/user.ts";
import {Link, useNavigate} from "react-router-dom";
import CredentialError from "../components/CredentialError.tsx";
import CustomInput from "../components/CustomInput.tsx";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorHasBeenThrown, setError] = useState(false);

    const navigate = useNavigate();
    const handleSubmit:React.SubmitEventHandler= async (event) => {
        event.preventDefault()
        const credentials: LoginCredentials = {email, password}
        try {
            const token = await loginUser(credentials);
            localStorage.setItem('token', token)
            navigate("/posts")
        } catch {
            setError(true);
        }
        //aca seria un redirect a home page no?
        //navigate("/test");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <form className="card w-96 bg-base-100 shadow-xl p-6 gap-4 flex flex-col" onSubmit={handleSubmit}>

                <h2 className="text-2xl font-bold text-center">Login</h2>

                <CustomInput label = 'Email' input = {{
                        type: 'email',
                        placeHolder: 'your email',
                        value: email,
                        onChange: (e) => {setEmail(e.target.value)}
                    }}></CustomInput>

                <CustomInput label = 'Password' input = {{
                        type: 'password',
                        placeHolder: 'your password',
                        value: password,
                        onChange: (e) => {setPassword(e.target.value)}
                    }}></CustomInput>

                <button className="btn btn-primary mt-2"> Login </button>

                <div className='flex flex-row items-center justify-center'>
                    <p>Don't have an account?</p>
                    <Link to='/register' className='text-center text-primary p-2'>Register</Link>
                </div>

                <div>
                    {errorHasBeenThrown && <CredentialError message='Invalid email or password'/>}
                </div>
            </form>


        </div>
    );
}
