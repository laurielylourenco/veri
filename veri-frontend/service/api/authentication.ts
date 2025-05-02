import { API_URL } from "@/types/global"
import { sign_up } from "@/types/user";
import axios from "axios";


export async function signUp(body: sign_up) {
    try {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const result = await axios.post(`${API_URL}/register`, body, headers);
  
      console.log('Sucesso:', result.data);
      return result.data;
    } catch (error: any) {
      // Lança para o React Query
      throw error;
    }
  }
  