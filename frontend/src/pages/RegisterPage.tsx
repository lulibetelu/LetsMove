import {useNavigate} from 'react-router-dom'
import {useState} from "react";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit : React.SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        //logic to make the http request. I have to invesitgate this
        console.log(username, email, password)
        navigate("/interests");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <form className="card w-96 bg-base-100 shadow-xl p-6 gap-4 flex flex-col" onSubmit={handleSubmit}>

                <h2 className="text-2xl font-bold text-center">Register</h2>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="your username"
                        className="input input-bordered"
                        value={username}
                        onChange={(e) => {setUsername(e.target.value)}}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="your email"
                        className="input input-bordered"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
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
                        onChange={(e) => {setPassword(e.target.value)}}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    Register
                </button>

            </form>
        </div>
    );

}

//esto es muu feo y yo se que se puede modularizar y hacer legible. No se si para hacerlo. Solo para aprenderlo