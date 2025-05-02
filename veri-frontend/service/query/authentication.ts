import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/authentication";
import { sign_up } from "@/types/user";


export function useSignUp() {

    return useMutation({
        mutationFn: async (body :  sign_up ) => {

            const response = await signUp(body);
            console.log("aqui", response)
            return response
        }
    });
}