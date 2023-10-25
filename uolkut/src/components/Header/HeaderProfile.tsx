import { Link, NavLink } from 'react-router-dom';

import './HeaderProfile.css';
import Expansive from '../Icons/Expansive';
import ProfilePhoto from '../../assets/images/profile-img.png';
import { useUserData } from '../../hooks/useUserData';
import { pictureURL } from '../../pages/ProfilePage';
import Logout from '../Icons/Logout';

const HeaderProfile = (): JSX.Element => {
  const { userData } = useUserData();

  return (
    <header id="header-profile">
      <div className="content-header-profile">
        <div className="header-left">
          <Link to="/">
            <h1 className="title-header-profile">UOLkut</h1>
          </Link>
          <nav className="navbar">
            <NavLink to="/">Início</NavLink>
            <NavLink to="/profile">Perfil</NavLink>
            <NavLink to="/community" onClick={e => e.preventDefault()}>
              Comunidades
            </NavLink>
            <NavLink to="/games" onClick={e => e.preventDefault()}>
              Jogos
            </NavLink>
          </nav>
        </div>
        <div className="header-right">
          <div className="search">
            <input
              type="text"
              className="search input"
              placeholder="Pesquisar no UOLkut"
            />
          </div>
          <div className="profile-header">
            {userData.pictureURL !== '' ? (
              <>
                <img
                  src={pictureURL(userData.pictureURL, ProfilePhoto)}
                  alt="Foto de perfil"
                  className="profile-img"
                />
                <p>{userData.name}</p>
              </>
            ) : (
              <p className="invalid-input">Carregando dados...</p>
            )}
            {/* <Expansive /> */}
            <Link to="/login">
              <Logout />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeaderProfile;
