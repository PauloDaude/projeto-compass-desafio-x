/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { create } from 'zustand';

type UserData = {
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
};

type State = {
  userData: UserData;
  setUserData: (newUserData: UserData) => void;
};

export const useUserData = create<State>(set => ({
  userData: {
    name: '',
    birth: '',
    profession: '',
    country: '',
    city: '',
    relationship: '',
    whoAmI: '',
    interests: '',
    children: '',
    pictureURL: '',
    favoriteSongs: '',
    favoriteMovies: ''
  },
  setUserData: (newUserData: UserData) => set({ userData: newUserData })
}));
