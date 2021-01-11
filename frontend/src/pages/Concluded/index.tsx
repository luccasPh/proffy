import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import doneImg from '../../assets/images/done.svg';

import { Container, Content } from './styles';

interface stateProps {
  title: string;
  description: string;
  to: string;
  text: string;
}

const Concluded: React.FC = () => {
  const history = useHistory<stateProps>();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [to, setTo] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (history.location.state) {
      setTitle(history.location.state.title);
      setDescription(history.location.state.description);
      setTo(history.location.state.to);
      setText(history.location.state.text);
    } else {
      history.push('/signin');
    }
  }, [history]);

  return (
    <Container>
      <Content>
        <img src={doneImg} alt="text-img" />
        <h1>{title}</h1>
        <p style={{ width: '450px' }}>{description}</p>
        <Link to={to}>{text}</Link>
      </Content>
    </Container>
  );
};

export default Concluded;
