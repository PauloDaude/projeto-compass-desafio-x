/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, IUser } from '../services/api';

import UolCircle from './Icons/UolCircle';
import Card from './Card/Card';
import Input from './StyledComponents/Input';
import ButtonCreate from './StyledComponents/ButtonCreate';

import './Form.css';

const Register = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string[]>([]);
  // const [userData, setUserData] = useState<IUser[]>();
  useEffect(() => {
    getUser()
      .then(users => {
        // setUserData(users);
        setEmail(users.map(user => user.email));
      })
      .catch(error => {
        console.error('Erro ao obter usuário:', error.message);
      });
  }, []);

  type FormState = {
    email: { value: string; isValid: boolean | null };
    password: { value: string; isValid: boolean | null };
    name: { value: string; isValid: boolean | null };
    birth: { value: string; isValid: boolean | null };
    profession: { value: string; isValid: boolean | null };
    country: { value: string; isValid: boolean | null };
    city: { value: string; isValid: boolean | null };
  };

  const [formState, setFormState] = useState<FormState>({
    email: { value: '', isValid: null },
    password: { value: '', isValid: null },
    name: { value: '', isValid: null },
    birth: { value: '', isValid: null },
    profession: { value: '', isValid: null },
    country: { value: '', isValid: null },
    city: { value: '', isValid: null }
  });

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
    for (const field of Object.keys(formState)) {
      const result = validateField(
        field,
        formState[field as keyof FormState].value
      );
      formState[field as keyof FormState].isValid = result;
      if (!result) {
        return false;
      }
    }
    return true;
  };

  const inputChangeHandler = (field: string, value: string): void => {
    setFormState({
      ...formState,
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
      setFormState({
        ...formState,
        ['birth']: {
          value: formattedDate,
          isValid: validateField('birth', formattedDate)
        }
      });
    } else {
      setFormState({
        ...formState,
        ['birth']: { value: '', isValid: validateField('birth', '') }
      });
    }
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      navigate('/second-register');
    } else {
      setFormState({
        email: {
          value: formState.email.value,
          isValid: validateField('email', formState.email.value)
        },
        password: {
          value: formState.password.value,
          isValid: validateField('password', formState.password.value)
        },
        name: {
          value: formState.name.value,
          isValid: validateField('name', formState.name.value)
        },
        birth: {
          value: formState.birth.value,
          isValid: validateField('birth', formState.birth.value)
        },
        profession: {
          value: formState.profession.value,
          isValid: validateField('profession', formState.profession.value)
        },
        country: {
          value: formState.country.value,
          isValid: validateField('country', formState.country.value)
        },
        city: {
          value: formState.city.value,
          isValid: validateField('city', formState.city.value)
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
                value={formState.email.value}
                onChange={e => inputChangeHandler('email', e.target.value)}
              />
              {formState.email.isValid !== null && !formState.email.isValid && (
                <p className="invalid-input">E-mail inválido</p>
              )}
              <Input
                type="password"
                id="password"
                placeholder="Senha"
                value={formState.password.value}
                onChange={e => inputChangeHandler('password', e.target.value)}
              />
              {formState.password.isValid !== null &&
                !formState.password.isValid && (
                  <p className="invalid-input">
                    A senha precisa conter pelo menos 8 caracteres
                  </p>
                )}
              <Input
                type="text"
                id="name"
                placeholder="Nome"
                value={formState.name.value}
                onChange={e => inputChangeHandler('name', e.target.value)}
              />
              {formState.name.isValid !== null && !formState.name.isValid && (
                <p className="invalid-input">Nome inválido</p>
              )}
              <div className="inputs">
                <Input
                  type="text"
                  id="birthDate"
                  placeholder="DD/MM/AAAA"
                  value={formState.birth.value}
                  maxLength={10}
                  onChange={e => dateChangeHandler(e)}
                />
                <Input
                  type="text"
                  id="profession"
                  placeholder="Profissão"
                  value={formState.profession.value}
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
                  value={formState.country.value}
                  onChange={e => inputChangeHandler('country', e.target.value)}
                />
                <Input
                  type="text"
                  id="city"
                  placeholder="Cidade"
                  value={formState.city.value}
                  onChange={e => inputChangeHandler('city', e.target.value)}
                />
              </div>
            </div>
            <div className="form-actions">
              {formState.birth.isValid !== null && !formState.birth.isValid && (
                <p className="invalid-input">Data Inválida</p>
              )}
              {formState.profession.isValid !== null &&
                !formState.profession.isValid && (
                  <p className="invalid-input">Profissão Inválida</p>
                )}
              {formState.country.isValid !== null &&
                !formState.country.isValid && (
                  <p className="invalid-input">País Inválido</p>
                )}
              {formState.city.isValid !== null && !formState.city.isValid && (
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
