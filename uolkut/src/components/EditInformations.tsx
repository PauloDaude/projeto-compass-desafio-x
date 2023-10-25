/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserData } from '../hooks/useUserData';

import ProfilePhoto from '../assets/images/profile-img.png';

import Card from './Card/Card';
import UolCircle from './Icons/UolCircle';
import Input from './StyledComponents/Input';
import ButtonCreate from './StyledComponents/ButtonCreate';
import Pen from '../assets/images/pen.png';
import './EditInformation.css';
import {
  getUserData,
  updateUserData,
  updateUserPassword
} from '../services/api';
import { pictureURL } from '../pages/ProfilePage';
import Select from './StyledComponents/Select';

const EditInformation = (): JSX.Element => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();
  const [newPassword, setNewPassword] = useState<string>('');
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');

  const id = parseInt(localStorage.getItem('userID')!);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUserData = await getUserData(id);
      setUserData(fetchedUserData);
    };
    fetchUserData();
  }, []);

  const handleOptionChange = (option: string) => {
    setUserData({
      ...userData,
      relationship: option
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
      setUserData({
        ...userData,
        birth: formattedDate
      });
    } else {
      setUserData({
        ...userData,
        birth: ''
      });
    }
  };

  const newPasswordIsValid = (): boolean => {
    if (
      (newPassword === '' || newPassword.length >= 8) &&
      repeatNewPassword === newPassword
    ) {
      return true;
    }
    return false;
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (newPassword && newPasswordIsValid()) {
      updateUserPassword(newPassword, id);
      navigate('/profile');
    } else if (newPassword === '') {
      navigate('/profile');
    }
    updateUserData(userData, id);
  };

  return (
    <section className="editions">
      <div className="image-profile">
        <Card classNameCard="edit">
          <img
            src={pictureURL(userData.pictureURL, ProfilePhoto)}
            alt="Profile"
            className="profile-picture"
          />
          <img src={Pen} alt="Pen" className="pen" />
        </Card>
      </div>
      <Card classNameCard="edit">
        <div className="edits">
          <div className="header-card-edit">
            <UolCircle />
            <h2 className="title-header-card-edit">Editar Informações</h2>
          </div>
          <form onSubmit={submitFormHandler}>
            <div className="form-inputs-edit">
              <div className="inputs_">
                <Input
                  type="text"
                  id="profession"
                  placeholder="Profissão"
                  onChange={e =>
                    setUserData({
                      ...userData,
                      profession: e.target.value
                    })
                  }
                  value={userData.profession}
                />
                <Select
                  selectOptionRegister={userData.relationship}
                  onOptionChange={handleOptionChange}
                />
              </div>
              <div className="inputs_">
                <Input
                  type="text"
                  id="name"
                  placeholder="Nome"
                  onChange={e =>
                    setUserData({
                      ...userData,
                      name: e.target.value
                    })
                  }
                  value={userData.name}
                />
                <Input
                  type="text"
                  id="birthDate"
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  onChange={dateChangeHandler}
                  value={userData.birth}
                />
              </div>
              <div className="inputs-edit">
                <Input
                  type="text"
                  id="country"
                  placeholder="País"
                  onChange={e =>
                    setUserData({
                      ...userData,
                      country: e.target.value
                    })
                  }
                  value={userData.country}
                />
                <Input
                  type="text"
                  id="city"
                  placeholder="Cidade"
                  onChange={e =>
                    setUserData({
                      ...userData,
                      city: e.target.value
                    })
                  }
                  value={userData.city}
                />
              </div>
              <div className="inputs-edit">
                <Input
                  type="password"
                  id="password"
                  placeholder="Senha"
                  onChange={e => setNewPassword(e.target.value)}
                  value={newPassword}
                />
                <Input
                  type="password"
                  id="repet-password"
                  placeholder="Repetir senha"
                  onChange={e => setRepeatNewPassword(e.target.value)}
                  value={repeatNewPassword}
                />
              </div>
            </div>
            <div style={{ marginBottom: 16, textAlign: 'center' }}>
              {newPassword && newPassword.length < 8 && (
                <p className="invalid-input">
                  A senha precisa conter pelo menos 8 caracteres
                </p>
              )}
              {repeatNewPassword !== newPassword && (
                <p className="invalid-input">Senhas diferentes</p>
              )}
            </div>
            <div className="form-actions-edit">
              <ButtonCreate type="submit">Salvar</ButtonCreate>
            </div>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default EditInformation;
