import { AlertTriangle, Home } from 'lucide-react';
import {Link, useLocation} from 'react-router-dom';

export default function ErrorPage() {
    const location = useLocation();
    const title = location.state?.title || "¡Ups! Algo salió mal";
    const message = location.state?.message || "La página que buscás no existe o la ruta es incorrecta.";
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">

            <div className="max-w-md w-full bg-base-200/50 p-8 rounded-2xl text-center border border-error/20">

                <div className="flex justify-center mb-6">
                    <div className="bg-error/10 p-4 rounded-full">
                        <AlertTriangle className="text-error" size={48} strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-2">{title}</h1>
                <p className="text-base-content/70 mb-8 leading-relaxed">
                    {message}
                </p>

                <Link
                    to="/"
                    className="btn btn-neutral w-full flex items-center gap-2"
                >
                    <Home size={18} />
                    Volver al inicio
                </Link>

            </div>
        </div>
    );
}