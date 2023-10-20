import axios, { AxiosResponse, isAxiosError } from 'axios';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  birth: string;
  profession: string;
  country: string;
  city: string;
  relationship: string;
}

const url = 'http://localhost:3000/users';

export const getUser = async (): Promise<IUser[]> => {
  try {
    const response: AxiosResponse<IUser[]> = await axios.get(url);
    return response.data;
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao buscar os dados de usuários');
  }
};

export const newUser = async (userData: IUser[]): Promise<IUser[]> => {
  try {
    const response: AxiosResponse<IUser[]> = await axios.post(url, userData);
    return response.data;
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao criar um novo usuário');
  }
};

export const updateUser = async (userData: IUser[]): Promise<IUser[]> => {
  try {
    const response: AxiosResponse<IUser[]> = await axios.put(url, userData);
    return response.data;
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao criar um novo usuário');
  }
};
