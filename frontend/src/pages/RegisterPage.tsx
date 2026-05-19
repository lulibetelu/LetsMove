import {Link, useNavigate} from 'react-router-dom'
import {useState} from "react";
import {createUser, loginUser} from '../api/user.ts'
import type {LoginCredentials, RegisterCredentials} from "../types/userTypes.ts";
import PopUpError from "../components/PopUpError.tsx";
import CustomInput from "../components/create/CustomInput.tsx";
import {UserPlus} from "lucide-react";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string|null>(null);

    const navigate = useNavigate();

    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        //Prevents the page from reloading on submit
        event.preventDefault();
        setError(null);
        try {
            const credentials: RegisterCredentials = {username, email, password};
            const userResponse = await createUser(credentials);
            console.log("USER RESPONSE " + userResponse.message)

            // para que el usuario no tenga que logearse dsp de haberse registrado
            const loginCredentials: LoginCredentials = {email, password};
            const token = await loginUser(loginCredentials);
            localStorage.setItem('token', token)

            navigate("/interests");
        } catch (e) {
            if (e instanceof Error) setError(e.message);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#141414]">
            <div className="w-full max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

                {/* Header idéntico al Login pero con otro ícono y texto */}
                <div className="relative py-12 flex flex-col items-center justify-center text-white overflow-hidden"
                     style={{ background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)" }}
                >
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
                    <div className="absolute -bottom-12 -left-6 w-32 h-32 rounded-full bg-black/10" />

                    <div className="relative bg-white/15 backdrop-blur-sm border border-white/20 p-4 rounded-2xl mb-4 shadow-lg">
                        <UserPlus size={28} strokeWidth={1.8} />
                    </div>

                    <h2 className="relative text-3xl font-bold tracking-tight">Register</h2>
                    <p className="relative text-white/70 text-sm mt-1.5 font-light">Sumate a la comunidad</p>

                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1e1e1e] rounded-t-[50%]" />

                </div>

                <form className="p-8 flex flex-col gap-5 bg-[#1e1e1e]" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <CustomInput label = 'Username' input = {{
                                type: 'text',
                                placeHolder: 'your username',
                                value: username,
                                onChange: (e) => {setUsername(e.target.value)}
                            }}></CustomInput>
                    </div>
                    <div className="flex flex-col gap-1">
                        <CustomInput label = 'Email' input = {{
                                type: 'email',
                                placeHolder: 'your email',
                                value: email,
                                onChange: (e) => {setEmail(e.target.value)}
                            }}></CustomInput>
                    </div>
                    <div className="flex flex-col gap-1">
                        <CustomInput label = 'Password' input = {{
                                type: 'password',
                                placeHolder: 'your password',
                                value: password,
                                onChange: (e) => {setPassword(e.target.value)}
                            }}></CustomInput>
                    </div>
                    <div>
                        {error!=null && <PopUpError message={error}/>}
                    </div>
                    <button type="submit" className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full mt-2 shadow-md transition-all active:scale-[0.98]"> Register </button>
                    <div className='flex flex-col items-center justify-center gap-1 mt-2 text-center'>
                        <p className="text-sm opacity-60">¿Ya tenés una cuenta?</p>
                        <Link to='/login' className='text-[#8A9A5B] font-bold hover:text-[#728249] transition-colors'>
                            Iniciá sesión acá
                        </Link>
                    </div>


                </form>
            </div>

        </div>
    );

}

//esto es muu feo y yo se que se puede modularizar y hacer legible. No se si para hacerlo. Solo para aprenderlo