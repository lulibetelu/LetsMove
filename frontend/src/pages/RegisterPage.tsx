import {Link, useLocation, useNavigate} from 'react-router-dom'
import {useState} from "react";
import {createUser, loginUser} from '../api/user.ts'
import api from '../api/client.ts'
import type {RegisterCredentials} from "../types/userTypes.ts";
import PopUpError from "../components/PopUpError.tsx";
import CustomInput from "../components/create/CustomInput.tsx";
import Dropdown from "../components/Dropdown.tsx";
import {useLocations} from "../hooks/useLocations.ts";
import {UserPlus} from "lucide-react";

interface GoogleAuthResponse {
    access_token?: string;
}

export default function RegisterPage(){
    const location = useLocation();
    const googleData = location.state as { email?: string; name?: string } | null;
    const isGoogleUser = Boolean(googleData?.email);

    const [username, setUsername] = useState(googleData?.name ?? '');
    const [email, setEmail] = useState(googleData?.email ?? '');
    const [password, setPassword] = useState('');
    const [locationName, setLocationName] = useState('');
    const [error, setError] = useState<string|null>(null);
    const {locations, isPending: locLoading, locationError} = useLocations();

    const navigate = useNavigate();

    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            const selectedLocation = locations.find(l => l.location === locationName);
            const credentials: RegisterCredentials = {
                username,
                email,
                password: isGoogleUser ? '' : password,
                locationId: selectedLocation?.id,
            };
            await createUser(credentials);

            if (isGoogleUser) {
                const googleToken = sessionStorage.getItem('googleCredential');
                if (googleToken) {
                    const { data } = await api.post<GoogleAuthResponse>('auth', { token: googleToken });
                    if (data.access_token) {
                        localStorage.setItem('token', data.access_token);
                    }
                    sessionStorage.removeItem('googleCredential');
                }
            } else {
                const token = await loginUser({email, password});
                localStorage.setItem('token', token);
            }

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
                                onChange: (e) => {setUsername(e.target.value)},
                                readOnly: isGoogleUser,
                            }}></CustomInput>
                    </div>
                    <div className="flex flex-col gap-1">
                        <CustomInput label = 'Email' input = {{
                                type: 'email',
                                placeHolder: 'your email',
                                value: email,
                                onChange: (e) => {setEmail(e.target.value)},
                                readOnly: isGoogleUser,
                            }}></CustomInput>
                    </div>
                    <div className="flex flex-col gap-1">
                        <CustomInput label = 'Password' input = {{
                                type: 'password',
                                placeHolder: 'your password',
                                value: isGoogleUser ? '********' : password,
                                onChange: isGoogleUser ? () => {} : (e) => {setPassword(e.target.value)},
                                readOnly: isGoogleUser,
                            }}></CustomInput>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold tracking-widest uppercase text-[#8A9A5B]">
                            Home Location
                        </label>
                        <Dropdown
                            dataList={locations.map(l => l.location)}
                            error={locationError}
                            isPending={locLoading}
                            value={locationName}
                            handleChange={setLocationName}
                            placeholder="Choose location"
                        />
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
