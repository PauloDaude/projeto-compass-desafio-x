import { create } from 'zustand';

type UserData = {
  email: { value: string; isValid: boolean | null };
  password: { value: string; isValid: boolean | null };
  name: { value: string; isValid: boolean | null };
  birth: { value: string; isValid: boolean | null };
  profession: { value: string; isValid: boolean | null };
  country: { value: string; isValid: boolean | null };
  city: { value: string; isValid: boolean | null };
};

type State = {
  userData: UserData;
  setUserData: (newUserData: UserData) => void;
};

export const useRegisterUser = create<State>(set => ({
  userData: {
    email: { value: '', isValid: null },
    password: { value: '', isValid: null },
    name: { value: '', isValid: null },
    birth: { value: '', isValid: null },
    profession: { value: '', isValid: null },
    country: { value: '', isValid: null },
    city: { value: '', isValid: null }
  },
  setUserData: (newUserData: UserData) => set({ userData: newUserData })
}));
