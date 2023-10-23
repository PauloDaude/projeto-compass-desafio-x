import { create } from 'zustand';

type UserData = {
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
    name: { value: '', isValid: null },
    birth: { value: '', isValid: null },
    profession: { value: '', isValid: null },
    country: { value: '', isValid: null },
    city: { value: '', isValid: null }
  },
  setUserData: (newUserData: UserData) => set({ userData: newUserData })
}));
