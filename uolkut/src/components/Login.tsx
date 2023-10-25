import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UolCircle from './Icons/UolCircle';
import Card from './Card/Card';
import Input from './StyledComponents/Input';
import ButtonCreate from './StyledComponents/ButtonCreate';
import ButtonCreateAlt from './StyledComponents/ButtonCreateAlt';

import { loginUserCredencials } from '../services/api';

import './Form.css';

const Login = (): JSX.Element => {
  localStorage.clear();
  const navigate = useNavigate();

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

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = true;

    const userLogged = await loginUserCredencials(
      enteredEmail,
      enteredPassword
    );

    if (isValid && userLogged) {
      setEnteredEmailIsValid(true);
      setEnteredPasswordIsValid(true);
      localStorage.setItem('userID', userLogged.user.id);
      navigate('/profile');
    } else {
      setEnteredEmailIsValid(false);
      setEnteredPasswordIsValid(false);
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
