import {useNavigate} from 'react-router-dom'
import {useState} from "react";
import {createUser, loginUser} from '../api/user.ts'
import type {LoginCredentials, RegisterCredentials} from "../types/userTypes.ts";
import PopUpError from "../components/PopUpError.tsx";
import CustomInput from "../components/CustomInput.tsx";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorHasBeenThrown, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        //Prevents the page from reloading on submit
        event.preventDefault();
        try {
            const credentials: RegisterCredentials = {username, email, password};
            const userResponse = await createUser(credentials);
            console.log("USER RESPONSE " + userResponse.message)

            // para que el usuario no tenga que logearse dsp de haberse registrado
            const loginCredentials: LoginCredentials = {email, password};
            const token = await loginUser(loginCredentials);
            localStorage.setItem('token', token)

            navigate("/interests");
        } catch {
            setError(true);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <form className="card w-96 bg-base-100 shadow-xl p-6 gap-4 flex flex-col" onSubmit={handleSubmit}>

                <h2 className="text-2xl font-bold text-center">Register</h2>

                <CustomInput label = 'Username' input = {{
                        type: 'text',
                        placeHolder: 'your username',
                        value: username,
                        onChange: (e) => {setUsername(e.target.value)}
                    }}></CustomInput>

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

                <button type="submit" className="btn btn-primary mt-2"> Register </button>

                <div>
                    {errorHasBeenThrown && <PopUpError message='Invalid credentials'/>}
                </div>

            </form>

        </div>
    );

}

//esto es muu feo y yo se que se puede modularizar y hacer legible. No se si para hacerlo. Solo para aprenderlo