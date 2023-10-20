import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UolCircle from './Icons/UolCircle';
import Card from './Card/Card';
import Input from './StyledComponents/Input';
import ButtonCreate from './StyledComponents/ButtonCreate';
import ButtonCreateAlt from './StyledComponents/ButtonCreateAlt';

import { IUser, getUser } from '../services/api';

import './Form.css';

interface IUserLogin {
  email: string;
  password: string;
}

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState<IUserLogin[]>([]);

  useEffect(() => {
    getUser()
      .then(users => {
        const credentials = users.map((user: IUser) => ({
          email: user.email,
          password: user.password
        }));
        setUserCredentials(credentials);
      })
      .catch(error => {
        console.error('Erro ao obter usuário:', error.message);
      });
  }, []);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);

  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState(true);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
    setEnteredEmailIsValid(true);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredPassword(event.target.value);
    setEnteredPasswordIsValid(true);
  };

  const validateForm = () => {
    let isValid = false;

    userCredentials.forEach(user => {
      if (user.email === enteredEmail) {
        isValid = true;
        setEnteredEmailIsValid(true);
      } else {
        isValid = false;
        setEnteredEmailIsValid(false);
      }
      if (user.password === enteredPassword) {
        isValid = true;
        setEnteredPasswordIsValid(true);
      } else {
        isValid = false;
        setEnteredPasswordIsValid(false);
      }
    });
    return isValid;
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      navigate('/profile');
    }
  };

  return (
    <section className="register">
      <div className="image">
        <p>
          Conecta-se aos seus amigos e familiares usando recados e mensagens
          instantâneas
        </p>
      </div>
      <Card>
        <div className="header-card">
          <UolCircle />
          <h2 className="title-header-card">Acesse o UOLkut</h2>
        </div>
        <form onSubmit={submitFormHandler}>
          <div className="form-inputs">
            <Input
              type="email"
              id="email"
              placeholder="E-mail"
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
            {!enteredEmailIsValid && (
              <p className="invalid-input">Email Inválido</p>
            )}
            <Input
              type="password"
              id="password"
              placeholder="Senha"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
            {!enteredPasswordIsValid && (
              <p className="invalid-input">Senha inválida</p>
            )}
            <fieldset className="checkbox__login">
              <label className="checkbox-field">
                Lembrar minha senha
                <input type="checkbox" id="habit1" />
                <span className="checkmark" />
              </label>
            </fieldset>
            <div className="form-actions">
              <ButtonCreate type="submit">Entrar na conta</ButtonCreate>
              <Link to="/register">
                <ButtonCreateAlt type="submit">Criar conta</ButtonCreateAlt>
              </Link>
            </div>
          </div>
        </form>

        <Link to="/recover-pass">
          <p id="forgot">Esqueci minha senha</p>
        </Link>
      </Card>
    </section>
  );
};

export default Login;
