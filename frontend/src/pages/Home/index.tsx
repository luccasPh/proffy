/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useCallback } from 'react';
import { FiPower, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';
import api from '../../services/api';

import introImg from '../../assets/images/intro.svg';
import illustrateImg from '../../assets/images/illustrate.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';

import {
  Container,
  Content,
  HeaderContent,
  Avatar,
  Loading,
  BodyContent,
  FooterContent,
} from './styles';

const Home: React.FC = () => {
  const { user, auth, signOut, setUser } = useAuth();
  const history = useHistory();
  const [totalConnection, setTotalConnection] = useState();

  const handleButtonTeach = useCallback(() => {
    if (user.whatsapp || user.bio) {
      history.push('/profile');
    } else {
      history.push('/class/register');
    }
  }, [history, user]);

  const handleButtonStudy = useCallback(() => {
    history.push('/class/search');
  }, [history]);

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      const { response } = error;
      if (response.status === 401) {
        signOut();
      }
    }
  }, [auth.token, setUser, signOut]);

  useEffect(() => {
    api.get('/classes/connection').then((response) => {
      setTotalConnection(response.data.total);
    });
  }, []);

  useEffect(() => {
    if (auth.token) {
      fetchUser();
    }
  }, [auth, fetchUser]);

  return (
    <Container>
      <Content>
        <HeaderContent>
          {auth.token ? (
            !user.id ? (
              <Loading>
                <SkeletonTheme color="#E5E5E5" highlightColor="#FFFFFF">
                  <Skeleton style={{ width: 188, height: 40 }} />
                  <Skeleton style={{ width: 40, height: 40 }} />
                </SkeletonTheme>
              </Loading>
            ) : (
              <Avatar>
                <div style={{ display: 'flex' }}>
                  <img src={user.avatar} alt="avatar" />
                  <div
                    className="user-dropdown"
                    onClick={() => history.push('/profile')}
                  >
                    <p>
                      {user.name} {user.last_name}
                    </p>
                  </div>
                </div>
                <a
                  onClick={signOut}
                  title="Sair"
                  href="#/"
                  style={{ fontStyle: 'normal' }}
                >
                  <FiPower size={20} />
                </a>
              </Avatar>
            )
          ) : (
            <Link className="signin" to="/signin" title="Entrar">
              <FiUser size={20} />
            </Link>
          )}
        </HeaderContent>

        <BodyContent style={user ? {} : { paddingTop: '70px' }}>
          <img src={introImg} alt="intro" />
          <img src={illustrateImg} alt="illustrate" />
        </BodyContent>

        <FooterContent>
          <h3>
            Seja bem-vindo. <strong>O que deseja fazer?</strong>
          </h3>
          <p>
            total de {totalConnection === 0 ? 1 : totalConnection} conexões já
            realizadas <img src={purpleHeartIcon} alt="purple heart" />
          </p>
          <p />

          <Button
            onClick={handleButtonStudy}
            style={{ marginLeft: '-170px' }}
            buttonColor="#8257E5"
          >
            <img src={studyIcon} alt="study" />
            <span>Estudar</span>
          </Button>
          <Button onClick={handleButtonTeach}>
            <img src={giveClassesIcon} alt="give class" />
            <span>Ensinar</span>
          </Button>
        </FooterContent>
      </Content>
    </Container>
  );
};

export default Home;
