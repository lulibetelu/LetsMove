import { useMutation } from "@tanstack/react-query";
import { googleLogin } from "../api/user.ts";

export function useGoogleAuth() {
    return useMutation({
        mutationFn: googleLogin,
    });
}
