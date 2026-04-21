import {useState} from "react";
import type {LoginCredentials} from "../types/userTypes.ts";
import {loginUser} from "../api/user.ts";
import {Link, useNavigate} from "react-router-dom";
import PopUpError from "../components/PopUpError.tsx";
import CustomInput from "../components/CustomInput.tsx";
import {LogIn} from "lucide-react";

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
            navigate("/homepage")
        } catch {
            setError(true);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
            <div className="card w-full max-w-sm bg-base-100 shadow-2xl overflow-hidden border border-base-content/5">
                {/* Header con el color de marca */}
                <div className="bg-[#8A9A5B] py-10 flex flex-col items-center justify-center text-white">
                    <div className="bg-white/20 p-4 rounded-full mb-3">
                        <LogIn size={32} />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight">¡Bienvenido!</h2>
                    <p className="text-white/80 text-sm mt-1">
                        Conectate con gente para hacer deporte.
                    </p>
                </div>
                <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
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
                    <button className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full mt-2 shadow-md transition-all active:scale-[0.98]"
                    > Login
                        </button>

                    <div className='flex flex-col items-center gap-2 mt-4'>
                        <p className="text-sm opacity-70">Don't have an account?</p>
                        <Link to='/register' className='text-[#8A9A5B] font-semibold hover:underline transition-all'>Register</Link>
                    </div>

                    <div>
                        {errorHasBeenThrown && <PopUpError message='Invalid email or password'/>}
                    </div>
                </form>
            </div>
        </div>
    );
}
