import { useMutation } from "@tanstack/react-query";
import { login, logout, signUp } from "../api/authentication";
import { login_api, sign_up } from "@/types/user";


export function useSignUp() {

    return useMutation({
        mutationFn: async (body: sign_up) => {

            const response = await signUp(body);
            return response
        }
    });
}


export function useLogin() {

    return useMutation({
        mutationFn: async (body: login_api) => {

            const response = await login(body);
 
            return response
        }
    });
}

export function useLogout() {

    return useMutation({
        mutationFn: async (token: string) => {

            const response = await logout(token);
            return response
        }
    });
}