/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UolCircle from './Icons/UolCircle';
import Card from './Card/Card';
import Input from './StyledComponents/Input';
import ButtonCreate from './StyledComponents/ButtonCreate';
import TextArea from './StyledComponents/TextArea';
import SelectEdit from './StyledComponents/SelectEdit';
import './Form.css';

import { FirstUserData, UserCredencials } from './Register';
import {
  getUserCredencials,
  newUserCredencials,
  newUserData
} from '../services/api';

import { userSchema } from '../validations/secondFormValidation';

type FirstFormState = {
  name: string;
  birth: string;
  profession: string;
  country: string;
  city: string;
};

type SecondFormState = {
  whoAmI: string;
  interests: string;
  children: number | string;
  pictureURL: string;
  favoriteSongs: string;
  favoriteMovies: string;
};

type Users_ = {
  email: string;
  password: string;
};

const SecondForm = (): JSX.Element => {
  const navigate = useNavigate();
  let usersData: FirstUserData | undefined = undefined;
  let users: UserCredencials | undefined = undefined;

  const [userID, setUserID] = useState<number>();

  try {
    usersData = JSON.parse(localStorage.getItem('userData')!);
    users = JSON.parse(localStorage.getItem('users')!);
    if (!usersData || !users) {
      throw new Error('Dados do usuário não encontrados no localStorage');
    }
  } catch (error: any) {
    console.error('Erro ao recuperar os dados do localStorage:', error.message);
    usersData = {
      name: { value: '', isValid: null },
      birth: { value: '', isValid: null },
      profession: { value: '', isValid: null },
      country: { value: '', isValid: null },
      city: { value: '', isValid: null }
    };
    users = {
      email: { value: '', isValid: null },
      password: { value: '', isValid: null }
    };
  }

  useEffect(() => {
    if (usersData!.name.value === '') {
      navigate('/register');
    }
  }, [usersData]);

  const { name, birth, profession, country, city } = usersData;
  const { email, password } = users;
  const [firstFormState] = useState<FirstFormState>({
    name: name.value,
    birth: birth.value,
    profession: profession.value,
    country: country.value,
    city: city.value
  });

  const [usersCredencials] = useState<Users_>({
    email: email.value,
    password: password.value
  });

  const [relationship, setRelationship] = useState<string>('Relacionamento');

  const [secondFormState, setSecondFormState] = useState<SecondFormState>({
    whoAmI: '',
    interests: '',
    children: '',
    pictureURL: '',
    favoriteSongs: '',
    favoriteMovies: ''
  });

  const handleOptionChange = (option: string) => {
    setRelationship(option);
  };

  const inputChangeHandler = (field: string, value: string): void => {
    setSecondFormState({
      ...secondFormState,
      [field]: value
    });
  };

  const isFormValid = async (eventForm: React.FormEvent<HTMLFormElement>) => {
    const formData: SecondFormState = {
      whoAmI: (eventForm.target as HTMLFormElement).textarea.value,
      interests: (eventForm.target as HTMLFormElement).interests.value,
      children: (eventForm.target as HTMLFormElement).childrens.value,
      pictureURL: (eventForm.target as HTMLFormElement).pictureURL.value,
      favoriteSongs: (eventForm.target as HTMLFormElement).musics.value,
      favoriteMovies: (eventForm.target as HTMLFormElement).movies.value
    };
    return await userSchema.isValid(formData);
  };

  useEffect(() => {
    getUserCredencials()
      .then(users => {
        setUserID(users[users.length - 1].id);
      })
      .catch(error => {
        console.error('Erro ao obter usuário:', error.message);
      });
  }, []);

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (await isFormValid(event)) {
      await newUserData({
        ...firstFormState,
        relationship,
        ...secondFormState
      });
      const tokenAcess = await newUserCredencials(usersCredencials);
      localStorage.setItem('token', tokenAcess!);
      localStorage.removeItem('userData');
      localStorage.setItem('userID', (userID! + 1).toString());
      navigate('/profile');
    } else {
      console.log('Dados de cadastro inválidos.');
    }
  };

  return (
    <React.Fragment>
      <section className="register create-two">
        <div className="image">
          <p>
            Conecta-se aos seus amigos e familiares usando recados e mensagens
            instantâneas
          </p>
        </div>
        <Card>
          <div className="header-card">
            <UolCircle />
            <h2 className="title-header-card">Cadastre-se no UOLkut</h2>
          </div>
          <form onSubmit={submitFormHandler}>
            <div className="form-inputs">
              <div className="inputs">
                <TextArea
                  id="selfdesc"
                  placeholder="Quem sou eu"
                  name="textarea"
                  value={secondFormState.whoAmI}
                  onChange={e => inputChangeHandler('whoAmI', e.target.value)}
                />
                <TextArea
                  id="interests"
                  placeholder="Interesses"
                  name="interests"
                  value={secondFormState.interests}
                  onChange={e =>
                    inputChangeHandler('interests', e.target.value)
                  }
                />
              </div>
              <div className="input__checkbox">
                <SelectEdit
                  selectOptionRegister={relationship}
                  onOptionChange={handleOptionChange}
                />
                <Input
                  type="number"
                  id="kids"
                  name="childrens"
                  placeholder="Filhos"
                  value={secondFormState.children}
                  onChange={e => inputChangeHandler('children', e.target.value)}
                />
              </div>
              <Input
                type="text"
                id="profile-picture"
                placeholder="Foto de Perfil"
                name="pictureURL"
                value={secondFormState.pictureURL}
                onChange={e => inputChangeHandler('pictureURL', e.target.value)}
              />
              <Input
                type="text"
                id="musics"
                placeholder="Músicas Favoritas"
                name="musics"
                value={secondFormState.favoriteSongs}
                onChange={e =>
                  inputChangeHandler('favoriteSongs', e.target.value)
                }
              />
              <Input
                type="text"
                id="movies"
                placeholder="Filmes Favoritos"
                name="movies"
                value={secondFormState.favoriteMovies}
                onChange={e =>
                  inputChangeHandler('favoriteMovies', e.target.value)
                }
              />

              <div className="input__checkbox">
                <fieldset className="checkbox">
                  <legend>Hábitos:</legend>
                  <label className="checkbox-field">
                    Fumo
                    <input type="checkbox" id="habit1" />
                    <span className="checkmark" />
                  </label>
                  <label className="checkbox-field">
                    Bebida
                    <input type="checkbox" id="habit2" />
                    <span className="checkmark" />
                  </label>
                </fieldset>
              </div>
            </div>

            <div className="form-actions">
              <ButtonCreate type="submit">Criar conta</ButtonCreate>
            </div>
          </form>
        </Card>
      </section>
    </React.Fragment>
  );
};

export default SecondForm;
