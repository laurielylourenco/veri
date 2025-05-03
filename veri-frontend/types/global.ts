import { User } from "./user";


export interface GlobalState {

    userOnline: User | null ;
    setUserOnline: (userOnline: User | null) => void;
    isAutenticado: () => boolean;
}


export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
