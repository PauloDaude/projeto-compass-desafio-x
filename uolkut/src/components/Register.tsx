/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserCredencials } from '../services/api';

import UolCircle from './Icons/UolCircle';
import Card from './Card/Card';
import Input from './StyledComponents/Input';
import ButtonCreate from './StyledComponents/ButtonCreate';

import './Form.css';

export type FirstUserData = {
  name: { value: string; isValid: boolean | null };
  birth: { value: string; isValid: boolean | null };
  profession: { value: string; isValid: boolean | null };
  country: { value: string; isValid: boolean | null };
  city: { value: string; isValid: boolean | null };
};

export type UserCredencials = {
  email: { value: string; isValid: boolean | null };
  password: { value: string; isValid: boolean | null };
};

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  }, []);
  localStorage.clear();

  const [formUserData, setFormUserData] = useState<FirstUserData>({
    name: { value: '', isValid: null },
    birth: { value: '', isValid: null },
    profession: { value: '', isValid: null },
    country: { value: '', isValid: null },
    city: { value: '', isValid: null }
  });

  const [userCredencials, setUserCredencials] = useState<UserCredencials>({
    email: { value: '', isValid: null },
    password: { value: '', isValid: null }
  });

  const [email, setEmail] = useState<string[]>([]);
  useEffect(() => {
    getUserCredencials()
      .then(users => {
        setEmail(users.map(user => user.email));
      })
      .catch(error => {
        console.error('Erro ao obter usuário:', error.message);
      });
  }, []);

  interface IValidationRules {
    [fieldName: string]: (value: string) => boolean;
  }

  const validationRules: IValidationRules = {
    email: value =>
      !value.includes('@') || value.trim() === '' || email.includes(value),
    password: value => value.length <= 8,
    name: value => value.trim() === '',
    birth: value => value.trim() === '',
    profession: value => value.trim() === '',
    country: value => value.trim() === '',
    city: value => value.trim() === ''
  };

  const validateField = (field: string, value: string) => {
    return !validationRules[field](value);
  };

  const isFormValid = () => {
    for (const field of Object.keys(formUserData)) {
      const result = validateField(
        field,
        formUserData[field as keyof FirstUserData].value
      );
      formUserData[field as keyof FirstUserData].isValid = result;
      if (!result) {
        return false;
      }
    }
    return true;
  };

  const inputChangeHandler = (field: string, value: string): void => {
    setFormUserData({
      ...formUserData,
      [field]: { value, isValid: validateField(field, value) }
    });
  };
  const inputChangeHandlerUser = (field: string, value: string): void => {
    setUserCredencials({
      ...userCredencials,
      [field]: { value, isValid: validateField(field, value) }
    });
  };

  const dateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const numericValue = newValue.replace(/\D/g, '');

    if (numericValue.length >= 1 && numericValue.length <= 8) {
      let formattedDate = '';
      for (let i = 0; i < numericValue.length; i++) {
        if (i === 2 || i === 4) {
          formattedDate += '/';
        }
        formattedDate += numericValue[i];
      }
      setFormUserData({
        ...formUserData,
        ['birth']: {
          value: formattedDate,
          isValid: validateField('birth', formattedDate)
        }
      });
    } else {
      setFormUserData({
        ...formUserData,
        ['birth']: { value: '', isValid: validateField('birth', '') }
      });
    }
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      localStorage.setItem('userData', JSON.stringify(formUserData));
      localStorage.setItem('users', JSON.stringify(userCredencials));

      navigate('/second-register');
    } else {
      setFormUserData({
        name: {
          value: formUserData.name.value,
          isValid: validateField('name', formUserData.name.value)
        },
        birth: {
          value: formUserData.birth.value,
          isValid: validateField('birth', formUserData.birth.value)
        },
        profession: {
          value: formUserData.profession.value,
          isValid: validateField('profession', formUserData.profession.value)
        },
        country: {
          value: formUserData.country.value,
          isValid: validateField('country', formUserData.country.value)
        },
        city: {
          value: formUserData.city.value,
          isValid: validateField('city', formUserData.city.value)
        }
      });
      setUserCredencials({
        email: {
          value: userCredencials.email.value,
          isValid: validateField('email', userCredencials.email.value)
        },
        password: {
          value: userCredencials.password.value,
          isValid: validateField('password', userCredencials.password.value)
        }
      });
    }
  };

  return (
    <React.Fragment>
      <section className="register create">
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
              <Input
                type="email"
                id="email"
                placeholder="E-mail"
                value={userCredencials.email.value}
                onChange={e => inputChangeHandlerUser('email', e.target.value)}
              />
              {userCredencials.email.isValid !== null &&
                !userCredencials.email.isValid && (
                  <p className="invalid-input">E-mail inválido</p>
                )}
              <Input
                type="password"
                id="password"
                placeholder="Senha"
                value={userCredencials.password.value}
                onChange={e =>
                  inputChangeHandlerUser('password', e.target.value)
                }
              />
              {userCredencials.password.isValid !== null &&
                !userCredencials.password.isValid && (
                  <p className="invalid-input">
                    A senha precisa conter pelo menos 8 caracteres
                  </p>
                )}
              <Input
                type="text"
                id="name"
                placeholder="Nome"
                value={formUserData.name.value}
                onChange={e => inputChangeHandler('name', e.target.value)}
              />
              {formUserData.name.isValid !== null &&
                !formUserData.name.isValid && (
                  <p className="invalid-input">Nome inválido</p>
                )}
              <div className="inputs">
                <Input
                  type="text"
                  id="birthDate"
                  placeholder="DD/MM/AAAA"
                  value={formUserData.birth.value}
                  maxLength={10}
                  onChange={e => dateChangeHandler(e)}
                />
                <Input
                  type="text"
                  id="profession"
                  placeholder="Profissão"
                  value={formUserData.profession.value}
                  onChange={e =>
                    inputChangeHandler('profession', e.target.value)
                  }
                />
              </div>
              <div className="inputs">
                <Input
                  type="text"
                  id="country"
                  placeholder="País"
                  value={formUserData.country.value}
                  onChange={e => inputChangeHandler('country', e.target.value)}
                />
                <Input
                  type="text"
                  id="city"
                  placeholder="Cidade"
                  value={formUserData.city.value}
                  onChange={e => inputChangeHandler('city', e.target.value)}
                />
              </div>
            </div>
            <div className="form-actions">
              {formUserData.birth.isValid !== null &&
                !formUserData.birth.isValid && (
                  <p className="invalid-input">Data Inválida</p>
                )}
              {formUserData.profession.isValid !== null &&
                !formUserData.profession.isValid && (
                  <p className="invalid-input">Profissão Inválida</p>
                )}
              {formUserData.country.isValid !== null &&
                !formUserData.country.isValid && (
                  <p className="invalid-input">País Inválido</p>
                )}
              {formUserData.city.isValid !== null &&
                !formUserData.city.isValid && (
                  <p className="invalid-input">Cidade Inválida</p>
                )}
              <ButtonCreate type="submit">Criar conta</ButtonCreate>
            </div>
          </form>
        </Card>
      </section>
    </React.Fragment>
  );
};

export default Register;
