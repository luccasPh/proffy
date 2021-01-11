import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  buttonColor = '#04d361',
  children,
  ...rest
}) => (
  <Container type="button" {...rest} backgroundColor={buttonColor}>
    {children}
  </Container>
);

export default Button;
