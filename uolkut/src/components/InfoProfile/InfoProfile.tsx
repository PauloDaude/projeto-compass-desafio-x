/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react';

import Card from '../Card/Card';
import './InfoProfile.css';

import Star from '../Icons/emojis/Star';
import Smiley from '../Icons/emojis/Smiley';
import ThumbsUp from '../Icons/emojis/ThumbsUp';
import Sexy from '../Icons/emojis/Sexy';

import Triangle from '../../assets/images/triangle.png';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserData';

const InfoProfile = (): JSX.Element => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  const { userData } = useUserData();

  const date = new Date();
  const birthYear = parseInt(userData.birth.split('/')[2]);
  const ageData: string = (date.getFullYear() - birthYear).toString();

  const favSongs = userData.favoriteSongs.split(',');
  const favMovies = userData.favoriteMovies.split(',');

  return (
    <Card classNameCard="card-profile-info">
      {userData.name !== '' ? (
        <>
          <h3 className="title-info-profile">Boa tarde, {userData.name}</h3>
          <div className="quote">
            <div className="triangle">
              <img src={Triangle} alt="apontamento" />
            </div>
            <div className="phrase">
              <p>Programar sem café é igual poeta sem poesia.</p>
            </div>
          </div>
          <div className="status">
            <div className="fans">
              <p>Fãs</p>
              <div className="box-emojis">
                <Star />
                <p className="fans-number">85</p>
              </div>
            </div>
            <div className="trust">
              <p>Confiável</p>
              <div className="box-emojis">
                <Smiley />
                <Smiley />
              </div>
            </div>
            <div className="cool">
              <p>Legal</p>
              <div className="box-emojis">
                <ThumbsUp />
                <ThumbsUp />
                <ThumbsUp />
              </div>
            </div>
            <div className="sexy">
              <p>Sexy</p>
              <div className="box-emojis">
                <Sexy />
                <Sexy />
              </div>
            </div>
          </div>
          <div className="infos-profiles">
            <dl className="info-status">
              <dt>Relacionamento:</dt>
              <dd>{userData.relationship}</dd>
            </dl>
            <dl className="info-status">
              <dt>Aniversário:</dt>
              <dd>{userData.birth}</dd>
            </dl>
            <dl className="info-status">
              <dt>Idade:</dt>
              <dd>{ageData} anos</dd>
            </dl>
            <dl className="info-status">
              <dt>Quem sou eu:</dt>
              <dd>{userData.profession}</dd>
            </dl>
            <dl className="info-status">
              <dt>País:</dt>
              <dd>{userData.country}</dd>
            </dl>
            <dl className="info-status">
              <dt>Cidade:</dt>
              <dd>{userData.city}</dd>
            </dl>
          </div>
          <div className="box-tags">
            <div className="musics">
              <dl className="tags">
                <dt>Músicas:</dt>
                {favSongs.map(song => (
                  <dd key={song}>{song.trim()}</dd>
                ))}
              </dl>
              <Link to="#" className="see-more">
                Ver todos
              </Link>
            </div>
            <div className="films">
              <dl className="tags">
                <dt>Filmes</dt>
                {favMovies.map(movie => (
                  <dd key={movie}>{movie.trim()}</dd>
                ))}
              </dl>
              <Link to="#" className="see-more">
                Ver todos
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p className="invalid-input" style={{ width: '100em' }}>
          Carregando dados...
        </p>
      )}
    </Card>
  );
};

export default InfoProfile;
