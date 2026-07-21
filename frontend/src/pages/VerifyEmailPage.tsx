import {Link, useLocation} from "react-router-dom";
import {MailCheck} from "lucide-react";

export default function VerifyEmailPage() {
    const location = useLocation();
    const email = (location.state as { email?: string } | null)?.email;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#141414]">
            <div className="w-full max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                <div className="relative py-12 flex flex-col items-center justify-center text-white overflow-hidden"
                     style={{background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)"}}
                >
                    <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5"/>
                    <div className="absolute -bottom-12 -left-6 w-32 h-32 rounded-full bg-black/10"/>

                    <div className="relative bg-white/15 backdrop-blur-sm border border-white/20 p-4 rounded-2xl mb-4 shadow-lg">
                        <MailCheck size={28} strokeWidth={1.8}/>
                    </div>

                    <h2 className="relative text-3xl font-bold tracking-tight">Verify your email</h2>
                    <p className="relative text-white/70 text-sm mt-1.5 font-light">
                        One more step to get started
                    </p>

                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-[#1e1e1e] rounded-t-[50%]"/>
                </div>

                <div className="p-8 flex flex-col items-center gap-5 bg-[#1e1e1e] text-center">
                    <p className="text-white/70 text-sm leading-relaxed">
                        We've sent a verification link to{" "}
                        <span className="text-white font-semibold">{email ?? "your email"}</span>.
                        <br/>
                        Please check your inbox and click the link to activate your account.
                    </p>

                    <Link to="/login"
                          className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full shadow-md transition-all active:scale-[0.98]">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
