import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react";
import {createUser, loginUser} from '../api/user.ts'
import type {LoginCredentials, RegisterCredentials} from "../types/userTypes.ts";
import PopUpError from "../components/PopUpError.tsx";
import CustomInput from "../components/CustomInput.tsx";
import {UserPlus} from "lucide-react";

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
        <div className="min-h-screen flex items-center justify-center bg-base-300 px-4 py-12">
            <div className="card w-full max-w-sm bg-base-100 shadow-2xl overflow-hidden border border-base-content/5">

                {/* Header idéntico al Login pero con otro ícono y texto */}
                <div className="bg-[#8A9A5B] py-8 flex flex-col items-center justify-center text-white">
                    <div className="bg-white/20 p-4 rounded-full mb-3">
                        <UserPlus size={28} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">Register</h2>
                    <p className="text-white/80 text-sm mt-1">Sumate a la comunidad</p>
                </div>
                <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="w-full">
                        <CustomInput label = 'Username' input = {{
                                type: 'text',
                                placeHolder: 'your username',
                                value: username,
                                onChange: (e) => {setUsername(e.target.value)}
                            }}></CustomInput>
                    </div>
                    <div className="w-full">
                        <CustomInput label = 'Email' input = {{
                                type: 'email',
                                placeHolder: 'your email',
                                value: email,
                                onChange: (e) => {setEmail(e.target.value)}
                            }}></CustomInput>
                    </div>
                    <div className="w-full">
                        <CustomInput label = 'Password' input = {{
                                type: 'password',
                                placeHolder: 'your password',
                                value: password,
                                onChange: (e) => {setPassword(e.target.value)}
                            }}></CustomInput>
                    </div>
                    <button type="submit" className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full mt-2 shadow-md transition-all active:scale-[0.98]"> Register </button>
                    <div className='flex flex-col items-center justify-center gap-1 mt-2 text-center'>
                        <p className="text-sm opacity-60">¿Ya tenés una cuenta?</p>
                        <Link to='/login' className='text-[#8A9A5B] font-bold hover:text-[#728249] transition-colors'>
                            Iniciá sesión acá
                        </Link>
                    </div>
                    <div>
                        {errorHasBeenThrown && <PopUpError message='Invalid credentials'/>}
                    </div>

                </form>
            </div>

        </div>
    );

}

//esto es muu feo y yo se que se puede modularizar y hacer legible. No se si para hacerlo. Solo para aprenderlo