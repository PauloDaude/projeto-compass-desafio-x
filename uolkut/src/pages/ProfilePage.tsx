/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card/Card';
import HeaderProfile from '../components/Header/HeaderProfile';
import InfoProfile from '../components/InfoProfile/InfoProfile';

import ProfilePhoto from '../assets/images/profile-img.png';

import './ProfilePage.css';
import Friends from '../components/InfoProfile/Friends/Friends';
import Communities from '../components/InfoProfile/Communities/Communities';
import { useUserData } from '../hooks/useUserData';
import { getUserData } from '../services/api';

export const pictureURL = (url: string, profilePhoto: string) => {
  if (url !== '' && (url.includes('.jpg') || url.includes('.jpg'))) {
    return url;
  } else {
    return profilePhoto;
  }
};

const ProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      const id: string = localStorage.getItem('userID')!;
      try {
        const fetchedUserData = await getUserData(parseInt(id));
        setUserData(fetchedUserData);
      } catch {
        navigate('/login');
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <HeaderProfile />
      <div className="content-profile">
        <div className="search-mobile">
          <input
            type="text"
            className="input-search-mobile"
            placeholder="Pesquisar no UOLkut"
          />
        </div>
        <div className="box-left-profile">
          <Card classNameCard="profile-photo">
            {userData.pictureURL !== '' ? (
              <>
                <img
                  src={pictureURL(userData.pictureURL, ProfilePhoto)}
                  alt="foto de perfil"
                />
                <p className="name-profile">{userData.name}</p>
                <p className="status-profile">
                  {userData.relationship}, {userData.country}
                </p>
              </>
            ) : (
              <p className="invalid-input">Carregando dados...</p>
            )}
          </Card>
          <Link to="/profile/edit-information">
            <Card classNameCard="edit-profile">
              <p>Editar meu perfil</p>
            </Card>
          </Link>
        </div>
        <div className="cards-profile-order">
          <div className="info-profile-card">
            <InfoProfile />
          </div>
          <div className="friends-card">
            <Friends />
          </div>
          <div className="communities-card">
            <Communities />
          </div>

          <div className="desktop">
            <div className="friends-card-desktop">
              <Friends />
            </div>
            <div className="communities-card-desktop">
              <Communities />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
