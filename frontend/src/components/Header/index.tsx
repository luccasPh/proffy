import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back-2.svg';
import textIcon from '../../assets/images/icons/icon-text.svg';

import { Container } from './styles';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Container>
    <Link to="/">
      <img src={backIcon} alt="back" />
    </Link>
    <p>{title}</p>
    <img src={textIcon} alt="icon" />
  </Container>
);

export default Header;
