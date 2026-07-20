import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PopUpError from "../components/PopUpError.tsx";
import CustomInput from "../components/create/CustomInput.tsx";
import { requestPasswordReset, resetPassword } from "../api/passwordReset.ts";

export default function PasswordResetPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await requestPasswordReset(email);
      setSuccess("If that email exists, a reset link has been sent.");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token!, newPassword);
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    }
  };

  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#141414]">
        <div className="w-full max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
          <div className="relative py-12 flex flex-col items-center justify-center text-white overflow-hidden"
               style={{ background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)" }}>
            <h2 className="relative text-3xl font-bold tracking-tight">Reset Password</h2>
            <p className="relative text-white/70 text-sm mt-1.5 font-light">Enter your new password</p>
          </div>

          <form className="p-8 flex flex-col gap-5 bg-[#1e1e1e]" onSubmit={handleResetPassword}>
            <CustomInput label="New Password" input={{
              type: "password",
              placeHolder: "new password",
              value: newPassword,
              onChange: (e) => setNewPassword(e.target.value),
            }} />
            <CustomInput label="Confirm Password" input={{
              type: "password",
              placeHolder: "confirm password",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
            }} />
            {error && <PopUpError message={error} />}
            <button className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full mt-2 shadow-md transition-all active:scale-[0.98]">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#141414]">
      <div className="w-full max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        <div className="relative py-12 flex flex-col items-center justify-center text-white overflow-hidden"
             style={{ background: "linear-gradient(135deg, #8A9A5B 0%, #6b7a46 100%)" }}>
          <h2 className="relative text-3xl font-bold tracking-tight">Forgot Password</h2>
          <p className="relative text-white/70 text-sm mt-1.5 font-light">We'll send you a reset link</p>
        </div>

        <form className="p-8 flex flex-col gap-5 bg-[#1e1e1e]" onSubmit={handleForgotPassword}>
          <CustomInput label="Email" input={{
            type: "email",
            placeHolder: "your email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
          }} />
          {error && <PopUpError message={error} />}
          {success && (
            <p className="text-[#8A9A5B] text-sm text-center">{success}</p>
          )}
          <button className="btn border-none bg-[#8A9A5B] hover:bg-[#728249] text-white w-full mt-2 shadow-md transition-all active:scale-[0.98]">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
