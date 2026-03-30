import {useState} from "react";
import type {LoginCredentials} from "../types/userTypes.ts";
import {loginUser} from "../api/user.ts";
import {useNavigate} from "react-router-dom";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit:React.SubmitEventHandler= async (event) => {
        event.preventDefault()
        const credentials: LoginCredentials = {email, password}
        const token = await loginUser(credentials);
        localStorage.setItem('token', token)
        navigate("/test");

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <form className="card w-96 bg-base-100 shadow-xl p-6 gap-4 flex flex-col" onSubmit={handleSubmit}>

                <h2 className="text-2xl font-bold text-center">Login</h2>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="your email"
                        className="input input-bordered"
                        value={email}
                        onChange={(e) => (setEmail(e.target.value))}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="your password"
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => (setPassword(e.target.value))}
                    />
                </div>

                <button className="btn btn-primary mt-2">
                    Login
                </button>

            </form>
        </div>
    );
}
