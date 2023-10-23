/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, isAxiosError } from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export interface IUserData {
  name: string;
  birth: string;
  profession: string;
  country: string;
  city: string;
  relationship: string;
  whoAmI: string;
  interests: string;
  children: number | string;
  pictureURL: string;
  favoriteSongs: string;
  favoriteMovies: string;
}

export interface IUser {
  email: string;
  password: string;
}

export const getUser = async (): Promise<IUser[]> => {
  try {
    const response: AxiosResponse<IUser[]> = await axios.get('/users');
    return response.data;
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao buscar os dados de usuários');
  }
};

export const getUserData = async (id: number): Promise<IUserData[]> => {
  try {
    const response: AxiosResponse<IUserData[]> = await axios.get(
      `/informations/${id}`
    );
    return response.data;
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao buscar os dados de usuários');
  }
};

export const newUserCredencials = async (user: IUser): Promise<void> => {
  try {
    const response = await axios.post('/users', user);
    return response.data.accessToken;
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao criar as credenciais de usuário');
  }
};
export const newUserData = async (userData: IUserData): Promise<void> => {
  try {
    await axios.post('/informations', userData);
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao criar os dados de um novo usuário');
  }
};

export const updateUser = async (
  userData: IUserData[]
): Promise<IUserData[]> => {
  try {
    const response: AxiosResponse<IUserData[]> = await axios.put(
      '/informations',
      userData
    );
    return response.data;
  } catch (error: Error | unknown) {
    if (isAxiosError(error)) {
      console.error('Error:', error.message);
    }
    throw new Error('Falha ao criar um novo usuário');
  }
};

export const loginUser = async (
  enteredEmail: string,
  enteredPassword: string
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post('/login', {
      email: enteredEmail,
      password: enteredPassword
    });
    localStorage.setItem('token', response.data.accessToken);
    return response.data;
  } catch (error: Error | any) {
    console.log(error);
  }
};
