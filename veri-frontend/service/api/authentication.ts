import { API_URL } from "@/types/global"
import { login_api, sign_up } from "@/types/user";
import axios from "axios";


export async function signUp(body: sign_up) {
  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await axios.post(`${API_URL}/register`, body, headers);

    return result.data;
  } catch (error: any) {
    // Lança para o React Query
    throw error;
  }
}


export async function login(body: login_api) {
  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const result = await axios.post(`${API_URL}/login`, body, headers);

    return result.data;
  } catch (error: any) {
    // Lança para o React Query
    throw error;
  }
}


export async function logout(token: string) {
  try {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.post(`${API_URL}/logout`, null, headers);

    return result;


  } catch (error: any) {
    // Lança para o React Query
    throw error;
  }
}