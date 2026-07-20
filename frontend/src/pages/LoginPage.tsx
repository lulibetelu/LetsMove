import {useState} from "react";
import type {LoginCredentials} from "../types/userTypes.ts";
import {loginUser} from "../api/user.ts";
import {Link, useNavigate} from "react-router-dom";
import PopUpError from "../components/PopUpError.tsx";
import CustomInput from "../components/create/CustomInput.tsx";
import {LogIn} from "lucide-react";
import {GoogleLogin} from "@react-oauth/google";
import {useGoogleAuth} from "../hooks/useGoogleAuth.ts";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string|null>(null);

    const navigate = useNavigate();
    const googleAuth = useGoogleAuth();

    const handleSubmit:React.SubmitEventHandler= async (event) => {
        event.preventDefault()
        const credentials: LoginCredentials = {email, password}
        try {
            const token = await loginUser(credentials);
            localStorage.setItem('token', token)
            navigate("/homepage")
        } catch (e) {
            if (e instanceof Error) setError(e.message);
        }
    }

    const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
        if (!credentialResponse.credential) return;
        googleAuth.mutate(credentialResponse.credential, {
            onSuccess: (data) => {
                if (data.exists && data.access_token) {
                    localStorage.setItem('token', data.access_token);
                    navigate("/homepage");
                } else if (!data.exists) {
                    sessionStorage.setItem('googleCredential', credentialResponse.credential!);
                    navigate("/register", { state: { email: data.email, name: data.name } });
                }
            },
            onError: (e) => {
                setError(e.message);
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#141414]">
            <div className="w-full max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                {/* Header con el color de marca */}
                <div className="relative py-12 flex flex-col items-center justify-center text-white overflow-hidden"
                     style={{ background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)" }}
                >
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
                    <div className="absolute -bottom-12 -left-6 w-32 h-32 rounded-full bg-black/10" />

                    <div className="relative bg-white/15 backdrop-blur-sm border border-white/20 p-4 rounded-2xl mb-4 shadow-lg">
                        <LogIn size={28} strokeWidth={1.8} />
                    </div>

                    <h2 className="relative text-3xl font-bold tracking-tight">Welcome!</h2>
                    <p className="relative text-white/70 text-sm mt-1.5 font-light">
                        Connect with people over sports
                    </p>
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1e1e1e] rounded-t-[50%]" />
                </div>

                <form className="p-8 flex flex-col gap-5 bg-[#1e1e1e]" onSubmit={handleSubmit}>

                        <div className="flex flex-col gap-1">

                            <CustomInput label="Email" input={{
                                type: "email",
                                placeHolder: "your email",
                                value: email,
                                onChange: (e) => setEmail(e.target.value)
                            }} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <CustomInput label="Password" input={{
                                type: "password",
                                placeHolder: "your password",
                                value: password,
                                onChange: (e) => setPassword(e.target.value)
                            }} />
                        </div>
                    <div>
                        {error!=null && <PopUpError message={error}/>}
                    </div>
                    <button className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full mt-2 shadow-md transition-all active:scale-[0.98]"
                    > Login
                        </button>

                    <div className="flex items-center gap-3 w-full mt-2">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-white/40 uppercase tracking-wider">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="w-full mt-2 flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google login failed")}
                            theme="filled_black"
                            size="large"
                            width="100%"
                            text="signin_with"
                            shape="rectangular"
                        />
                    </div>

                    <div className='flex flex-col items-center gap-2 mt-4'>
                        <p className="text-sm opacity-70">Don't have an account?</p>
                        <Link to='/register' className='text-[#8A9A5B] font-semibold hover:underline transition-all'>Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
